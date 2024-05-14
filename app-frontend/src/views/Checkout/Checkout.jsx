import {useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import {emptyCart} from '../../store/userSlice'
import {  useDispatch, useSelector } from 'react-redux';
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Badge from '@mui/material/Badge';
import { GrRadialSelected } from "react-icons/gr";
import { sendorderconfirmationemail } from '@/api/internal';
import ErrorMessage from '@/lib/ErrorMessage';
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
  const[phone,setPhone] = useState('')
  const[postcode,setPostCode] = useState()
  const [paymentmethod, setPaymentMethod] = useState('COD')

  // function handleOpenCart(){
  //   // setCartopen(true)
  //   // navigate('/',{replace:true})
  //   //nav to home page, open cart
  // }

  useEffect(() => {
    const calculateTotalPrice = async () => {
      if(user.down === true ) { 
        // console.log("down")
        navigate('/downtime',{replace:true}) 
        return
      }
      console.log("calculating total price",cart)
      let total = 0
      if(cart.length === 0) {navigate('/',{replace:true})}
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
        setPhone(val);
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

  async function handleCheckOut() {
    //show payment details when clicked on online transfer
    if(fname === '' || lname === '' || email === '' || phone === '' || city === '' || address == '' || postcode === ''){
      handleOpenerr('All fields are required')
      return;
    }
    if(phone[0] < 0 && String(phone).length !== 11 && /^\d+$/.test(phone) !== true){
      handleOpenerr('A phone number  >= 0 and of 11 digits should be submitted in order to process the form');
      return;
    }
    const emailInput = document.getElementById('checkoutmail');
    if (!emailInput.validity.valid) { 
      handleOpenerr('Badly formatted Email address')
      return;
    }
    //maybe test on city (allow select option for some cities only) ??

    console.log(cart)
    const message = `Customer Name: ${fname} ${lname} \n Customer Email: ${email} \n Customer Phone Number: ${phone} 
                    Customer Address: ${address}, ${city}, ${postcode}
                    This email is to inform you that your order of  ${cart.map(item => ` ${item.qty}  ${item.title} , `).join('')} for Rs. ${tp} has been successfully placed at Bling Boutique
                    Please expect it to be delivered within 3 to 5 working days \n`
    const body = {message , email}
    console.log(body)
    const resp = await sendorderconfirmationemail(body);
    if(resp.status === 200 ){  
      setCartbadge(0)
      dispatch(emptyCart())
      navigate('/',{replace:true})   
    }
  }

  const [error, setError] = useState('')
  const [openerr, setOpenerr] = useState(false);
  const handleOpenerr = (txt) => { 
    setError(txt)
    setOpenerr(true); 
  };


  return (
    <div className='overflow-y-auto'>
      <div className='my-8 mx-32 flex justify-between'>
        <div className='text-5xl mb-4 font-semibold cursor-pointer h-11' onClick={()=>navigate('/',{replace:true})} > Bling Boutique </div>
      </div>
      <Separator className='bg-slate-300' />
      <div className='flex'>
          <div className='w-6/12 mb-64'>
            <div className='ml-8 mt-16 w-11/12  h-screen flex flex-col gap-4'>
              <span className='text-3xl font-semibold'>Contact</span>
              <Input type="email" id="checkoutmail" placeholder="Email" value = {email} onChange = { (e) => setEmail(e.target.value)} className='p-7 mt-8 placeholder:text-2xl text-2xl focus:outline-blue-500' />
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
                <span> Rs. 299 </span>
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
              {paymentmethod === 'OT' && 
                <div className='flex flex-col mt-8 items-left text-2xl'>
                   <span className='text-center text-3xl'> Transfer Details </span>
                   <span> Bank Account: </span>
                   <span> Whatsapp screenshot to this number</span>
                </div>
              }
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
                    <span className='text-3xl font-semibold'> Rs. 299 </span>
                </div>
                <div className='flex justify-between'>
                    <span className='text-3xl font-semibold'> Total </span>
                    <span className='text-4xl font-semibold'> Rs. {(tp+299).toLocaleString()} </span>
                </div> 
            </div>
          </div>
      </div>
      <ErrorMessage  error={error} setError={setError} openerr={openerr} setOpenerr={setOpenerr} />
    </div>
  )
}


export default Checkout