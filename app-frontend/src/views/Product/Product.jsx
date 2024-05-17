import {useState,useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../../store/userSlice';
import { ScrollArea,ScrollBar } from "@/components/ui/scroll-area"
import { FaPlus,FaMinus } from "react-icons/fa";
import Loading from '@/lib/Loading';

function Product({setCartbadge,loading,setLoading}) {
  const[product,setProduct] = useState()
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const backendlink = `https://online-store-project-backend.vercel.app`


  return (
    loading ? <Loading/> :
    <div className="">
      <div className='my-16 ml-52 max-[1000px]:mx-auto max-[1000px]:ml-6 flex justify-between max-[1600px]:flex-col'>
      <ScrollArea className="my-16 max-[1000px]:my-0 w-6/12 max-[1600px]:w-11/12 whitespace-nowrap">
        <div className='w-full'>
          {product && product.images.map((img,idx)=>(
             !img.is_deleted && 
              <div key={idx} className="w-10/12 mb-16 relative group rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                <img
                alt={`${product.title}`}
                src={`${backendlink}/images/${img.imagestring}`}
                className="object-cover w-full hover:rounded-3xl"
                style={{ aspectRatio: "5/4" }}
              />
            </div>
          ))}

        </div>
          <ScrollBar orientation='vertical' className=''/>
          {/* <ScrollBar orientation='horizontal' className=''/> */}
        </ScrollArea>
        <div className='productinfo flex flex-col my-16 mr-60 max-[1000px]:my-2 max-[1000px]:mr-1 gap-12 max-[1000px]:gap-6'>
          <p className="mt-8 text-3xl text-gray-500 text-nowrap max-[1000px]:hidden"> B L I N G &nbsp; B O U T I Q U E</p> 
          <h1 className='text-6xl leading-normal max-[1000px]:text-2xl max-[1000px]:font-semibold text-wrap'>{product && product.title}</h1>
          <span className='text-3xl max-[1000px]:text-xl text-nowrap'>Rs. {product && product.price.toLocaleString()} 
          {product && product.is_out_stock ?  <span className='ml-8 bg-slate-400 px-8 py-2 rounded-full cursor-pointer'> Sold Out </span> : <span></span> }
          </span>
          <p className="text-3xl text-gray-600 max-[1000px]:text-xl"> Quantity </p>
          <div className={`h-28 w-[350px] flex max-[1000px]:w-11/12 max-[1000px]:w-11/12 max-[1000px]:h-16`} >
              <button className={`focus:outline-none bg-red-900/40 px-2 pl-8 max-[1000px]:pl-2  rounded-l-lg noscalebtn outline-none hover:outline-black outline-2 hover:rounded-lg`} onClick={(e)=>handleMinus(e)}><FaMinus className='text-4xl' /></button>
              <input
                  type="text"
                  value = {qty}
                  onChange={(e)=>handlesetQty(e)}
                  className={`flex text-center w-7/12 max-[1000px]:text-2xl bg-red-900/40 h-full px-8 text-black text-4xl focus:outline-none`}
              />
              <button className={`focus:outline-none px-2 pr-8 max-[1000px]:pr-2 bg-red-900/40 rounded-r-lg noscalebtn outline-none hover:outline-black outline-2 hover:rounded-lg `} onClick={(e)=>handleAdd(e)}><FaPlus className='text-4xl' /></button>
          </div>
          <span  className={`hover:scale-105 flex ${product && product.is_out_stock ? 'cursor-not-allowed' : 'cursor-pointer'} justify-center py-8 px-6 max-[1000px]:p-3 max-[1000px]:mx-0 rounded-lg bg-black w-9/12 focus:outline-none`} onClick={(e)=>handleAddItem(e)}>
            <span className='text-white text-3xl max-[1000px]:text-2xl '> Add to Cart </span>
          </span>
          <pre className='text-3xl max-[1000px]:text-2xl text-wrap leading-loose text-slate-700'> {product && product.description}  </pre>
        </div>
      </div>
    </div>
  )
}

export default Product