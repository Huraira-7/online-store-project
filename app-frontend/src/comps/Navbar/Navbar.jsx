import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../../store/userSlice';

import { Sheet, SheetClose, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Badge from '@mui/material/Badge';

import { MdDelete } from "react-icons/md";

import  "./navbar.css";
import youtube from '../../assets/youtube.png'
import facebook from '../../assets/fb.png'
import insta from '../../assets/insta.jpeg'
import tiktok from '../../assets/tiktok.png'
import Quantity from "@/lib/Quantity";

function Navbar({navbarfootercolorscheme, search, setSearch, searchQuery, setSearchQuery, setSearchRes, cartopen, setCartOpen, handleCloseCart, cartbadge, setCartbadge}) {
  const maindiv = document.getElementById('maindiv');
  const colorScheme = navbarfootercolorscheme;
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [tp, setTp] = useState(0) //tp : totalPrice

  async function handleOpenSearch() {
    console.log("open-search")
    if(maindiv.scrollTop !== 0){
      maindiv.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
    setSearch(true);
  }

  function handleCloseSearch(){
    console.log('close-search')
    setSearch(false);
    setSearchQuery('')
    setSearchRes([])
  }

  function updateTotalPriceAndQuantities() {
    if (cart && cart.length>0) {
      let total = 0
      let quantities = []
      for(var i in cart){
        let p = cart[i]
        total += (p.price * p.qty)
        quantities.push(p.qty)
      }
      setTp(total)
      setQtys(quantities)
    }
  }
  function handleOpenCart(){
    console.log(cart)
    setCartOpen(true)
    updateTotalPriceAndQuantities();
    // const sidebardiv = document.getElementById('sidebardiv')
    // sidebardiv.classList.remove('hidden')
    // sidebardiv.classList.add('z-40')
    // sidebardiv.classList.add('transit')
  }

  const cart = user.cart
  const [qtys,setQtys] = useState([])


  function handleDelete(e,index){
    e.preventDefault()
    let prod = cart[index]
    setTp((oldprice) => oldprice - (prod.price*prod.qty))
    dispatch(removeItem(prod))
    setCartbadge((prevbadge)=>prevbadge-1)
  }

  function handleCheckOut(e){
    e.preventDefault()
    handleCloseCart()
    navigate('/checkout',{replace:true})
  }

  return (

        <>
          {search ? (
            <div id="srchbr" className={`${colorScheme} headerbarr searchbar h-52`} >
              <input
                type="text"
                id="searchInput"
                placeholder="Search for products........"
                value = {searchQuery}
                onChange={(e)=>(setSearchQuery(e.target.value))}
                className={`${colorScheme} headerbarr  flex text-center w-11/12 h-full px-8 text-black text-4xl placeholder-black rounded-md focus:outline-none`}
              />
              <button id="closeButton" className={` headerbarr  fixed right-16 top-16 focus:outline-none`} onClick={handleCloseSearch}>
                <CloseIcon className="headerbarr h-12 w-12 text-white" />
              </button>
            </div>
          ) : (
            <header id="hdr" className={`${colorScheme}  shadow-sm dark:bg-gray-950 dark:text-gray-50 h-90 overflow-auto`} >
              <div className="flex h-52 mx-0 items-center justify-between px-4 md:px-6 w-full">
              <Sheet>
                  <SheetTrigger asChild>
                      <button className=" rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                        <MenuIcon className="h-11 w-11"/>
                        <span className="sr-only">Toggle navigation</span>
                    </button>
                  </SheetTrigger>
                  <SheetContent side='left' className='bg-red-100 unset-max-width w-[900px]'>
                  <ScrollArea className={`border h-screen rounded-md`}> 
                    <div className="flex flex-col px-4 md:px-8 py-8">
                    <SheetClose asChild> 
                      <span className="py-12 px-8 text-5xl cursor-pointer hover:bg-red-200 rounded-full" onClick={()=>navigate('/',{replace:true})}> Home</span>
                    </SheetClose>
                    <SheetClose asChild> 
                      <span className="py-12 px-8  text-5xl cursor-pointer hover:bg-red-200 rounded-full" onClick={()=>navigate('/category/all',{replace:true})}> Shop</span>
                    </SheetClose>
                    <SheetClose asChild> 
                      <span className="py-12 px-8  text-5xl cursor-pointer hover:bg-red-200 rounded-full" onClick={()=>navigate('/category/earrings',{replace:true})} > Earrings</span>
                    </SheetClose>
                    <SheetClose asChild> 
                      <span className="py-12 px-8  text-5xl cursor-pointer hover:bg-red-200 rounded-full" onClick={()=>navigate('/category/rings',{replace:true})} > Rings</span>
                    </SheetClose>
                    <SheetClose asChild> 
                      <span className="py-12 px-8  text-5xl cursor-pointer hover:bg-red-200 rounded-full" onClick={()=>navigate('/category/necklace',{replace:true})}> Necklace</span>
                    </SheetClose>
                    <SheetClose asChild> 
                      <span className="py-12 px-8  text-5xl cursor-pointer hover:bg-red-200 rounded-full" onClick={()=>navigate('/category/bracelet',{replace:true})} > Bracelet</span>
                    </SheetClose>
                    <SheetClose asChild> 
                      <span className="py-12 px-8  text-5xl cursor-pointer hover:bg-red-200 rounded-full" onClick={()=>navigate('/category/beauty',{replace:true})} > Beauty</span>
                    </SheetClose>
                    <SheetClose asChild> 
                      <span className="py-12 px-8  text-5xl cursor-pointer hover:bg-red-200 rounded-full" onClick={()=>navigate('/sale',{replace:true})}> Sale </span>
                    </SheetClose>
                     </div>
                     <Separator className='bg-red-400/30' />
                    <div className="my-16 mx-16 rounded-lg w-max flex items-center gap-16">
                      <SheetClose asChild> 
                        <button className="px-8">
                          <img alt='tiktok' src={tiktok} className='h-14 w-14 rounded-full' />
                          <span className="sr-only">Tiktok</span>
                        </button>
                      </SheetClose>
                      <SheetClose asChild> 
                        <button className="px-8">
                          <img alt='facebook' src={facebook} className="h-14 w-14 rounded-full" />
                          <span className="sr-only">Facebook</span>
                        </button>
                      </SheetClose>
                      <SheetClose asChild> 
                        <button className="px-8">
                          <img alt='youtube' src={youtube} className="h-14 w-14 rounded-full" />
                          <span className="sr-only">Youtube</span>
                        </button>
                      </SheetClose>
                      <SheetClose asChild> 
                        <button className="px-8 ">
                          <img alt='insta' src={insta} className="h-14 w-14 rounded-full" />
                          <span className="sr-only">Instagram</span>
                        </button>
                      </SheetClose>
                    </div>
                    <ScrollBar orientation="vertical" />
                  </ScrollArea>
                  </SheetContent> 
                </Sheet>
                <div className="text-5xl cursor-pointer" onClick={()=>navigate('/',{replace:true})}>Bling  💎 Boutique</div>
                <div className="flex items-center gap-2">
                  <button className="searchbarr rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"  onClick={handleOpenSearch}>
                    <SearchIcon className="h-11 w-11 searchbarr" />
                    <span className="sr-only">Open search</span>
                  </button>
                    <Sheet>
                      <SheetTrigger asChild>
                        <button className="rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800" onClick={handleOpenCart}>
                              <Badge badgeContent={cartbadge} max={10} color="primary">
                                <ShoppingCartIcon className="h-11 w-11" />
                                <span className="sr-only">Open cart</span>
                              </Badge>
                        </button>
                      </SheetTrigger>
                      <SheetContent className='bg-red-100 unset-max-width w-[900px]'>
                          <ScrollArea className={`border h-screen rounded-md`}>
                            <div className="flex justify-between items-center py-6">
                              <span className="text-4xl px-2"> {cart.length === 0 ? '' : 'Your Cart'}</span>
                            </div>
                            { cart.length === 0 ? (
                              <div className="flex justify-center h-screen px-16">
                                <div className="mt-64">
                                  <span className="text-5xl">Your cart is empty </span>
                                  <SheetClose asChild>
                                    <button id="continueshoppingButton" className="flex justify-center p-10 mt-16 rounded-lg bg-black focus:outline-none" onClick={handleCloseCart}>
                                      <span className='text-white text-3xl'> Continue Shopping </span>
                                    </button>
                                  </SheetClose>
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
                                  {cart.map((prod,idx) => (
                                    <div key={idx} className='flex'>
                                      <figure className="shrink-0 w-[250px]">
                                        <div className="overflow-hidden rounded-md">
                                          <img
                                            src={`http://localhost:3000/images/${prod.images[0].imagestring}`}
                                            alt={`${prod.images[0].imagestring}`}
                                            className="aspect-[3/4] object-cover"
                                          />
                                        </div>
                                        <figcaption className="pt-2 text-3xl text-muted-foreground text-wrap">
                                          {" "}
                                          <span className="font-semibold text-foreground">
                                            {prod.title}
                                          </span>
                                        </figcaption>
                                      </figure>
                                      <div className='flex flex-col px-8 py-4'>
                                        <span className='text-2xl'> {prod.title} </span>
                                        <span className='text-2xl mt-4 text-gray-600'> Rs. {(prod.price).toLocaleString()}</span>
                                        <Quantity tp={tp} setTp={setTp} qtys={qtys} setQtys={setQtys} idx={idx}/>
                                        {/* <div className={`h-28 mt-4 w-[350px] flex`} >
                                          <button className={`focus:outline-none px-2 bg-white rounded-l-lg noscalebtn outline-none hover:outline-black outline-2`} onClick={(e)=>handleMinus(e,idx)}><FaMinus className='text-4xl' /></button>
                                            <input
                                              type="text"
                                              // id="cartInput"
                                              value = {qtys[idx]}
                                              onChange={(e)=>handlesetQty(e,idx)}
                                              className={`flex text-center w-7/12 h-full px-8 text-black text-4xl focus:outline-none`}
                                            />
                                            {console.log(qtys)}
                                            <button className={`focus:outline-none px-2 bg-white rounded-r-lg noscalebtn outline-none hover:outline-black outline-2 `} onClick={(e)=>handleAdd(e,idx)}><FaPlus className='text-4xl' /></button>
                                        </div> */}
                                      </div>
                                      <div className='flex flex-col py-4'>
                                        <span className='text-2xl font-semibold text-nowrap '> Rs. {(qtys[idx]*prod.price).toLocaleString()} </span>
                                        <button className={`focus:outline-none py-32 px-8 `} onClick={(e)=>handleDelete(e,idx)}><MdDelete className='text-4xl' /></button>                 
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <Separator className='bg-red-400/30' />
                                <div className='flex flex-col p-8'>
                                    <div className='px-4 flex justify-between items-center'>
                                      <span className='text-4xl font-semibold'> Estimated total</span>
                                      <span className='text-4xl'> Rs. {tp.toLocaleString()} PKR</span>
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
                          {/* <SheetFooter>
                            <SheetClose asChild className="bg-red-900">
                              <button type="submit">Save changes</button>
                            </SheetClose>
                          </SheetFooter> */}
                      </SheetContent>
                    </Sheet>
                  
                  
                </div>
              </div>
              <div className="flex text-center justify-center items-center px-4 md:px-6 py-2">
                  <span className="mr-4 pb-2 text-3xl cursor-pointer" onClick={()=>navigate('/',{replace:true})}> Home</span>
                  <span className="mr-4 pb-2 text-3xl cursor-pointer" onClick={()=>navigate('/category/all',{replace:true})}> Shop</span>
                  <span className="mr-4 pb-2 text-3xl cursor-pointer" onClick={()=>navigate('/category/earrings',{replace:true})} > Earrings</span>
                  <span className="mr-4 pb-2 text-3xl cursor-pointer" onClick={()=>navigate('/category/rings',{replace:true})} > Rings</span>
                  <span className="mr-4 pb-2 text-3xl cursor-pointer" onClick={()=>navigate('/category/necklace',{replace:true})}> Necklace</span>
                  <span className="mr-4 pb-2 text-3xl cursor-pointer" onClick={()=>navigate('/category/bracelet',{replace:true})} > Bracelet</span>
                  <span className="mr-4 pb-2 text-3xl cursor-pointer" onClick={()=>navigate('/category/beauty',{replace:true})} > Beauty</span>
                  <span className="mr-4 pb-2 text-3xl cursor-pointer" onClick={()=>navigate('/sale',{replace:true})}> Sale</span>
                </div>
            </header>
          )}
        </>   
  )
}


function CloseIcon(props){
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M4.6 4.6L11.4 11.4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.4 4.6L4.6 11.4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}


function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function ShoppingCartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}

export default Navbar;