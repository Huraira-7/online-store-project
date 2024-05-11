import {useState,useEffect} from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious} from "@/components/ui/pagination"
import { fetchproductbycategory } from '@/api/internal'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import './category.css'


function Category({category}) {
  // console.log(window.location.href)  //current URL 
  const [products,setProducts] = useState([])
  const [filteredproducts, setFilteredproducts] = useState([])
  const [page,currentPage] = useState(1)
  const [pages,setPages] = useState([1])
  const [numpages,setNumpages] = useState(1)

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
        setProducts(dup2.concat(dup2))
        setFilteredproducts(dup2.concat(dup2).slice(0, 6))

        let np = Math.ceil(dup2.concat(dup2).length/6)  // resp.data.products.length/6
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

  function handlePageMove(e,pnum) {
    e.preventDefault()
    const diff= Math.abs(page-pnum) //either 1 or 2
    console.log("move to ",pnum, "from ", page, "diff=",diff )
    if(pnum> page){
      if(pages[pages.length-1]!==numpages){
          console.log("nxt")
          if(diff==1){ setPages(prevState => prevState.map(value => value + 1));  }
          else {   
            if(pages[pages.length-1]!==numpages-1){ console.log("upd2");
              setPages(prevState => prevState.map(value => value + 2));
            }
          }
      }
      
      let index;
      if(diff==1){ index = page*6 }
      else       { index = (page+1)*6 } 
      const endIndex = Math.min(products.length, index + 6);
      setFilteredproducts(products.slice(index,endIndex))
      console.log("start,end",index,endIndex,products.length)
      currentPage(pnum)
      return;
    } 
    if (pnum < page){
      for(let i=0; i<diff; i++) {
        if(pages[0]!==1){
          console.log("prev")
          setPages(prevState => prevState.map(value => value - 1));
        }
      }
      let index;
      if(diff==1){ index = (page-1)*6 }
      else       { index = (page-2)*6 } 
      const startIndex = Math.max(0, index - 6);
      setFilteredproducts(products.slice(startIndex,index))
      console.log("start,end",startIndex,index,products.length)
      currentPage(pnum)
      return;
    }
  }

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
  
  return (
    <div className='min-h-screen mb-52'>
      <div className='flex flex-col m-16'>
        <span className='text-5xl'>{category}</span>
        <div className='text-3xl mt-20 flex justify-between'>
          <div className='flex'>
            <span className='mr-8'> Filter:  </span>
            <span className='flex cursor-pointer mr-8'> 
              <span className='pr-4 hover:underline'>Availability </span>
              <IoIosArrowDown className='mt-1'/>
            </span>
            <span className='flex cursor-pointer'> 
              <span className='pr-4 hover:underline'>Price </span>
              <IoIosArrowDown className='mt-1'/>
            </span>
          </div>
          <div className='flex'>
            <span className='mr-8'> Sort By:  </span>
            <span className='flex cursor-pointer mr-8'> 
            <Select>
              <SelectTrigger className='noscalebtn text-2xl w-72'>
                <SelectValue placeholder="Alphabetically, A to Z" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='l' className="text-2xl">Price, low to high</SelectItem>
                <SelectItem value='d' className="text-2xl">Price, high to low</SelectItem>
                <SelectItem value='sys' className="text-2xl ">Date, old to new</SelectItem>
                <SelectItem value='sys2' className="text-2xl ">Date, new to old</SelectItem>
                <SelectItem value='sys4' className="text-2xl ">Alphabetically, A to Z</SelectItem> 
                <SelectItem value='sys3' className="text-2xl ">Alphabetically, Z to A</SelectItem> 
              </SelectContent>
            </Select>
              {/* <span className='pr-4'>Alphabetically, A to Z </span>
              <IoIosArrowDown className='mt-1'/> */}
            </span>
            <span className='mr-8'> {products.length} Products  </span>
          </div>
        </div>
        <section className='mt-26 px-4 md:px-6 py-16'>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 space-y-36">
            {filteredproducts.length>0 && filteredproducts.map((product, index) => (
              <div key={index} className="relative group rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                {/* {console.log(product.images[0].imagestring)} */}
                <img
                alt={`${product.title}`}
                src={`http://localhost:3000/images/${product.images[0].imagestring}`}
                className="object-cover w-11/12 h-full hover:rounded-3xl"
                style={{ aspectRatio: "4/4" }}
              />
              <div className="bg-white mt-8 p-8 dark:bg-gray-950">
                <h3 className="font-bold text-xl">{product.title}</h3> 
                <p className="text-sm text-gray-500">{product.description}</p> 
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
                 : <PaginationLink href="#" isActive={false} className='text-2xl' onClick={(e) => handlePageMove(e,idx+1)}>{pg}</PaginationLink>
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