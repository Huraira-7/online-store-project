import {useState,useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { otp } from '@/api/internal'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet';
// import Profile from '../Profile/profile'

function Confirmation() {

 const [num, setNum] = useState('')
 const [val, setVal] = useState('')
 const [show, setShow] = useState(false)
 const [innertxt, setInnertxt] = useState('Enter to get OTP')
 const [secondsRemaining, setSecondsRemaining] = useState(120);
 const navigate = useNavigate();

 useEffect(() => {
    let timerId;
    if(val!==''){
        // console.log('setting time')
        timerId = setInterval(() => {
          setSecondsRemaining((prevCount) => Math.max(0, prevCount - 1)); // Decrement timer
        }, 1000);
    }

    return function cleanup() {
        if(secondsRemaining === 0){
            // console.log("clean-up-fired")
            clearInterval(timerId);
            if(show) {return;}
            if(num && val && num.toString() === val.toString()){
                setShow(true)
                navigate('/profile',{state:{valid:true}})
                return;
            } else {
                setInnertxt('Enter to get OTP')
                setSecondsRemaining(120)
                setNum('')
                setVal('')
            }
        }
    }

  }, [val]); 


 async function getsetOTP(){
    // console.log(num,val)
    if(innertxt === 'Enter to get OTP') {
        setInnertxt('Enter OTP')
        const response = await otp();
        console.log(response)
        setVal(response.data.number)
    } else {
        if(num.toString() === val.toString()){
            setShow(true)
            navigate('/profile',{state:{valid:true}})
            return;
        } else {
            setInnertxt('Enter to get OTP')
            setSecondsRemaining(120)
            setNum('')
            setVal('')
        }
    }
 }
  return (
    <>
        {      
            <div className='flex flex-col gap-1 items-center justify-center mt-20 '>
                <Helmet>
                    <meta name='robots' content='noindex'/>
                </Helmet>
                <span className='text-3xl'> An 6 digit OTP will be sent to your email when you click at this button, enter it within 2 minutes to see your profile </span>
                <div className='flex'>
                    <Input type="text" className='text-3xl' value={num} onChange={(e)=>setNum(e.target.value)}></Input>
                    <Button onClick={getsetOTP} className='text-3xl' > {innertxt} </Button>
                </div>
                <span className='text-3xl'>Time left: <span className='text-red-400'> {secondsRemaining}  </span></span>
            </div>
        }
    </>
  )
}

export default Confirmation