// import youtube from '../../assets/youtube.png'
// import facebook from '../../assets/fb.png'
// import tiktok from '../../assets/tiktok.png'
import insta from '../../assets/insta.jpeg'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { addemail } from '@/api/internal'
import { useRef } from 'react'
import ErrorMessage from '@/lib/ErrorMessage';
import Skeleton from '@mui/material/Skeleton';
import HappyMessage from '@/lib/HappyMessage'

function Footer(props) {
  const navigate = useNavigate();
  const handleClk = useRef(null)
  const handleClk2 = useRef(null)
  const [email, setEmail] = useState('')
  const maindiv = document.getElementById('maindiv');
  

  async function adduserEmail() {
    if(email !== ''){
      const emailInput = document.getElementById('footer-email');
      // console.log(emailInput.validity.valid)
      if (emailInput.validity.valid) {
        // console.log("valid email")
        const body = {email}
        const resp = await addemail(body);
        // console.log(resp)
        setEmail('')
        if(resp.status === 200){
          handleOpenmsg('That email already exists - has been submitted once')
        } else {
          handleOpenmsg('Your email has been submitted successfully')
        }
      } else {
        handleOpenerr('Badly formatted email address')
        // console.log("invalid email")
      }
    } else {
      handleOpenerr('Please enter email address')
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

  const loading = props.loading;

  return (
    
      loading ?  <div className="bg-slate-200 py-1 bottom-0 left-0 right-0"> 
      <div className='text-4xl flex flex-col mx-auto w-9/12 max-[1000px]:my-0 my-10 '>
        <Skeleton animation="wave" className='w-full' height={40} />
        <Skeleton sx={{ height:60 }} className='w-full rounded-xl my-4' animation="wave" variant="rectangular" />
        <div className='flex gap-2 w-full' >
          <Skeleton animation="wave" height={40}  width="80%" style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={40}  width="80%" style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={40}  width="80%" style={{ marginBottom: 6 }} />
        </div>
    </div>
     </div> 
     :
        <footer className={`bottom-0 left-0 right-0 pt-2 overflow-auto ${props.navbarfootercolorscheme}`}>
        <div className="flex max-[1440px]:flex-col max-[1440px]:mb-8 mx-0 h-24 items-center justify-between px-4 md:px-6 w-full">
            <div className="py-5 px-96 text-2xl text-nowrap  cursor-pointer" onClick={()=>maindiv.scrollTo({top: 0, behavior: 'smooth', })}> Bling  💎 Boutique </div>
            <div className="flex items-center gap-2 flex-col ">
              <div className="py-0 px-6 hover:underline  " onClick={()=>navigate('/contact',{replace:true})}>
                <span className="text-lg text-slate-700">Contact us</span>
              </div>
              <div className="py-0 px-6 hover:underline "onClick={()=>navigate('/ordercancellation',{replace:true})}> 
                <span className="text-lg  text-slate-700">Order cancellation</span>
              </div>
              <div className="py-0 px-6 hover:underline  "onClick={()=>navigate('/termsandconditions',{replace:true})}>
                <span className="text-lg  text-slate-700">Terms & conditions</span>
              </div>
            </div>
        </div>
          <div className="flex text-xl pt-4 px-6 md:px-20 md:pt-12 justify-center mb-3 mt-20"> Subscribe to our emails for latest product arrivals</div>
          <div className="flex items-center justify-between rounded-md">
            <div className='flex '>
              <input type="email" id="footer-email" placeholder='Email'  value={email} onChange={(e)=>setEmail(e.target.value)} className="w-8/12 placeholder:text-lg text-lg  my-4 mx-4 p-2 md:mx-20 md:my-12 border border-gray-300 hover:border-gray-700  rounded-l-md border-transparent focus:outline-none focus:ring-blue-500 focus:ring-opacity-50"/>
              <button className="rounded-r-md relative right-12 min-[768px]:right-28  ">
                  <svg className="h-7 w-7 " viewBox="0 0 24 24" fill="none" onClick={adduserEmail}>
                    <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l7.03 7.03-7.03 7.03z" fill="currentColor" />
                  </svg>
              </button>
              {/* <button className='text-lg max-[750px]:hidden bg-red-400 p-2 rounded-full' onClick={adduserEmail}>Add </button> */}
            </div>
            <div className="pr-4 flex items-center">
              <a className="cursor-pointer px-4 max-[500px]:px-1" aria-label='instagram' href="https://www.instagram.com/bling_boutique___/"  target="_blank" rel="noopener"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClk.current = window.open(
                      "https://www.instagram.com/bling_boutique___/",
                      "_blank"
                    );
                  }}
              >
                <img alt='instagram' src={insta} className="h-24 w-24 mr-10 mb-6 max-[1500px]:h-11 max-[1500px]:w-11 rounded-full" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
            </div>
            <div className="row flex justify-center text-wrap">
              <div className="flex text-xl max-[700px]:text-sm py-4 px-4 md:px-20 md:pt-2 md:pb-2 max-[500px]:flex-col">
              <span className='flex'> © 2024, <span className='cursor-pointer px-2 ' onClick={()=>maindiv.scrollTo({top: 0, behavior: 'smooth', })}>   Bling Boutique   </span> </span>  
                  <span className='flex'> |  Design & Developed by 
                  <a className='hover:underline px-2' aria-label='linked-in' href=""  target="_blank" rel="noopener"
                      onClick={(e) => {
                        e.preventDefault();
                        handleClk2.current = window.open(
                          "https://www.linkedin.com/in/huraira-anwer-6b1238122?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
                          "_blank"
                        );
                      }}
                  > Huraira Anwer </a> 
                </span> 
              </div> 
            </div>
            <HappyMessage  msg={msg} setMsg={setMsg} openmsg={openmsg} setOpenmsg={setOpenmsg} />
            <ErrorMessage  error={error} setError={setError} openerr={openerr} setOpenerr={setOpenerr} />
        </footer>
    
  )
}

export default Footer