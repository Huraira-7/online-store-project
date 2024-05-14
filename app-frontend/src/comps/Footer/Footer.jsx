import youtube from '../../assets/youtube.png'
import facebook from '../../assets/fb.png'
import insta from '../../assets/insta.jpeg'
import tiktok from '../../assets/tiktok.png'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { addemail } from '@/api/internal'
import ErrorMessage from '@/lib/ErrorMessage';

function Footer(props) {
  const navigate = useNavigate();
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
        console.log(resp)
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

  return (
    <footer className={`bottom-0 left-0 right-0 pt-2 overflow-auto ${props.navbarfootercolorscheme}`}>
    <div className="flex max-[1440px]:flex-col max-[1440px]:mb-8 h-36 mx-0 items-center justify-between px-4 md:px-6 w-full">
        <div className="py-10 px-96 text-5xl text-nowrap  cursor-pointer" onClick={()=>maindiv.scrollTo({top: 0, behavior: 'smooth', })}> Bling  💎 Boutique </div>
        <div className="flex items-center gap-8 max-[900px]:flex-col">
          <div className="py-3 px-6 hover:underline " onClick={()=>navigate('/contact',{replace:true})}>
            <span className="text-3xl">Contact us</span>
          </div>
          <div className="py-3 px-6 hover:underline "onClick={()=>navigate('/ordercancellation',{replace:true})}> 
            <span className="text-3xl">Order cancellation</span>
          </div>
          <div className="py-3 px-6 hover:underline "onClick={()=>navigate('/termsandconditions',{replace:true})}>
            <span className="text-3xl">Terms & conditions</span>
          </div>
        </div>
    </div>
      <div className="flex text-3xl pt-4 px-4 md:px-20 md:pt-12 max-[1080px]:justify-center max-[800px]:mb-10 max-[950px]:mt-32 max-[900px]:mt-64"> Subscribe to our emails </div>
      <div className="flex max-[1080px]:flex-col items-center justify-between rounded-md">
        <div>
          <input type="email" id="footer-email" placeholder='Email'  value={email} onChange={(e)=>setEmail(e.target.value)} style={{'width':'21rem'}} className="placeholder:text-2xl text-2xl my-4 mx-4 p-2 md:mx-20 md:my-12 border border-gray-300 hover:border-gray-700  rounded-l-md border-transparent focus:outline-none focus:ring-blue-500 focus:ring-opacity-50"/>
          <button className="rounded-r-md hover:bg-gray-200 relative right-28 max-[800px]:right-12">
              <svg className="h-7 w-7 " viewBox="0 0 24 24" fill="none" onClick={adduserEmail}>
                <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l7.03 7.03-7.03 7.03z" fill="currentColor" />
              </svg>
          </button>
        </div>
        <div className="pr-40 flex items-center gap-8 max-[800px]:gap-1 max-[800px]:pr-0 max-[800px]:my-8">
          <button className="px-4 max-[500px]:px-1">
            <img alt='tiktok' src={tiktok} className='h-12 w-12 max-[500px]:h-9 max-[500px]:w-9  rounded-full' />
            <span className="sr-only">Tiktok</span>
          </button>
          <button className="px-4 max-[500px]:px-1">
            <img alt='facebook' src={facebook} className="h-12 w-12 max-[500px]:h-9 max-[500px]:w-9 rounded-full" />
            <span className="sr-only">Youtube</span>
          </button>
          <button className="px-4 max-[500px]:px-1">
            <img alt='youtube' src={youtube} className="h-12 w-12 max-[500px]:h-9 max-[500px]:w-9 rounded-full" />
            <span className="sr-only">Facebook</span>
          </button>
          <button className="px-4  max-[500px]:px-1">
            <img alt='insta' src={insta} className="h-12 w-12 max-[500px]:h-9 max-[500px]:w-9 rounded-full" />
            <span className="sr-only">Instagram</span>
          </button>
        </div>
        </div>
        <div className="row flex justify-center text-wrap">
          <div className="flex text-2xl py-4 px-4 md:px-20 md:pt-12 md:pb-6 max-[900px]:flex-col">
           <span className='flex'> © 2024, <span className='cursor-pointer px-2 ' onClick={()=>maindiv.scrollTo({top: 0, behavior: 'smooth', })}>   Bling Boutique   </span> </span>  
            <span className='flex'> |  Design & Developed by <div className='hover:underline px-2'> Huraira Anwer </div> </span> 
          </div> 
        </div>
        <ErrorMessage  error={error} setError={setError} openerr={openerr} setOpenerr={setOpenerr} />
    </footer>
  )
}

export default Footer