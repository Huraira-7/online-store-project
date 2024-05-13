import {useEffect, useState} from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { sendformsubmissionemail } from '@/api/internal';
// import CircularProgress from '@mui/material/CircularProgress';
// import Backdrop from '@mui/material/Backdrop';
// import { IoMdReturnLeft } from 'react-icons/io';

function Contact() {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState('');

  // const [done,setDone] = useState()
  const navigate = useNavigate();

  async function handlesubmitForm (e) {
    e.preventDefault();
    if(name==='' || comment===''){
      // setError('Name and message must be submitted in order to process the form')
      return;
    }

    if(email !== ''){
      //send email relaying the complaint
      const emailInput = document.getElementById('contactusemail');
      // console.log(emailInput.validity.valid)
      if (emailInput.validity.valid) {
        console.log("valid email")
        const message = `Customer Name: ${name} \n Customer Email: ${email} \n Customer's Message: ${comment} \n`
        const body = {message}
        const resp = await sendformsubmissionemail(body);
        if(resp.status === 200 ){  navigate('/',{replace:true})   }
        return;
      } else {
        console.log("invalid email")
        return;
      }
    } 

    if(phone[0] >= 0 && String(phone).length === 11 && /^\d+$/.test(phone) == true){
      console.log('valid phone num')
      const message = `Customer Name: ${name} \n Customer Phone: ${phone} \n Customer's Message: ${comment} \n`
      const body = {message}
      const resp = await sendformsubmissionemail(body);
      if(resp.status === 200 ){  navigate('/',{replace:true})   }
      return;
    } else {
      // setError('A phone number  >= 0 and of 11 digits should be submitted in order to process the form')
      return;
    }

  }

  function handlesetPhone (value){
    if (!isNaN(parseInt(value))) {
      if(parseInt(value)<0){
        // setError("Phone number must be > 0");
      } else {
        setPhone(value);
      }
    } else {
      // setError("Phone number must be an integer");
    }   
  }



  return (
    <div className='mt-16 overflow-auto'>
      {/* <Navbar colorScheme={navbarfootercolorscheme} /> */}
      <div className='flex flex-col items-center'>
      <h3 id="contacthdr" className='text-6xl pt-8 mr-16'> Contact Us </h3>
      <form onSubmit={handlesubmitForm} id="contactform" className='text-left mt-8 rounded-md p-8'>
          <div className='space-y-4 text-3xl'>
              <Input type="name" placeholder="Name" value = {name} onChange = { (e) => setName(e.target.value)}  className='w-[700px] text-3xl p-10'/>
              <Input type="email" id="contactusemail" placeholder="Email" value = {email} onChange = { (e) => setEmail(e.target.value)}  className='w-[700px] text-3xl p-10'/>
              <Input type="phone" placeholder="Phone" value = {phone} onChange = { (e) => handlesetPhone(e.target.value)} className='w-[700px] text-3xl p-10' />
              <Textarea placeholder="Type your message here." value = {comment} onChange = { (e) => setComment(e.target.value)} className='w-[700px] text-3xl p-10 h-64' />
          </div>
      </form>
      <Button type="submit" className='mb-8 mr-16 text-3xl p-10 rounded-full' onClick={handlesubmitForm}>  Submit </Button> 
      </div>
      {/* <Footer colorScheme={navbarfootercolorscheme}/> */}
    </div>
  )
}

export default Contact;