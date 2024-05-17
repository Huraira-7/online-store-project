import {useState,useEffect} from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious} from "@/components/ui/pagination"
import { fetchproductbycategory, fetchallproducts } from '@/api/internal'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {  useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GrCheckboxSelected, GrCheckbox } from "react-icons/gr";
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import ClickAwayListener from 'react-click-away-listener';
import Popper from '@mui/material/Popper';

import './category.css'
import Loading from '@/lib/Loading';


function Category({category,setLoading,loading}) {
  // console.log(window.location.href)  //current URL 
  const [allproducts,setAllProducts] = useState([])
  const [products,setProducts] = useState([])
  const [filteredproducts, setFilteredproducts] = useState([])
  const [page,currentPage] = useState(1)
  const [pages,setPages] = useState([1])
  const [numpages,setNumpages] = useState(1)
  const [selected,setSelected] = useState('')
  const [instk, setInstk] = useState(0)
  const [outstk, setOutstk] = useState(0)

  const navigate = useNavigate();
  const down = useSelector((state) => state.user.down);
  const sale = useSelector((state) => state.user.sale);

  useEffect(() => {
    const fetchData = async () => {
      if(down === true ) { 
        navigate('/downtime',{replace:true}) 
        return
      }
      // console.log("fetching products of category",category)
      const cc = capitalize(category)
      const data = {category: cc}
      let resp;
      if(category === 'all'){
        resp = await fetchallproducts();
      } else if (category === 'sale') {
        resp = undefined
      } else{
        resp = await fetchproductbycategory(data)
      }
      // console.log(resp)
      if(resp && resp.status === 200){
        let instkcount = resp.data.products.filter(item => item.is_out_stock === false).length
        setInstk(instkcount)
        setOutstk(resp.data.products.length - instkcount)
        // let tmp = resp.data.products
        // let dup = [...tmp]
        // let dup2 = tmp.concat(dup)
        // let dup3 = dup2.concat(dup2)
        let dup3 = resp.data.products
        setAllProducts(dup3)
        setProducts(dup3)
        setFilteredproducts(dup3.slice(0, 6))
        setPagesandNumPages(dup3)
        setLoading(false)
      } else if (resp && resp.code === "ERR_BAD_REQUEST") {  // display error message
        // console.log("setting error-----",resp.response.status); 
        // if (response.response.status === 404) {setError("error 404 Server is offline");}
        // if (response.response.status === 500) {setError("error 500 Internal Server Error");}      
      }  else { //"sale-category"
        let instkcount = sale.filter(item => item.is_out_stock === false).length
        setInstk(instkcount)
        setOutstk(sale.length - instkcount)
        // let tmp = sale
        // let dup = [...tmp]
        // let dup2 = tmp.concat(dup)
        // let dup3 = dup2.concat(dup2)
        let dup3 = sale
        setAllProducts(dup3)
        setProducts(dup3)
        setFilteredproducts(dup3.slice(0, 6))
        setPagesandNumPages(dup3)
        setLoading(false)
      }
    }
    fetchData();
  }, [])

  function setPagesandNumPages(arr) {
    let np = Math.ceil(arr.length/6)  // resp.data.products.length/6
    setNumpages(np)

    let tmparr = [1]
    // console.log(np)
    for(let i = 1; i<=np; i++){
      if(i==1) {continue;}
      tmparr.push(i)
      if(i==3) {break;}
    }
    // console.log(tmparr)
    setPages(tmparr)
  }


  function handleNextPg(e) {
    e.preventDefault()
    if(pages[pages.length-1]!==numpages){
      // console.log("nxt",pages)
      setPages(prevState => prevState.map(value => value + 1));
    }
    const index = page*6
    const endIndex = Math.min(products.length, index + 6);
    setFilteredproducts(products.slice(index,endIndex))
    // console.log("start,end",index,endIndex,products.length)
    currentPage((oldpg) => oldpg+1)
  }

  function handlePrevPg(e) {
    e.preventDefault()
    if(pages[0] !== 1){
      // console.log("prev",pages)
      setPages(prevState => prevState.map(value => value - 1));
    }
    const index = (page-1)*6
    const startIndex = Math.max(0, index - 6);
    setFilteredproducts(products.slice(startIndex,index))
    // console.log("start,end",startIndex,index,products.length)
    currentPage((oldpg) => oldpg-1)
  }
  

  function showProduct(prod){
    navigate('/product', { state:{product: btoa(JSON.stringify(prod))} })
  } 

  function resetPages(){
    if(page!==1){
      currentPage(1)
      setPages([1,2,3])
    }
  }

  function handleSelection(value) {
    resetPages()
    let sorttype = value.split(' ')[0]
    let sortdir = ['A','old','low'].includes(value.split(' ')[1])
    let sortdirection = sortdir ? 'ascending' : 'descending'
    // console.log(sorttype, sortdirection)
    let sortedData;
    if(sorttype === 'Price,'){
      sortedData = [...products].sort((a, b) => a.price - b.price); 
    } else if (sorttype === 'Date,'){
      sortedData = [...products].sort((a, b) => a.date - b.date); 
    } else { //Alphabetically
      sortedData = [...products].sort((a, b) => {
        const nameA = a.title.toLowerCase(); // Sort by lowercase names for case-insensitive order
        const nameB = b.title.toLowerCase();
        return nameA.localeCompare(nameB); // Use localeCompare for proper string comparison
      });
    }
    // console.log(sortedData)
    if(sortdirection === 'descending') {  sortedData = sortedData.slice().reverse() }
    // console.log(sortedData)
    setProducts(sortedData)
    setFilteredproducts(sortedData.slice(0,6))
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2)
  const [p1, setp1] = useState()
  const [p2, setp2] = useState()

  function handlesetP1(val) {
    if (!isNaN(parseInt(val))) {
      if(parseInt(val)>0){
        setp1(parseInt(val));
      } 
    } 
  }

  function handlesetP2(val) {
    if (!isNaN(parseInt(val))) {
      if(parseInt(val)>0){
        setp2(parseInt(val));
      } 
    } 
  }

  function filterbyPrice(){
    if(p1=== undefined || p2===undefined) {return;}
    let lowerp = Math.min(p1,p2)
    let higherp = Math.max(p1,p2)
    let fp = allproducts.filter(product => product.price >= lowerp && product.price <= higherp);
    // console.log(fp)
    if (fp.length>0) {
      resetPages()
      setProducts(fp)
      setFilteredproducts(fp.slice(0,Math.min(fp.length,6)))
      setPagesandNumPages(fp)
    } else {
      setProducts([])
      setFilteredproducts([])
      setNumpages(0)
    }
    setAnchorEl2(null)
  }

  function filterbyStock(){
    // console.log(selected)
    if(selected === '') {return;}
    let fp;
    if(selected === 'out') { fp = allproducts.filter(product => product.is_out_stock === true); }
    if(selected === 'in') { fp = allproducts.filter(product => product.is_out_stock === false); }
    // console.log(fp)
    if (fp.length>0) {
    resetPages()
    setProducts(fp)
    setFilteredproducts(fp.slice(0,Math.min(fp.length,6)))
    setPagesandNumPages(fp)
    } else {
      setProducts([])
      setFilteredproducts([])
      setNumpages(0)
    }
    setAnchorEl(null)

  }

  const handleAvailClick = (event) => {
    // setAnchorEl(anchorEl ? null : event.currentTarget);
    handleClick(event)
  };

  const handlePriceClick = (event) => {
    // setAnchorEl2(anchorEl2 ? null : event.currentTarget);
    handleClick2(event)
  };

  function capitalize(string) {  return string.charAt(0).toUpperCase() + string.slice(1); }

  const handleClick = (e) => {  
    if(open) {return;}
    setAnchorEl(anchorEl ? null : e.currentTarget);
    // setAnchorEl2(anchorEl2 ? null : e.currentTarget)
  }
  const handleClickAway = (e) => { 
    if(!open) {return;}
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };
  
  const handleClick2 = (e) => {  
    if(open2) {return;}
    // setAnchorEl(anchorEl ? null : e.currentTarget)
    setAnchorEl2(anchorEl2 ? null : e.currentTarget);
  };
  const handleClickAway2 = (e) => { 
    if(!open2) {return;} 
    setAnchorEl2(anchorEl2 ? null : e.currentTarget);
  }

  return (
    loading ? <Loading/>
    :<div className='min-h-screen mb-24'>
      <div className='flex flex-col m-16 max-[1500px]:m-8'>
        <span className='text-3xl max-[1500px]:text-xl max-[1500px]:font-semibold'>{capitalize(category) } {category === 'all' ? 'Products' : ''}</span>
        <div className='text-2xl max-[1500px]:text-xl max-[1500px]:mt-10 max-[600px]:flex-col mt-20 flex justify-between'>
          <div className='flex'>
            <span className='mr-8 max-[600px]:mr-2'> Filter:  </span>
            <span className='flex cursor-pointer mr-8 max-[600px]:mr-2'> 
              <span className='pr-4 hover:underline'  >Availability </span>
              <ClickAwayListener onClickAway={handleClickAway}>
                <div onClick={(e) => handleAvailClick(e)}>
                  <IoIosArrowDown className='mt-1' />
                  <Popper open={open} anchorEl={anchorEl} >
                      <div className='bg-slate-100 mt-4  max-[600px]:px-2 flex flex-col px-6 py-8 rounded-md outline outline-blue-200'>
                        <div className='flex justify-between'>
                          <span className='text-2xl max-[600px]:text-xl '> {selected === '' ? 0 : 1} selected </span>
                          <span className='hover:underline cursor-pointer text-2xl max-[600px]:text-xl' onClick={()=>setSelected('')}> Reset </span>
                        </div>
                        <Separator className='bg-slate-300 mt-4' />
                        <div className='flex justify-between gap-8 mt-8'>
                          {selected === 'in' ? <GrCheckboxSelected size={30}/> : <GrCheckbox size={30} onClick={()=>setSelected('in')} /> }
                          <span className=' text-gray-700 text-xl'> In stock {instk} </span>     
                        </div>
                        <div className='flex justify-between gap-8 max-[1000px]:gap-1'>
                          {selected === 'out' ? <GrCheckboxSelected size={30}/> : <GrCheckbox size={30} onClick={()=>setSelected('out')}  /> }
                          <span className='text-gray-700 text-xl'> Out of stock {outstk} </span>
                        </div>
                        <div className='text-xl max-[600px]:p-1 max-[600px]:mt-5 text-center p-3 cursor-pointer hover:scale-105 mt-2 bg-red-100 rounded-full' onClick={filterbyStock}>
                          Apply Filter
                        </div>
                      </div>
                  </Popper>
                </div>
              </ClickAwayListener>
            </span>
            <span className='flex cursor-pointer'> 
              <span className='pr-4 hover:underline'>Price </span>
              <ClickAwayListener onClickAway={handleClickAway2}>
                <div onClick={(e) => handlePriceClick(e)}>
                  <IoIosArrowDown className='mt-1'/>
                  <Popper open={open2} anchorEl={anchorEl2}>
                    <div className="flex max-[600px]:w-9/12 max-[600px]:px-2 max-[600px]:ml-4  bg-slate-100  flex-col gap-2 mt-4 px-4 py-8 rounded-md outline outline-blue-200">
                      <div className='text-xl gap-6 max-[600px]:gap-1 flex max-[600px]:flex-col '>
                          <span className='text-2xl max-[1500px]:text-xl'> Rs. </span>
                          <Input placeholder='From' type='number' value={p1} onChange = { (e) => handlesetP1(e.target.value)}  className='placeholder:text-xl text-xl'/>
                          <span className='text-xl'> Rs. </span>
                          <Input placeholder='To'  type='number'  value={p2} onChange = { (e) => handlesetP2(e.target.value)}  className='placeholder:text-xl text-xl'/>
                      </div>
                        <div className='text-xl max-[600px]:w-9/12 w-6/12 m-auto text-center p-3 cursor-pointer hover:scale-105 mt-2 bg-red-100 rounded-full' onClick={filterbyPrice}>
                            Apply Filter
                        </div>
                    </div>
                  </Popper>
                </div>
                </ClickAwayListener>
            </span>
          </div>
          <div className='flex max-[1500px]:mt-10'>
            <span className='mr-8 max-[600px]:mr-4'> Sort:  </span>
            <span className='flex cursor-pointer mr-8 max-[600px]:mr-4'> 
            <Select onValueChange={(val)=>handleSelection(val)}>
              <SelectTrigger className='noscalebtn w-72 text-xl max-[600px]:w-32'>
                <SelectValue  placeholder="Choose how to sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Price, low to high' className="text-xl">Price, low to high</SelectItem>
                <SelectItem value='Price, high to low' className="text-xl">Price, high to low</SelectItem>
                <SelectItem value='Date, old to new' className="text-xl ">Date, old to new</SelectItem>
                <SelectItem value='Date, new to old' className="text-xl ">Date, new to old</SelectItem>
                <SelectItem value='Alphabetically, A to Z' className="text-xl ">Alphabetically, A to Z</SelectItem> 
                <SelectItem value='Alphabetically, Z to A' className="text-xl ">Alphabetically, Z to A</SelectItem> 
              </SelectContent>
            </Select>
            </span>
            <span className='mr-8 max-[600px]:mr-0'> {products.length} Products  </span>
          </div>
        </div>
        <section className='mt-26 px-4 md:px-6 py-16 max-[600px]:py-4 '>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 max-[600px]:gap-1 space-y-2">
            {filteredproducts.length>0 && filteredproducts.map((product, index) => (
              <div key={index} className="relative group rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2" onClick={()=> showProduct(product)}>
                <img
                alt={`${product.title}`}
                src={`images/${product.images[0].imagestring}`}
                className="object-cover w-11/12 hover:rounded-3xl aspect-[4/4] max-[1000px]:aspect-[3/4]"
              />
              { product.is_out_stock ? 
                    <div className="p-4 bg-pink-500/80 w-9/12 text-center m-auto cursor-pointer relative bottom-20 rounded-full text-3xl max-[1500px]:bottom-4  max-[1500px]:p-1 max-[1500px]:text-xl">
                      Sold
                    </div> : <div className="p-7 w-9/12 text-center m-auto cursor-pointer relative bottom-20 rounded-full text-3xl">
                    </div> 
              }
              <div className="bg-white p-8 max-[1000px]:p-1 dark:bg-gray-950">
                <h3 className="font-bold text-center text-lg max-[1500px]:text-base">{product.title}</h3> 
                {   product.oldprice  && product.oldprice > product.price && 
                        <p className="line-through mt-8 max-[1500px]:mt-2 text-base max-[1500px]:text-xs text-center text-gray-500">
                          Rs {"  "}
                          <span className="text-foreground">
                          {`${product.oldprice.toLocaleString()}`} 
                          </span>
                        </p> 
                  }
                <p className="mt-4 max-[1500px]:mt-1 text-base text-center max-[1500px]:text-xs text-gray-500">Rs {product.price.toLocaleString()}</p> 
                </div>
              </div>
            ))}
          </div>
       </section>
       {numpages === 0 && <span className='text-2xl text-center mt-10'> No products found for your query </span>}
       { numpages > 0 && 
          <Pagination className='mt-24 '>
            <PaginationContent>
              { page === 1 ?  "" :
                  <button className="w-10 h-10 px-2 rounded-full focus:outline-none hover:bg-slate-200 text-3xl" onClick={handlePrevPg}>
                  <IoIosArrowBack  />
                </button>
              }      
              { pages.map((pg,idx)=>(
                <PaginationItem key={idx}>
                  {pg === page ? <PaginationLink href="#" isActive={true} className='text-2xl'>{pg}</PaginationLink>
                  : <PaginationLink href="#" isActive={false} className='text-2xl'>{pg}</PaginationLink>
                  }
                </PaginationItem>
              ))}
              { pages[pages.length-1] === numpages ?  "" :
                  <PaginationItem >
                  <PaginationEllipsis className='' style={{ transform: 'scale(2.0)' }}  />
                </PaginationItem>
              }
              {/* {console.log(page,numpages,pages)} */}
              { page === numpages ?  "" :
                  <button className="w-10 h-10 px-2 rounded-3xl focus:outline-none hover:bg-slate-200 text-3xl" onClick={handleNextPg}>
                    <IoIosArrowForward  />
                  </button> 
              } 
            </PaginationContent>
        </Pagination>
       }
      </div>
    </div>
  )
}

export default Category