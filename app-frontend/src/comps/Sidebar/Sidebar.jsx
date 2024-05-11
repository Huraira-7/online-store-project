import { useState } from 'react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { works,halfworks } from '@/assets/randomdata';
import { FaPlus,FaMinus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet"

function Sidebar({cartopen, setCartOpen, handleCloseCart}) {
  const tags = Array.from({ length: 100 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  )
  
  const cart = ['something']
  const [qtys,setQtys] = useState([])


  function handleMinus(e){
    e.preventDefault()

  }
  function handleAdd(e){
    e.preventDefault()
  }

  function handleDelete(e){
    e.preventDefault()

  }
  function handleCheckOut(e){
    e.preventDefault()
    handleCloseCart()
  }

  return (
    <div id="sidebardiv" className='sidebardiv fixed hidden right-8 top-0 bg-red-100 w-[900px] h-fit'> 
    <ScrollArea className={`border h-screen rounded-md`}>
        <div className="flex justify-between items-center py-6">
              <span className="text-4xl px-2"> {cart.length === 0 ? '' : 'Your Cart'}</span>
              <button id="closecartButton" className="focus:outline-none" onClick={handleCloseCart}>
                <CloseIcon className="h-12 w-12 text-white" />
              </button>
        </div>
        { cart.length === 0 ? (
          <div className="flex justify-center h-screen px-16">
            <div className="mt-64">
              <span className="text-5xl">Your cart is empty </span>
              <button id="continueshoppingButton" className="flex justify-center p-10 mt-16 rounded-lg bg-black focus:outline-none" onClick={handleCloseCart}>
                <span className='text-white text-3xl'> Continue Shopping </span>
              </button>
            </div>
          </div>
        ) : 
          <div className='h-screen'>
            <div className="flex justify-between items-center py-6 px-2">
                <span className="text-2xl pl-8">PRODUCT</span>
                <span className="text-2xl pr-32">TOTAL</span>
            </div>
            <Separator className='bg-red-400/30' />
            <div className="flex flex-col space-y-16 p-8">
              {works.map((artwork,idx) => (
                <div key={idx} className='flex'>
                  <figure className="shrink-0 w-[200px]">
                    <div className="overflow-hidden rounded-md">
                      <img
                        src={artwork.art}
                        alt={`Photo by ${artwork.artist}`}
                        className="aspect-[3/4] object-cover"
                        width={200}
                        height={200}
                      />
                    </div>
                    <figcaption className="pt-2 text-xl text-muted-foreground text-wrap">
                      Photo by{" "}
                      <span className="font-semibold text-foreground">
                        {artwork.artist}
                      </span>
                    </figcaption>
                  </figure>
                  <div className='flex flex-col px-8 py-4'>
                    <span className='text-4xl'> {artwork.name} </span>
                    <span className='text-2xl mt-4 text-gray-600'> Rs. {artwork.price}</span>
                    <div className={`h-28 mt-4 w-[350px] flex`} >
                      <button className={`focus:outline-none px-2 bg-white rounded-l-lg `} onClick={(e)=>handleMinus(e)}><FaMinus className='text-4xl' /></button>
                        <input
                          type="text"
                          // id="cartInput"
                          value = {1}
                          onChange={(e)=>(setQtys(e.target.value))}
                          className={`flex text-center w-7/12 h-full px-8 text-black text-4xl focus:outline-none`}
                        />
                        <button className={`focus:outline-none px-2 bg-white rounded-r-lg `} onClick={(e)=>handleAdd(e)}><FaPlus className='text-4xl' /></button>
                     </div>
                  </div>
                  <div className='flex flex-col py-4'>
                    <span className='text-2xl font-semibold text-nowrap '> Rs. {artwork.price} </span>
                    <button className={`focus:outline-none py-32 px-8 `} onClick={(e)=>handleDelete(e)}><MdDelete className='text-4xl' /></button>                 
                  </div>
                </div>
              ))}
            </div>
            <Separator className='bg-red-400/30' />
            <div className='flex flex-col p-8'>
                <div className='px-4 flex justify-between items-center'>
                  <span className='text-4xl font-semibold'> Estimated total</span>
                  <span className='text-4xl'> Rs. 15,000 PKR</span>
                </div>
                <span className='text-wrap text-4xl p-4 text-left'> Taxes, discounts and shipping calculated at checkout</span>
                <button id="checkoutbtn" className="flex justify-center py-8 px-6 mt-8 rounded-lg bg-black focus:outline-none" onClick={(e)=>handleCheckOut(e)}>
                  <span className='text-white text-3xl'> Check Out </span>
                </button>
            </div>
          </div>
        }
      <ScrollBar orientation="vertical" />
    </ScrollArea>
    </div>
  )
}

export default Sidebar


function CloseIcon(props){
    return (
      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M4.6 4.6L11.4 11.4" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.4 4.6L4.6 11.4" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
}