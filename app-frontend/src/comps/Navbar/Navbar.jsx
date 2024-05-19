import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../../store/userSlice';
import Quantity from "@/lib/Quantity";
import Skeleton from '@mui/material/Skeleton';
import  "./navbar.css";

import { Sheet, SheetClose, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { MdDelete } from "react-icons/md";
import Badge from '@mui/material/Badge';


// import youtube from '../../assets/youtube.png/'
// import facebook from '../../assets/fb.png'
// import insta from '../../assets/insta.jpeg'
// import tiktok from '../../assets/tiktok.png'

function Navbar({loading, navbarfootercolorscheme, search, setSearch, searchQuery, setSearchQuery, setSearchRes, cartopen, setCartOpen, handleCloseCart, cartbadge, setCartbadge}) {
  const maindiv = document.getElementById('maindiv');
  const colorScheme = navbarfootercolorscheme;
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = user.categories

  const [tp, setTp] = useState(0) //tp : totalPrice

  async function handleOpenSearch() {
    // console.log("open-search")
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
    // console.log('close-search')
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
    // console.log(cart)
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

  function capitalize(string) {  return string.charAt(0).toUpperCase() + string.slice(1); }

  return (

        <>
          {search ? (
            <div id="srchbr" className={`${colorScheme} headerbarr searchbar h-32`} >
              <input
                type="text"
                id="searchInput"
                placeholder="Search for products........"
                value = {searchQuery}
                onChange={(e)=>(setSearchQuery(e.target.value))}
                className={`${colorScheme} headerbarr  flex text-center w-11/12 h-full px-8 text-black text-2xl placeholder-black rounded-md focus:outline-none`}
              />
              <button id="closeButton" className={`headerbarr fixed right-16 top-16 right-1 top-12 focus:outline-none`} onClick={handleCloseSearch}>
                <CloseIcon className="headerbarr h-12 w-12 h-8 w-8 text-white" />
              </button>
            </div>
          ) : (
            loading ? 
             <div className="bg-slate-200 py-1 "> 
              <div className='flex flex-col mx-auto w-9/12 max-[1000px]:my-0 my-6 '>
                <div className='flex gap-2 w-12/12' >
                  <Skeleton animation="wave" height={40}  width="80%" style={{ marginBottom: 6 }} />
                  <Skeleton animation="wave" height={40}  width="80%" style={{ marginBottom: 6 }} />
                  <Skeleton animation="wave" height={40}  width="80%" style={{ marginBottom: 6 }} />
                </div>
                <Skeleton sx={{ height:60 }} className='w-12/12 rounded-xl my-4' animation="wave" variant="rectangular" />
                <Skeleton animation="wave" className='w-12/12 ' height={40} />
            </div>
             </div>
            :
            <header id="hdr" className={`${colorScheme}  shadow-sm dark:bg-gray-950 dark:text-gray-50 overflow-auto`} >
              <div className="flex h-24 mx-0 items-center justify-between px-4 max-[900px]:gap-1 md:px-6 w-full">
              <Sheet>
                <SheetTrigger asChild className='min-[900px]:hidden'>
                      <button className=" rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                        <MenuIcon className="h-7 w-7"/>
                        <span className="sr-only">Toggle navigation</span>
                    </button>
                  </SheetTrigger> 
                 
                  <SheetContent side='left' className='bg-red-100 unset-max-width w-full'>
                  <ScrollArea className={`border h-screen rounded-md`}> 
                    <div className="flex flex-col px-4 md:px-8 py-8">
                    <SheetClose asChild> 
                      <span className="py-12 px-8 text-5xl cursor-pointer hover:bg-red-200 rounded-full max-[900px]:text-xl max-[900px]:px-4 max-[900px]:py-8" onClick={()=>navigate('/',{replace:true})}> Home</span>
                    </SheetClose>
                    {categories.map((c,idx)=>(
                    <SheetClose asChild key={idx}> 
                      <span className="py-12 px-8  text-5xl cursor-pointer hover:bg-red-200 rounded-full max-[900px]:text-xl max-[900px]:px-4 max-[900px]:py-8" onClick={()=>navigate(`/category/${c}`,{replace:true})}> {c==='all' ? 'Shop' : capitalize(c)}</span>
                    </SheetClose>
                    ))}
                    {/* <SheetClose asChild> 
                      <span className="py-12 px-8  text-5xl cursor-pointer hover:bg-red-200 rounded-full max-[900px]:text-xl max-[900px]:px-4 max-[900px]:py-8" onClick={()=>navigate('/category/earrings',{replace:true})} > Earrings</span>
                    </SheetClose>
                    <SheetClose asChild> 
                      <span className="py-12 px-8  text-5xl cursor-pointer hover:bg-red-200 rounded-full max-[900px]:text-xl max-[900px]:px-4 max-[900px]:py-8" onClick={()=>navigate('/category/rings',{replace:true})} > Rings</span>
                    </SheetClose>
                    <SheetClose asChild> 
                      <span className="py-12 px-8  text-5xl cursor-pointer hover:bg-red-200 rounded-full max-[900px]:text-xl max-[900px]:px-4 max-[900px]:py-8" onClick={()=>navigate('/category/necklace',{replace:true})}> Necklace</span>
                    </SheetClose>
                    <SheetClose asChild> 
                      <span className="py-12 px-8  text-5xl cursor-pointer hover:bg-red-200 rounded-full max-[900px]:text-xl max-[900px]:px-4 max-[900px]:py-8" onClick={()=>navigate('/category/bracelet',{replace:true})} > Bracelet</span>
                    </SheetClose>
                    <SheetClose asChild> 
                      <span className="py-12 px-8  text-5xl cursor-pointer hover:bg-red-200 rounded-full max-[900px]:text-xl max-[900px]:px-4 max-[900px]:py-8" onClick={()=>navigate('/category/beauty',{replace:true})} > Beauty</span>
                    </SheetClose>
                    <SheetClose asChild> 
                      <span className="py-12 px-8  text-5xl cursor-pointer hover:bg-red-200 rounded-full max-[900px]:text-xl max-[900px]:px-4 max-[900px]:py-8" onClick={()=>navigate('/category/sale',{replace:true})}> Sale </span>
                    </SheetClose> */}
                     </div>
                     {/* <Separator className='bg-red-400/30' /> */}
                    <div className="my-4 mx-16 rounded-lg w-full flex items-center ">
                    </div>
                    <ScrollBar orientation="vertical" />
                  </ScrollArea>
                  </SheetContent> 
                </Sheet> 
                { window.location.pathname === '/' &&  
                        <button className="searchbarr rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 max-[899px]:hidden"  onClick={handleOpenSearch}>
                            <SearchIcon className="h-7 w-7 searchbarr" />
                            <span className="sr-only">Open search</span>
                        </button> 
                }
                <div className="xl:text-3xl cursor-pointer text-xl max-[900px]:text-nowrap" onClick={()=>navigate('/',{replace:true})}>Bling  💎 Boutique</div>
                <div className="flex items-center gap-2">
                  { window.location.pathname === '/' &&  
                      <button className="searchbarr rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 min-[899px]:hidden"  onClick={handleOpenSearch}>
                        <SearchIcon className="h-7 w-7" />
                        <span className="sr-only">Open search</span>
                      </button> 
                    }
                    <Sheet>
                      <SheetTrigger asChild>
                        <button className="rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800" onClick={handleOpenCart}>
                              <Badge badgeContent={cartbadge} max={10} color="primary">
                                <ShoppingCartIcon className="h-7 w-7" />
                                <span className="sr-only">Open cart</span>
                              </Badge>
                        </button>
                      </SheetTrigger>
                      <SheetContent className='bg-red-100 unset-max-width w-[900px] max-[900px]:w-full'>
                          <ScrollArea className={`border h-screen rounded-md`}>
                            <div className="flex justify-between items-center py-1 2xl:py-6">
                              <span className="text-4xl px-2 max-[1000px]:text-2xl"> {cart.length === 0 ? '' : 'Your Cart'}</span>
                            </div>
                            { cart.length === 0 ? (
                              <div className="flex justify-center h-screen px-16 max-[500px]:px-2">
                                <div className="mt-64">
                                  <span className="text-3xl text-nowrap mx-auto ">Your cart is empty </span>
                                  <SheetClose asChild>
                                    <button id="continueshoppingButton" className="flex justify-center p-10 max-[500px]:p-4 mt-16 rounded-lg bg-black focus:outline-none" onClick={handleCloseCart}>
                                      <span className='text-white text-3xl '> Continue Shopping </span>
                                    </button>
                                  </SheetClose>
                                </div>
                              </div>
                            ) : 
                              <div className='h-screen'>
                                <div className="flex justify-between items-center py-3 2xl:py-6 px-2">
                                    <span className="text-xl pl-0">PRODUCT</span>
                                    <span className="text-xl pr-60 xl:pr-32 max-[885px]:hidden">TOTAL</span>
                                </div>
                                <Separator className='bg-red-400/30' />
                                <div className="flex flex-col space-y-4 p-8">
                                  {cart.map((prod,idx) => (
                                    <div key={idx} className='flex max-[750px]:flex-col'>
                                      <figure className="shrink-0 w-[250px] max-[750px]:w-[150px]">
                                        <div className="overflow-hidden rounded-md">
                                          <img
                                            src={prod.images[0].imagestring[0] === 'f' ? `images/${prod.images[0].imagestring}` : prod.images[0].imagestring}
                                            alt={`${prod.title}`}
                                            className="aspect-[3/4] max-[1300px]:h-[200px] object-cover"
                                          />
                                        </div>
                                        <figcaption className="pt-2 text-2xl text-muted-foreground text-wrap">
                                          {" "}
                                          <span className="font-semibold text-foreground">
                                            {prod.title}
                                          </span>
                                        </figcaption>
                                      </figure>
                                      <div className="flex max-[600px]:flex-col">
                                        <div className='flex flex-col px-8 py-4 max-[750px]:pl-0 '>
                                          <span className='text-2xl text-wrap max-[900px]:hidden'> {prod.title} </span>
                                          <span className='text-2xl mt-4 text-gray-600 text-wrap'> Rs. {(prod.price).toLocaleString()}</span>
                                          <Quantity tp={tp} setTp={setTp} qtys={qtys} setQtys={setQtys} idx={idx}/>   
                                        </div>
                                        <div className='flex flex-col py-1 2xl:py-4'>
                                          <span className='text-2xl text-nowrap '> 
                                            <span className="min-[885px]:hidden"> Total: </span>
                                            <span className="font-semibold"> Rs. {(qtys[idx]*prod.price).toLocaleString()} </span> 
                                          </span>
                                          <button className={`focus:outline-none py-24 px-8 max-[600px]:py-8 max-[600px]:px-2 `} onClick={(e)=>handleDelete(e,idx)}><MdDelete className='text-4xl' /></button>                 
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <Separator className='bg-red-400/30' />
                                <div className='flex flex-col p-8'>
                                    <div className='px-4 flex justify-between items-center max-[500px]:flex-col max-[500px]:gap-2'>
                                      <span className='text-2xl font-semibold 2xl:text-4xl'> Estimated total</span>
                                      <span className='2xl:text-4xl text-2xl max-[600px]:text-nowrap'> Rs. {tp.toLocaleString()} PKR</span>
                                    </div>
                                    <span className='text-wrap text-2xl p-4 text-left xl:text-xl' > Taxes, discounts and shipping calculated at checkout</span>
                                    <button id="checkoutbtn" className="flex justify-center py-8 max-[600px]:mb-20 max-[600px]:p-4 px-6 mt-8 rounded-lg bg-black focus:outline-none" onClick={(e)=>handleCheckOut(e)}>
                                      <span className='text-white text-3xl max-[600px]:text-xl'> Check Out </span>
                                    </button>
                                </div>
                              </div>
                            }
                          <ScrollBar orientation="vertical" />
                        </ScrollArea>
                      </SheetContent>
                    </Sheet>
                </div>
              </div>
              <div className="flex text-center justify-center items-center px-4 md:px-6 py-2 max-[899px]:hidden">
                <span className="mr-4 pb-2 text-xl 2xl:text-2xl cursor-pointer" onClick={()=>navigate('/',{replace:true})}> Home</span>     
                {categories.map((c,idx)=>(
                  <span key={idx} className="mr-4 pb-2 text-xl 2xl:text-2xl cursor-pointer" onClick={()=>navigate(`/category/${c}`,{replace:true})}> {c==='all' ? 'Shop' : capitalize(c)} </span>
                  ))}
                  {/* <span className="mr-4 pb-2 text-xl 2xl:text-2xl cursor-pointer" onClick={()=>navigate('/category/earrings',{replace:true})} > Earrings</span>
                  <span className="mr-4 pb-2 text-xl 2xl:text-2xl cursor-pointer" onClick={()=>navigate('/category/rings',{replace:true})} > Rings</span>
                  <span className="mr-4 pb-2 text-xl 2xl:text-2xl cursor-pointer" onClick={()=>navigate('/category/necklace',{replace:true})}> Necklace</span>
                  <span className="mr-4 pb-2 text-xl 2xl:text-2xl cursor-pointer" onClick={()=>navigate('/category/bracelet',{replace:true})} > Bracelet</span>
                  <span className="mr-4 pb-2 text-xl 2xl:text-2xl cursor-pointer" onClick={()=>navigate('/category/beauty',{replace:true})} > Beauty</span>
                  <span className="mr-4 pb-2 text-xl 2xl:text-2xl cursor-pointer" onClick={()=>navigate('/category/sale',{replace:true})}> Sale</span> */}
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