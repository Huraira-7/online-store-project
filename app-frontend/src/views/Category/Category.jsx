import {useState,useEffect} from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious} from "@/components/ui/pagination"
import { fetchproductbycategory } from '@/api/internal'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {  useNavigate } from 'react-router-dom';
import Popper from '@mui/material/Popper';
import { GrCheckboxSelected, GrCheckbox } from "react-icons/gr";
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import './category.css'


function Category({category}) {
  // console.log(window.location.href)  //current URL 
  const [products,setProducts] = useState([])
  const [filteredproducts, setFilteredproducts] = useState([])
  const [page,currentPage] = useState(1)
  const [pages,setPages] = useState([1])
  const [numpages,setNumpages] = useState(1)
  const [selected,setSelected] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching products of category",category)
      const data = {category}
      const resp = await fetchproductbycategory(data)
      console.log(resp)
      if(resp.status === 200){
        let tmp = resp.data.products
        let dup = [...tmp]
        let dup2 = tmp.concat(dup)
        let dup3 = dup2.concat(dup2)
        setProducts(dup3)
        setFilteredproducts(dup3.slice(0, 6))

        let np = Math.ceil(dup3.length/6)  // resp.data.products.length/6
        setNumpages(np)

        let tmparr = [1]
        // console.log(np)
        for(let i = 1; i<=np; i++){
          if(i==1) {continue;}
          tmparr.push(i)
          if(i==3) {break;}
        }
        console.log(tmparr)
        setPages(tmparr)
        
      } else if (resp.code === "ERR_BAD_REQUEST") {  // display error message
        console.log("setting error-----",resp.response.status); 
        // if (response.response.status === 404) {setError("error 404 Server is offline");}
        // if (response.response.status === 500) {setError("error 500 Internal Server Error");}      
      } 
    }
    fetchData();
    
  }, [])


  function handleNextPg(e) {
    e.preventDefault()
    if(pages[pages.length-1]!==numpages){
      console.log("nxt",pages)
      setPages(prevState => prevState.map(value => value + 1));
    }
    const index = page*6
    const endIndex = Math.min(products.length, index + 6);
    setFilteredproducts(products.slice(index,endIndex))
    console.log("start,end",index,endIndex,products.length)
    currentPage((oldpg) => oldpg+1)
  }

  function handlePrevPg(e) {
    e.preventDefault()
    if(pages[0] !== 1){
      console.log("prev",pages)
      setPages(prevState => prevState.map(value => value - 1));
    }
    const index = (page-1)*6
    const startIndex = Math.max(0, index - 6);
    setFilteredproducts(products.slice(startIndex,index))
    console.log("start,end",startIndex,index,products.length)
    currentPage((oldpg) => oldpg-1)
  }
  

  function showProduct(prod){
    navigate('/product', { state:{product: btoa(JSON.stringify(prod))} })
  } 

  function handleSelection(value) {
    if(page!==1){
      currentPage(1)
      setPages([1,2,3])
    }
    let sorttype = value.split(' ')[0]
    let sortdir = ['A','old','low'].includes(value.split(' ')[1])
    let sortdirection = sortdir ? 'ascending' : 'descending'
    // console.log(sorttype)
    // console.log(sortdir)
    console.log(sorttype, sortdirection)
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
      console.log(val)
      if(parseInt(val)>0){
        setp2(parseInt(val));
      } 
    } 
  }

  const handleAvailClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handlePriceClick = (event) => {
    setAnchorEl2(anchorEl2 ? null : event.currentTarget);
  };

  const closeSort = () => {
    if(open) { setAnchorEl(null);  }
    if(open2){ setAnchorEl2(null);  }
  }


  return (
    <div className='min-h-screen mb-52' onClick={closeSort}>
      <div className='flex flex-col m-16'>
        <span className='text-6xl'>{category}</span>
        <div className='text-3xl mt-20 flex justify-between'>
          <div className='flex'>
            <span className='mr-8'> Filter:  </span>
            <span className='flex cursor-pointer mr-8'> 
              <span className='pr-4 hover:underline'>Availability </span>
              <IoIosArrowDown className='mt-1' onClick={handleAvailClick}/>
              <Popper  open={open} anchorEl={anchorEl}>
                  <div className='bg-slate-100 mt-4 flex flex-col px-6 py-8 rounded-md outline outline-blue-200'>
                    <div className='flex justify-between'>
                      <span className='text-2xl'> {selected === '' ? 0 : 1} selected </span>
                      <span className='hover:underline cursor-pointer text-2xl' onClick={()=>setSelected('')}> Reset </span>
                    </div>
                    <Separator className='bg-slate-300 mt-4' />
                    <div className='flex justify-between gap-8 mt-8'>
                      {selected === 'in' ? <GrCheckboxSelected size={30}/> : <GrCheckbox size={30} onClick={()=>setSelected('in')} /> }
                      <span className='text-3xl text-gray-700'> In stock (23) </span>     
                    </div>
                    <div className='flex justify-between gap-8'>
                      {selected === 'out' ? <GrCheckboxSelected size={30}/> : <GrCheckbox size={30} onClick={()=>setSelected('out')}  /> }
                      <span className='text-3xl text-gray-700'> Out of stock (17) </span>
                    </div>
                  </div>
              </Popper>
            </span>
            <span className='flex cursor-pointer'> 
              <span className='pr-4 hover:underline'>Price </span>
              <IoIosArrowDown className='mt-1' onClick={handlePriceClick}/>
              <Popper  open={open2} anchorEl={anchorEl2}>
                  <div className='text-xl gap-6 flex mt-4 px-4 py-8  rounded-md outline outline-blue-200'>
                      <span className='text-3xl'> Rs. </span>
                      <Input placeholder='From' type='number' value={p1} onChange = { (e) => handlesetP1(e.target.value)}  className='placeholder:text-2xl text-2xl'/>
                      <span className='text-3xl'> Rs. </span>
                      <Input placeholder='To'  type='number'  value={p2} onChange = { (e) => handlesetP2(e.target.value)}  className='placeholder:text-2xl text-2xl'/>
                  </div>
              </Popper>
            </span>
          </div>
          <div className='flex'>
            <span className='mr-8'> Sort By:  </span>
            <span className='flex cursor-pointer mr-8'> 
            <Select onValueChange={(val)=>handleSelection(val)}>
              <SelectTrigger className='noscalebtn text-2xl w-72'>
                <SelectValue  placeholder="Choose how to filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Price, low to high' className="text-2xl">Price, low to high</SelectItem>
                <SelectItem value='Price, high to low' className="text-2xl">Price, high to low</SelectItem>
                <SelectItem value='Date, old to new' className="text-2xl ">Date, old to new</SelectItem>
                <SelectItem value='Date, new to old' className="text-2xl ">Date, new to old</SelectItem>
                <SelectItem value='Alphabetically, A to Z' className="text-2xl ">Alphabetically, A to Z</SelectItem> 
                <SelectItem value='Alphabetically, Z to A' className="text-2xl ">Alphabetically, Z to A</SelectItem> 
              </SelectContent>
            </Select>
              {/* <span className='pr-4'>Alphabetically, A to Z </span>
              <IoIosArrowDown className='mt-1'/> */}
            </span>
            <span className='mr-8'> {products.length} Products  </span>
          </div>
        </div>
        <section className='mt-26 px-4 md:px-6 py-16'>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 space-y-52">
            {filteredproducts.length>0 && filteredproducts.map((product, index) => (
              <div key={index} className="relative group rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2" onClick={()=> showProduct(product)}>
                {/* {console.log(product.images[0].imagestring)} */}
                <img
                alt={`${product.title}`}
                src={`http://localhost:3000/images/${product.images[0].imagestring}`}
                className="object-cover w-11/12 h-full hover:rounded-3xl"
                style={{ aspectRatio: "4/4" }}
              />
              <div className="bg-white mt-8 p-8 dark:bg-gray-950">
                <h3 className="font-bold text-center text-3xl">{product.title}</h3> 
                <p className="mt-8 text-2xl text-center text-gray-500">Rs {product.price.toLocaleString()}</p> 
              </div>
              </div>
            ))}
          </div>
       </section>
        <Pagination className='mt-52 '>
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
      </div>
    </div>
  )
}

export default Category