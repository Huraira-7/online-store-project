import {useEffect, useState} from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button';
import {  useNavigate } from 'react-router-dom';
import { sendformsubmissionemail } from '@/api/internal';
import { useSelector } from 'react-redux';
import ErrorMessage from '@/lib/ErrorMessage';
import Loading from '@/lib/Loading';


function Contact({loading,setLoading}) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState('');

  // const [done,setDone] = useState()
  const navigate = useNavigate();
  const down = useSelector((state) => state.user.down); 


  useEffect(() => {
    function checkifValid(){
      if(down === true ) { 
        // console.log("down")
        navigate('/downtime',{replace:true}) 
        return
      }
      const maindiv = document.getElementById('maindiv');
      maindiv.scrollTo({top: 0, behavior: 'smooth', })
      setLoading(false)
    }
    checkifValid()
  }, [])

  async function handlesubmitForm (e) {
    e.preventDefault();
    if(name==='' || comment===''){
      handleOpenerr('Name and message is required in order to submit');
      return;
    }

    if(phone === '' && email === ''){
      handleOpenerr('Either email or phone number is required in order to submit');
      return;
    }

    if(email !== ''){
      const emailInput = document.getElementById('contactusemail');
      // console.log(emailInput.validity.valid)
      if (emailInput.validity.valid) {
        // console.log("valid email")
        const message = `Customer Name: ${name} \n Customer Email: ${email} \n Customer's Message: ${comment} \n`
        const body = {message}
        const resp = await sendformsubmissionemail(body);
        setComment('')
        setName('')
        setEmail('')
        setPhone('')
        if(resp.status === 200 ){  navigate('/',{replace:true})   }
        return;
      } else {
        handleOpenerr('Badly formatted email address');
        // console.log("invalid email")
        return;
      }
    } 

    if(phone[0] >= 0 && String(phone).length === 11 && /^\d+$/.test(phone) == true){
      // console.log('valid phone num')
      const message = `Customer Name: ${name} \n Customer Phone: ${phone} \n Customer's Message: ${comment} \n`
      const body = {message}
      const resp = await sendformsubmissionemail(body);
      if(resp.status === 200 ){  navigate('/',{replace:true})   }
      return;
    } else {
      handleOpenerr('A phone number  >= 0 and of 11 digits should be submitted in order to process the form');
      return;
    }

  }

  function handlesetPhone (value){
    if (!isNaN(parseInt(value))) {
      if(parseInt(value)>=0) {
        setPhone(value);
      }
    }  
  }

  const [error, setError] = useState('')
  const [openerr, setOpenerr] = useState(false);
  const handleOpenerr = (txt) => { 
    setError(txt)
    setOpenerr(true); 
  };


  return (
    loading ? <Loading/> :
    <div className='mt-16 overflow-auto'>
      <div className='flex flex-col items-center'>
      <h3 id="contacthdr" className='text-6xl pt-8 mr-16 max-[800px]:text-5xl'> Contact Us </h3>
      <form onSubmit={handlesubmitForm} id="contactform" className='text-left mt-8 rounded-md p-8'>
          <div className='space-y-4 text-3xl'>
              <Input type="name" placeholder="Name" value = {name} onChange = { (e) => setName(e.target.value)}  className='w-[700px] max-[800px]:w-11/12 max-[800px]:m-auto  text-3xl p-10 max-[900px]:text-xl max-[900px]:p-4'/>
              <Input type="email" id="contactusemail" placeholder="Email" value = {email} onChange = { (e) => setEmail(e.target.value)}  className='w-[700px]  max-[800px]:w-11/12 max-[800px]:m-auto  max-[900px]:p-4 max-[900px]:text-xl text-3xl p-10'/>
              <Input type="phone" placeholder="Phone" value = {phone} onChange = { (e) => handlesetPhone(e.target.value)} className='w-[700px]  max-[800px]:w-11/12 max-[800px]:m-auto  text-3xl  max-[900px]:p-4 max-[900px]:text-xl p-10' />
              <Textarea placeholder="Type your message here." value = {comment} onChange = { (e) => setComment(e.target.value)} className='w-[700px]  max-[800px]:w-11/12 max-[800px]:m-auto  text-3xl   max-[900px]:p-4  max-[900px]:text-xl p-10 h-64' />
          </div>
      </form>
      <Button type="submit" className='mb-8 mr-16 text-3xl p-10 rounded-full' onClick={handlesubmitForm}>  Submit </Button> 
      <ErrorMessage  error={error} setError={setError} openerr={openerr} setOpenerr={setOpenerr} />
      </div>
    </div>
  )
}

export default Contact;