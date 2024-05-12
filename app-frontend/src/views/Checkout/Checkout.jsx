import {useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import {emptyCart} from '../../store/userSlice'
import {  useDispatch, useSelector } from 'react-redux';
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Badge from '@mui/material/Badge';
import { GrRadialSelected } from "react-icons/gr";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"

function Checkout({setCartbadge}) {
  const user = useSelector((state) => state.user);
  const cart = user.cart
  // console.log(cart)
  const navigate= useNavigate();
  const dispatch= useDispatch();

  const[tp,setTp] = useState(0)
  const[email,setEmail] = useState('')
  const[fname,setFname] = useState('')
  const[lname,setLname] = useState('')
  const[city,setCity] = useState('')
  const[address,setAddress] = useState('')
  const[phone,setPhone] = useState()
  const[postcode,setPostCode] = useState()
  const [paymentmethod, setPaymentMethod] = useState('COD')

  function handleOpenCart(){
    //nav to home page, open cart
  }

  useEffect(() => {
    const calculateTotalPrice = async () => {
      console.log("calculating total price",cart)
      let total = 0
      for (var i in cart){
        let p = cart[i];
        let newprice = p.price * p.qty
        total += newprice
      }
      setTp(total)    
    }
    calculateTotalPrice();
    
  }, [])

  function handlesetPhone(val){ 
    if (!isNaN(parseInt(val))) {
      if(parseInt(val)>=0){
        setPhone(parseInt(val));
      } else {

      }
    } else{

    }
  }
  function handlesetPost(val){
    if (!isNaN(parseInt(val))) {
      if(parseInt(val)>=0){
        setPostCode(parseInt(val));
      } else {

      }
    } else{
      
    }
  }

  function handleCheckOut() {
    //show payment details when clicked on online transfer
    setCartbadge(0)
    dispatch(emptyCart())
    navigate('/',{replace:true})
  }

  return (
    <div className='overflow-y-auto'>
      <div className='my-8 mx-32 flex justify-between'>
        <div className='text-5xl font-semibold cursor-pointer' > Bling Boutique </div> {/* onClick={navigate('/',{replace:true})} */}
        <button className="rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800" onClick={handleOpenCart}>
                <ShoppingCartIcon className="h-11 w-11" />
                <span className="sr-only">Open cart</span>
        </button>
      </div>
      <Separator className='bg-slate-300' />
      <div className='flex'>
          <div className='w-6/12 mb-36'>
            <div className='ml-8 mt-16 w-11/12  h-screen flex flex-col gap-4'>
              <span className='text-3xl font-semibold'>Contact</span>
              <Input type="email" placeholder="Email" value = {email} onChange = { (e) => setEmail(e.target.value)} className='p-7 mt-8 placeholder:text-2xl text-2xl focus:outline-blue-500' />
              <Input type="phone" placeholder="Mobile Phone Number" value = {phone} onChange = { (e) => handlesetPhone(e.target.value)} className='p-7 placeholder:text-2xl text-2xl focus:outline-blue-500' />
              <span className='text-3xl font-semibold mt-16'>Delivery</span>
              <div className='flex gap-8 mt-8'>
                <Input type="name" placeholder="First Name" value = {fname} onChange = { (e) => setFname(e.target.value)} className='p-10 placeholder:text-2xl text-3xl focus:outline-blue-500' />
                <Input type="name" placeholder="Last Name" value = {lname} onChange = { (e) => setLname(e.target.value)} className='p-10 placeholder:text-2xl text-3xl focus:outline-blue-500' />
              </div>
              <Input type="address" placeholder="Address" value = {address} onChange = { (e) => setAddress(e.target.value)} className='p-10 placeholder:text-2xl text-3xl focus:outline-blue-500' />
              <div className='flex gap-8'>
                <Input type="city" placeholder="City" value = {city} onChange = { (e) => setCity(e.target.value)} className='p-10 placeholder:text-2xl text-3xl focus:outline-blue-500' />
                <Input type="postalcode" placeholder="Postal Code" value = {postcode} onChange = { (e) => handlesetPost(e.target.value)} className='p-10 text-3xl placeholder:text-2xl focus:outline-blue-500' />
              </div>
              <span className='text-3xl font-semibold mt-8'>Shipping Method</span>
              <div className='flex justify-between bg-blue-200 p-6 text-2xl rounded-md'>
                <span>Standard </span>
                <span> Rs. 199 </span>
              </div>
              <span className='text-3xl font-semibold mt-8'> Payment </span>
              <div onClick={()=>setPaymentMethod('COD')} className='cursor-pointer flex justify-between bg-blue-200 p-6 text-2xl rounded-md'>
                <span> Cash on Delivery </span>
                {paymentmethod === 'COD' ?  <GrRadialSelected /> : '' }
              </div>
              <div onClick={()=>setPaymentMethod('OT')} className='cursor-pointer flex justify-between bg-blue-200 p-6 text-2xl rounded-md'>
                <span> Online Transfer </span>
                {paymentmethod === 'OT' ?  <GrRadialSelected /> : '' }
              </div>
              <span onClick={handleCheckOut} className='mt-8 cursor-pointer hover:scale-105 flex justify-center bg-blue-600 p-10 text-4xl text-white text-center rounded-lg'>
                Complete Order
              </span>     
            </div>
          </div>
          <div className='w-6/12 bg-slate-200'>
            {cart.map((prod,idx) => (
              <div key={idx} className='flex ml-16 mt-16'> 
                  <Badge badgeContent={prod.qty} max={10} color="secondary">
                    <figure className="shrink-0 w-[200px]">
                      <div className="overflow-hidden rounded-md">
                        <img
                          src={`http://localhost:3000/images/${prod.images[0].imagestring}`}
                          alt={`${prod.images[0].imagestring}`}
                          className="aspect-[4/4] object-cover"
                          />
                      </div>
                    </figure>
                  </Badge>
                  <div className='flex items-center'>
                    <span className='text-3xl ml-16'>{prod.title}</span>
                    <span className='ml-52 text-2xl'>Rs. {prod.price.toLocaleString()}</span>
                  </div>         
              </div>
            ))}
            <div className='flex mt-16 ml-16 flex-col w-10/12 gap-4'>
                <div className='flex justify-between'>
                    <span className='text-3xl'> Subtotal </span>
                    <span className='text-3xl font-semibold'> Rs. {tp.toLocaleString()} </span>
                </div>
                <div className='flex justify-between'>
                    <span className='text-3xl '> Shipping Total </span>
                    <span className='text-3xl font-semibold'> Rs. 199 </span>
                </div>
                <div className='flex justify-between'>
                    <span className='text-3xl font-semibold'> Total </span>
                    <span className='text-4xl font-semibold'> Rs. {(tp+199).toLocaleString()} </span>
                </div> 
            </div>
          </div>
      </div>
    </div>
  )
}

function ShoppingCartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}

export default Checkout