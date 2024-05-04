import {useState,useEffect} from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious} from "@/components/ui/pagination"
import { fetchproductbycategory } from '@/api/internal'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function Category({category}) {
  // console.log(window.location.href)  //current URL 
  const [products,setProducts] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching products of category",category)
      const data = {category}
      const resp = await fetchproductbycategory(data)
      console.log(resp)
      if(resp.status === 200){
        setProducts(resp.data.products)
      } else if (resp.code === "ERR_BAD_REQUEST") {  // display error message
        console.log("setting error-----",resp.response.status); 
        // if (response.response.status === 404) {setError("error 404 Server is offline");}
        // if (response.response.status === 500) {setError("error 500 Internal Server Error");}      
      } 
    }
    fetchData();
    
  }, [])
  
  return (
    <div className='min-h-screen mb-52'>
      <div className='flex flex-col m-16'>
        <span className='text-5xl'>{category}</span>
        <div className='text-3xl mt-20 flex justify-between'>
          <div className='flex'>
            <span className='mr-8'> Filter:  </span>
            <span className='flex cursor-pointer mr-8'> 
              <text className='pr-4 hover:underline'>Availability </text>
              <IoIosArrowDown className='mt-1'/>
            </span>
            <span className='flex cursor-pointer'> 
              <text className='pr-4 hover:underline'>Price </text>
              <IoIosArrowDown className='mt-1'/>
            </span>
          </div>
          <div className='flex'>
            <span className='mr-8'> Sort By:  </span>
            <span className='flex cursor-pointer mr-8'> 
              <text className='pr-4'>Alphabetically, A to Z </text>
              <IoIosArrowDown className='mt-1'/>
            </span>
            <span className='mr-8'> {products.length} Products  </span>
          </div>
        </div>
        <section className='mt-26 px-4 md:px-6 py-16'>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 space-y-36">
            {products.length>0 && products.map((product, index) => (
              <div key={index} className="relative group rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                {console.log(product.images[0].imagestring)}
                <img
                alt={`${product.title}`}
                src={`http://localhost:3000/images/${product.images[0].imagestring}`}
                className="object-cover w-11/12 h-full hover:rounded-3xl"
                height={400}
                width={500}
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
            {/* <PaginationItem >
              <PaginationPrevious href="#" className='text-2xl' />
            </PaginationItem> */}
             <button className="w-10 h-10 px-2 rounded-full focus:outline-none hover:bg-slate-200 text-3xl">
                {/* <img alt='left' src={left} className='rounded-3xl' /> */}
                <IoIosArrowBack  />
              </button>
            <PaginationItem>
              <PaginationLink href="#" className='text-2xl'>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive className='text-2xl'>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" className='text-2xl'>3</PaginationLink>
            </PaginationItem>
            <PaginationItem >
              <PaginationEllipsis className='' style={{ transform: 'scale(2.0)' }}  />
            </PaginationItem>
            {/* <PaginationItem>
              <PaginationNext href="#" className='text-2xl'/>
            </PaginationItem> */}
            <button className="w-10 h-10 px-2 rounded-3xl focus:outline-none hover:bg-slate-200 text-3xl">
                {/* <img alt='left' src={left} className='rounded-3xl' /> */}
                <IoIosArrowForward  />
              </button>
          </PaginationContent>
      </Pagination>
      </div>
    </div>
  )
}

export default Category