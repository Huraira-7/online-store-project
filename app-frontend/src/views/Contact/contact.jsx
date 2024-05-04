import {useEffect, useState} from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Navbar from '../../comps/Navbar/Navbar'
import Footer from '../../comps/Footer/Footer';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Replace } from 'lucide-react';
// import {  } from '../../api/internal';
// import { useSelector } from 'react-redux';

function Contact() {
  const navbarfootercolorscheme = 'bg-rose-400';
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const navigate = useNavigate();

  async function handlesubmitForm (e) {
    e.preventDefault();
    // console.log(name,comment,email,phone)
    if(name==='' || comment===''){
      // setError('Name and message must be submitted in order to process the form')
      return;
    }
    if(email !== '' || phone !== 0 ){
      //send email to her relaying the complaint
      navigate('/',{replace:true})
    } else {
      // setError('Either your email address or your phone number should be submitted in order to process the form')
      return; 
    }
  }

  function handlesetPhone (e){
    const value = e.target.value;
    if (!isNaN(parseInt(value))) {
      if(parseInt(value)<0){
        // setError("Phone number must be > 0");
      } else {
        setPhone(parseInt(value));
      }
    } else {
      // setError("Phone number must be an integer");
    }   
  }
  


  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 overflow-auto'>
      <Navbar colorScheme={navbarfootercolorscheme} />
      <div className='flex flex-col items-center'>
      <h3 id="contacthdr" className='text-6xl pt-8 mr-16'> Contact Us </h3>
      <form onSubmit={handlesubmitForm} id="contactform" className='text-left mt-8 rounded-md p-8'>
          <div className='space-y-4 text-3xl'>
              <Input type="name" placeholder="Name" value = {name} onChange = { (e) => setName(e.target.value)}  className='w-[700px] text-3xl p-10'/>
              <Input type="email" placeholder="Email" value = {email} onChange = { (e) => setEmail(e.target.value)}  className='w-[700px] text-3xl p-10'/>
              <Input type="phone" placeholder="Phone" value = {phone} onChange = { (e) => handlesetPhone(e.target.value)} className='w-[700px] text-3xl p-10' />
              <Textarea placeholder="Type your message here." value = {comment} onChange = { (e) => setComment(e.target.value)} className='w-[700px] text-3xl p-10 h-64' />
          </div>
      </form>
      <Button type="submit" className='mb-8 mr-16 text-3xl p-10 rounded-full' onClick={handlesubmitForm}>  Submit </Button> 
      </div>
      <Footer colorScheme={navbarfootercolorscheme}/>
    </div>
  )
}

export default Contact;