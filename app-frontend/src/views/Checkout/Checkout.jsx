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
import HappyMessage from '@/lib/HappyMessage';
import Loading from '@/lib/Loading';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"

function Checkout({setCartbadge,loading,setLoading}) {
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
  const[billaddress,setbillAddress] = useState('')
  const[diffaddress,setDiffAddress] = useState(false)
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
      // console.log("calculating total price",cart)
      let total = 0
      if(cart.length === 0) {navigate('/',{replace:true})}
      for (var i in cart){
        let p = cart[i];
        let newprice = p.price * p.qty
        total += newprice
      }
      setTp(total+299)  
      setLoading(false)  
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
  // console.log(cart)

  async function handleCheckOut() {

    if(fname.trim() === '' || lname.trim() === '' || email.trim() === '' || phone.trim() === '' || city.trim() === '' || address.trim() === '' || postcode === undefined){
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
    if(email.split('@')[1] !== 'gmail.com'){
      handleOpenerr('Please enter a valid GMAIL address')
      return;
    }

    var part1 = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation - Bling Boutique</title>
      <style>
      body {
        font-family: sans-serif;
        margin: 6px;
        padding: 0;
      }
      .store-heading {
        font-size: 2em;
        font-weight: bold;
        margin-bottom: 1em;
      }
      order-heading{
        font-size: 0.3em;
        font-weight: bold;
        margin-top: 0.3em;
        margin-bottom: 0.3em;
      }
      .order-message {
        font-size: 1.2em;
        color: black;
        margin-bottom: 1em;
      }
      .order-details {
        font-size: 1.0em;
        color: gray;
        margin-bottom: 1em;
      }
      .table {
        border-collapse: collapse;
        width: 100%;
      }
      .table th, .table td {
        padding: 0.5em;
        border: 1px solid #ddd;
      }
      .table th {
        text-align: left;
        font-weight: bold;
      }
      .t2 td{
        text-align: right;
      }
      .t2{
      margin-top:3em;
      }
      
      .order-summary {
        margin-top: 1em;
      }
      .order-summary td {
        padding: 0.5em;
        text-align: right;
      }
      .order-summary td:first-child {
        text-align: left;
        font-weight: bold;
      }
      .address-container {
        display: flex;
        justify-content: space-between;
        margin-top: 2em;
      }
      .address-section {
        border: 1px solid #ddd;
        padding: 1em;
      }
      .t1{
        margin-top: 2em;
      }
      .ot{
        margin: 2em;
      }
      .ot2{
        margin: 2em;
      }
        
      </style>
    </head>
    <body>
      <h1 class="store-heading">Bling Boutique</h1>
      <p class="order-message">Thank you for your purchase!</p>
      <p class="order-details">We're getting your order ready to be shipped. We will notify you when it has been sent.</p>`
    
    var part2 = `
      <table class="table t1">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>`
    for(var i in cart){
      let p = cart[i];
      part2+= `
          <tr>
            <td>${p.title}</td>
            <td>${p.qty}</td>
            <td> Rs. ${p.price.toLocaleString()}</td>
          </tr>
       `
    }
    part2+=`
    </tbody>
    </table>
    <table class="table t2">
      <tbody>
        <tr>
          <td>Subtotal:</td>
          <td>Rs. ${(tp-299).toLocaleString()}</td>  </tr>
        <tr>
          <td>Shipping:</td>
          <td>Rs. 299</td>  </tr>
        <tr>
          <td>Payment Method:</td>
          <td>${paymentmethod === 'OT' ? 'Online Transfer' : 'Cash on Delivery'}</td>  </tr>
        <tr>
          <td>Total:</td>
          <td>Rs. ${tp.toLocaleString()}</td>  </tr>
      </tbody>
    </table>

    ${paymentmethod === 'OT' ?  `<div class="ot">
            <h3> Online Transfer Details </h3>
            <p>Account Holder: Ansa Iqbal </p>
            <p>Bank Name: Meezan Bank </p>
            <p>Branch Name: New Anarkali Bazaar Branch Lahore</p>
            <p> Account Number: <b> 02720107745960 </b> </p>
            <p> IBAN: <b> PK15MEZN0002720107745960 </b> </p>
            <p> Whatsapp screenshot to this number: <b> 0320-8585354  </b> </p>
          </div>` : ''
  }
  <div class="ot2"> 
    <h3> Contact Info </h3>
    <p> Email: ${email} </p>
    <p> Phone Number: ${phone} </p>
  </div>
  
    <div class="address-container">
      <div class="address-section">
        <h2>Shipping Address</h2>
        <p>${fname} ${lname}</p>
        <p>${address}</p>
        <p>${city}</p>
        <p>${postcode}</p>
      </div>
      <div class="address-section">
        <h2>Billing Address</h2>
        <p>${fname} ${lname}</p>
        <p>${(diffaddress === true && billaddress!=='') ? billaddress : address}</p>
        <p>${city}</p>
        <p>${postcode}</p>
      </div>
    </div>
  </body>
  </html>
    `
    handleOpenmsg('Your order has been placed successfully, you will receive an email shortly')
    // console.log(cart)
    const message = `Customer Name: ${fname} ${lname} \n Customer Email: ${email} \n Customer Phone Number: ${phone} \n Customer Shipping Address: ${address}, ${city}, ${postcode} \n Customer Billing Address: ${diffaddress && billaddress!=='' ? billaddress : 'Same as Shipping Address'} \n Payment Method: ${paymentmethod === 'COD' ? 'Cash on Delivery' : 'Online Transfer'} \n ${paymentmethod !== 'COD' ? "Details: Account Holder: Ansa Iqbal\nBank Name: Meezan Bank\nBranch Name: New Anarkali Bazaar Branch Lahore\nAccount Number: 02720107745960\nIBAN: PK15MEZN0002720107745960\nWhatsapp screenshot to this number: 0320-8585354\n" : ""  } This email is to inform you that your order of  ${cart.map(item => ` ${item.qty}  ${item.title} , `).join('')} for Rs. ${tp} has been successfully placed at Bling Boutique \n Please expect it to be delivered within 3 to 5 working days \n`
    const body = {message , msghtml :part1, msghtml2: part2, customer: email}
    // console.log(body)
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

  const [msg, setMsg] = useState('')
  const [openmsg, setOpenmsg] = useState(false);
  const handleOpenmsg = (txt) => { 
    setMsg(txt)
    setOpenmsg(true); 
  };




  return (
    loading ? <Loading/> :
    <div className='overflow-y-auto'>
      <div className='2xl:my-8 2xl:mx-32 mx-8 my-4 flex'>
        <div className='2xl:text-5xl text-3xl text-nowrap mb-4 font-semibold cursor-pointer 2xl:h-11 h-6 ' onClick={()=>navigate('/',{replace:true})} > Bling Boutique </div>
      </div>
      <Separator className='bg-slate-300' />
      {/* <div className='flex flex-col'>
          <h3 > Bling Boutique </h3>
          <h6 className='text-wrap'> Thank you for your purchase! </h6>
          <span className='text-gray text-wrap'> We're getting your order ready to be shipped. We will notify you when has it been sent</span>
      </div> */}
      <div className='flex max-[1400px]:flex-col'>
          <div className='w-6/12 mb-64 max-[1400px]:mb-16 max-[1400px]:w-full'>
            <div className='ml-8 mt-8 2xl:mt-16 w-11/12 flex flex-col gap-4'>
              <span className='2xl:text-3xl text-2xl font-semibold'>Contact</span>
              <Input type="email" id="checkoutmail" placeholder="Email" value = {email} onChange = { (e) => setEmail(e.target.value)}   className='2xl:p-7 w-11/12 p-3 text-xl placeholder:text-xl 2xl:mt-8 2xl:placeholder:text-2xl 2xl:text-2xl focus:outline-blue-500' />
              <Input type="phone" placeholder="Mobile Phone Number" value = {phone} onChange = { (e) => handlesetPhone(e.target.value)} className='2xl:p-7 w-11/12 p-3 text-xl placeholder:text-xl 2xl:mt-8 2xl:placeholder:text-2xl 2xl:text-2xl focus:outline-blue-500' />
              <span className='2xl:text-3xl text-2xl font-semibold mt-8'>Delivery</span>
              <div className='flex max-[900px]:flex-col max-[900px]:gap-4 gap-8 mt-8'>
                <Input type="name" placeholder="First Name" value = {fname} onChange = { (e) => setFname(e.target.value)}                className='2xl:p-10 w-11/12 p-3 text-xl placeholder:text-xl 2xl:placeholder:text-2xl 2xl:text-3xl focus:outline-blue-500' />
                <Input type="name" placeholder="Last Name" value = {lname} onChange = { (e) => setLname(e.target.value)}                 className='2xl:p-10 w-11/12 p-3 text-xl placeholder:text-xl 2xl:placeholder:text-2xl 2xl:text-3xl focus:outline-blue-500' />
              </div>
              <Input type="address" placeholder="Address" value = {address} onChange = { (e) => setAddress(e.target.value)}              className='2xl:p-10 w-11/12 p-3 text-xl placeholder:text-xl 2xl:placeholder:text-2xl 2xl:text-3xl focus:outline-blue-500' />
              <div className='flex max-[900px]:flex-col max-[900px]:gap-4 gap-8'>
                <Input type="city" placeholder="City" value = {city} onChange = { (e) => setCity(e.target.value)}                        className='2xl:p-10 w-11/12 p-3 text-xl placeholder:text-xl 2xl:placeholder:text-2xl 2xl:text-3xl focus:outline-blue-500' />
                <Input type="postalcode" placeholder="Postal Code" value = {postcode} onChange = { (e) => handlesetPost(e.target.value)} className='2xl:p-10 w-11/12 p-3 text-xl placeholder:text-xl 2xl:placeholder:text-2xl 2xl:text-3xl focus:outline-blue-500' />
              </div>
              <span className='2xl:text-3xl font-semibold mt-8 text-2xl'>Billing Address</span>
              <div onClick={()=>setDiffAddress(false)} className='cursor-pointer max-[900px]:w-11/12  flex justify-between bg-blue-200 p-6 2xl:text-2xl text-xl rounded-md'>
                <span> Same as Shipping Address </span>
                {diffaddress === false ?  <GrRadialSelected /> : '' }
              </div>
              <div onClick={()=>setDiffAddress(true)} className='cursor-pointer flex max-[900px]:w-11/12  justify-between bg-blue-200 p-6 2xl:text-2xl text-xl rounded-md'>
                <span> Use a different Billing Address </span>
                {diffaddress === true ?  <GrRadialSelected /> : '' }
              </div>
              {diffaddress &&
                  <Input type="address" placeholder="Billing Address" value = {billaddress} onChange = { (e) => setbillAddress(e.target.value)}              className='2xl:p-10 w-11/12 p-3 text-xl placeholder:text-xl 2xl:placeholder:text-2xl 2xl:text-3xl focus:outline-blue-500' /> 
              }
              <span className='2xl:text-3xl font-semibold mt-8 text-2xl'>Shipping Method</span>
              <div className='flex justify-between bg-blue-200 p-6 2xl:text-2xl text-xl max-[900px]:w-11/12 rounded-md'>
                <span>Standard </span>
                <span> Rs. 299 </span>
              </div>
              <span className='2xl:text-3xl font-semibold mt-8 text-2xl'> Payment </span>
              <div onClick={()=>setPaymentMethod('COD')} className='cursor-pointer max-[900px]:w-11/12  flex justify-between bg-blue-200 p-6 2xl:text-2xl text-xl rounded-md'>
                <span> Cash on Delivery </span>
                {paymentmethod === 'COD' ?  <GrRadialSelected /> : '' }
              </div>
              <div onClick={()=>setPaymentMethod('OT')} className='cursor-pointer flex max-[900px]:w-11/12  justify-between bg-blue-200 p-6 2xl:text-2xl text-xl rounded-md'>
                <span> Online Transfer </span>
                {paymentmethod === 'OT' ?  <GrRadialSelected /> : '' }
              </div>
              {paymentmethod === 'OT' && 
                <div className='flex flex-col mt-8 items-left text-2xl max-[900px]:text-xl'>
                   <span className='text-center text-3xl max-[900px]:text-2xl mb-6'> Transfer Details </span>
                   <span className='text-wrap w-9/12'> Account Holder: Ansa Iqbal </span>
                   <span className='text-wrap w-9/12'> Bank Name: Meezan Bank </span>
                   <span className='text-wrap w-9/12'> Branch Name: New Anarkali Bazaar Branch Lahore </span>
                   <span className='text-wrap w-9/12'> Account Number: <span className="font-semibold"> 02720107745960 </span> </span>
                   <span className='text-wrap w-9/12'> IBAN: <span className="font-semibold"> PK15MEZN0002720107745960 </span> </span>
                   <span className='text-wrap w-9/12'> Whatsapp screenshot to this number: <span className="font-semibold">  0320-8585354 </span></span>
                </div>
              }
              <span onClick={handleCheckOut} className=' max-[1400px]:hidden mt-8 cursor-pointer hover:scale-105 flex justify-center bg-blue-600 p-10 text-4xl text-white text-center rounded-lg'>
                Complete Order
              </span>     
            </div>
          </div>
          <div className='w-6/12 bg-slate-200  max-[1400px]:w-full'>
            {cart.map((prod,idx) => (
              <div key={idx} className='flex max-[1000px]:flex-col ml-16 mt-16 max-[1500px]:ml-6'> 
              <div className=' max-[1000px]:m-auto' >
                  <Badge badgeContent={prod.qty} max={10} color="secondary">
                    <figure className="shrink-0 w-[200px]">
                      <div className="overflow-hidden rounded-md">
                        <img
                          src={prod.images[0].imagestring[0] === 'f' ? `images/${prod.images[0].imagestring}` : prod.images[0].imagestring}
                          alt={`${prod.title}`}
                          className="aspect-[4/4] object-cover"
                          />
                      </div>
                    </figure>
                  </Badge>
              </div>
                  <div className='flex  max-[1000px]:flex-col max-[1000px]:mt-5 items-center'>
                    <span className='2xl:text-3xl text-2xl mx-auto min-[1000px]:ml-52'>{prod.title}</span>
                    <span className='min-[1000px]:ml-52 2xl:text-2xl max-[1000px]:mt-5 text-xl'>Rs. {prod.price.toLocaleString()}</span>
                  </div>         
              </div>
            ))}
            <div className='flex my-16 ml-16 flex-col w-10/12 max-[1000px]:ml-8 gap-4'>
                <div className='flex justify-between'>
                    <span className='2xl:text-3xl text-xl'> Subtotal </span>
                    <span className='2xl:text-3xl text-xl font-semibold'> Rs. {(tp-299).toLocaleString()} </span>
                </div>
                <div className='flex justify-between'>
                    <span className='2xl:text-3xl text-xl '> Shipping Total </span>
                    <span className='2xl:text-3xl text-xl font-semibold'> Rs. 299 </span>
                </div>
                <div className='flex justify-between'>
                    <span className='2xl:text-4xl text-2xl font-semibold'> Total </span>
                    <span className='2xl:text-4xl text-2xl font-semibold'> Rs. {tp.toLocaleString()} </span>
                </div> 
            </div>
          </div>
          <span onClick={handleCheckOut} className='min-[1400px]:hidden my-8 w-9/12 mx-auto cursor-pointer hover:scale-105 flex justify-center bg-blue-600 2xl:p-10 p-4 2xl:text-4xl text-2xl text-white text-center rounded-lg'>
                Complete Order
           </span> 
      </div>
      <HappyMessage  msg={msg} setMsg={setMsg} openmsg={openmsg} setOpenmsg={setOpenmsg} />
      <ErrorMessage  error={error} setError={setError} openerr={openerr} setOpenerr={setOpenerr} />
    </div>
  )
}


export default Checkout