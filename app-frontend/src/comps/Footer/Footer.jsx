import youtube from '../../assets/youtube.png'
import facebook from '../../assets/fb.png'
import insta from '../../assets/insta.jpeg'
import tiktok from '../../assets/tiktok.png'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Footer(props) {
  const navigate = useNavigate();
  return (
    <footer className={`bottom-0 left-0 right-0 pt-2 overflow-auto ${props.colorScheme}`}>
    <div className="flex h-36 mx-0 items-center justify-between px-4 md:px-6 w-full">
        <div className="py-10 px-96 text-5xl text-nowrap  cursor-pointer" onClick={()=>navigate('/',{replace:true})}> Bling  💎 Boutique </div>
        <div className="flex items-center gap-8">
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
      <div className="flex text-3xl pt-4 pb-2 px-4 md:px-20 md:pt-12"> Subscribe to our emails </div>
      <div className="flex items-center justify-between rounded-md">
        <input type="text" style={{'width':'21rem'}} className="my-4 mx-4 py-1 md:mx-20 md:my-12 border border-gray-300 hover:border-gray-700  rounded-l-md border-transparent focus:outline-none focus:ring-blue-500 focus:ring-opacity-50"/>
        <button className="rounded-r-md hover:bg-gray-200 absolute left-96">
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none">
            <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l7.03 7.03-7.03 7.03z" fill="currentColor" />
          </svg>
        </button>
        <div className="pr-40 flex items-center gap-8">
          <button className="px-4">
            <img alt='tiktok' src={tiktok} className='h-12 w-12 rounded-full' />
            <span className="sr-only">Tiktok</span>
          </button>
          <button className="px-4">
            <img alt='facebook' src={facebook} className="h-12 w-12 rounded-full" />
            <span className="sr-only">Youtube</span>
          </button>
          <button className="px-4">
            <img alt='youtube' src={youtube} className="h-12 w-12 rounded-full" />
            <span className="sr-only">Facebook</span>
          </button>
          <button className="px-4 ">
            <img alt='insta' src={insta} className="h-12 w-12 rounded-full" />
            <span className="sr-only">Instagram</span>
          </button>
        </div>
        </div>
        <div className="row flex justify-center">
          <div className="flex text-2xl py-4 px-4 md:px-20 md:pt-12 md:pb-6">
            © 2024, <span className='cursor-pointer px-2 '>   Bling Boutique   </span> | Design & Developed by <div className='hover:underline px-2'> Huraira Anwer </div>
          </div> 
        </div>
    </footer>
  )
}

export default Footer