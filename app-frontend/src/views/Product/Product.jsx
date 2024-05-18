import {useState,useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../../store/userSlice';
// import { ScrollArea,ScrollBar } from "@/components/ui/scroll-area"
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { CarouselItem, CarouselContent, CarouselPrevious, CarouselNext, Carousel } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { FaPlus,FaMinus } from "react-icons/fa";
import Loading from '@/lib/Loading';

function Product({setCartbadge,loading,setLoading}) {
  const[product,setProduct] = useState()
  const [totalSlides , setNumslides] = useState(0)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user); 
  const down = useSelector((state) => state.user.down); 
  const location = useLocation();
  const encodedData = location.state?.product
  
  useEffect(() => {
    function checkifValid(){
      let p ;
      if (encodedData) { p = JSON.parse(atob(encodedData)); }
      setProduct(p)
      // console.log("specific product ... ",p);
      if(p === undefined) {
        // console.log("no-prod")
        navigate('/',{replace:true})
        return
      }
      if(down === true ) { 
        // console.log("down")
        navigate('/downtime',{replace:true}) 
        return
      }
      // console.log(p.images.length)
      setNumslides(p.images.length)
      setLoading(false)
    }
    checkifValid()
  }, [])
  
  const [qty, setQty] = useState(1)

  function handlesetQty(e){
    if (!isNaN(parseInt(e.target.value)) && parseInt(e.target.value) >= 1) {
      setQty(parseInt(e.target.value));
    }
  }

 function handleMinus(e){
    e.preventDefault()
    if (qty-1>0) {
      setQty(qty-1);
    }
  }

  function handleAdd(e){
    e.preventDefault()
    setQty(qty+1);
  }

  function handleAddItem(e){
    e.preventDefault()
    if(product.is_out_stock === false){
      // console.log(product)
      let temp = {...product}
      temp['qty'] = qty
      dispatch(addItem(temp));
      let cartt = user.cart
      setCartbadge(cartt.length)
    }
  }

  const [api, setApi] = useState()  //CarouselApi

  const handleNextClick = () => {
    if(api.canScrollNext()) {api.scrollNext()} else {api.scrollTo(0,false,-1)}
  };

  const handlePreviousClick = () => {
    if(api.canScrollPrev()) {api.scrollPrev()} else {api.scrollTo(totalSlides-1,false,1)}
  };

  const starter=  '' //'http://192.168.100.136:3000/'



  return (
    loading ? <Loading/> :
    <div className="">
      <div className='my-16 flex flex-col justify-center items-center'>
      <Carousel  setApi={setApi} plugins={[ Autoplay({delay: 5000, }),]} className={`w-9/12 mx-auto rounded-3xl bg-red-100`}>
        <CarouselContent className="my-6">
            {product && product.images.map((img,idx)=>(
              !img.is_deleted && 
              <CarouselItem key={idx} className=''>
                <div className='relative w-full flex rounded-lg items-center justify-center'>
                      <img
                        alt={`${product.title}`}
                        src={`${starter}images/${img.imagestring}`}
                        className="object-contain w-full h-[400px] max-[600px]:h-[220px] max-[600px]:object-cover hover:rounded-3xl"
                        style={{ aspectRatio: "5/4" }}
                        />
                    { totalSlides> 1 && <LeftRightButtons handleNextClick={handleNextClick} handlePreviousClick={handlePreviousClick}/>}
                </div>
                </CarouselItem>
            ))}
              
       </CarouselContent>
      </Carousel>
        <div className='productinfo flex flex-col items-center justify-center mx-auto my-10 max-[600px]:my-2  gap-6'>
          <p className="mt-4 text-2xl text-gray-500 text-nowrap"> B L I N G &nbsp; B O U T I Q U E</p> 
          <h1 className='text-xl leading-normal font-semibold text-wrap'>{product && product.title}</h1>
          <span className='text-lg text-slate-500 text-nowrap'>Rs. {product && product.price.toLocaleString()} 
          {product && product.is_out_stock ?  <span className='ml-8 bg-slate-400 px-8 py-2 rounded-full cursor-pointer'> Sold Out </span> : <span></span> }
          </span>
          <p className="text-gray-600 text-lg"> Quantity </p>
          <div className={`h-20 flex w-9/12 max-[600px]:h-12`} >
              <button className={`focus:outline-none bg-red-900/40 px-2 pl-8 max-[600px]:pl-2  rounded-l-lg noscalebtn outline-none hover:outline-black outline-2 hover:rounded-lg`} onClick={(e)=>handleMinus(e)}><FaMinus className='text-4xl' /></button>
              <input
                  type="text"
                  value = {qty}
                  onChange={(e)=>handlesetQty(e)}
                  className={`flex text-center w-7/12 bg-red-900/40 h-full px-8 text-black text-2xl focus:outline-none`}
              />
              <button className={`focus:outline-none px-2 pr-8 max-[600px]:pr-2 bg-red-900/40 rounded-r-lg noscalebtn outline-none hover:outline-black outline-2 hover:rounded-lg `} onClick={(e)=>handleAdd(e)}><FaPlus className='text-4xl' /></button>
          </div>
          <span  className={`hover:scale-105 flex ${product && product.is_out_stock ? 'cursor-not-allowed' : 'cursor-pointer'} justify-center py-8 px-6 max-[600px]:p-3 max-[600px]:mx-0 rounded-lg bg-black w-9/12 focus:outline-none`} onClick={(e)=>handleAddItem(e)}>
            <span className='text-white text-xl '> Add to Cart </span>
          </span>
          <pre className='text-xl text-wrap leading-loose text-slate-700 mx-auto max-[600px]:ml-6'> {product && product.description}  </pre>
        </div>
      </div>
    </div>
  )
}


function LeftRightButtons(props) {
  return (
    <>
    <div className="absolute left-4 rounded-md "> 
      <button className="w-16 h-16 px-4 rounded-full focus:outline-none hover:bg-white text-3xl" onClick={props.handlePreviousClick}>
        <IoIosArrowBack  />
      </button>
    </div>
    <div className="absolute right-4 rounded-md "> 
      <button className="w-16 h-16 px-4 rounded-full focus:outline-none hover:bg-white text-3xl" onClick={props.handleNextClick}>
        <IoIosArrowForward />
      </button>
    </div>
    </>
  )
}


export default Product