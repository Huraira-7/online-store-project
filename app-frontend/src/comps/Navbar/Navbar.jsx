import { useState } from "react";
import  "./navbar.css";

function Navbar({colorScheme, search, setSearch, searchQuery, setSearchQuery, setSearchRes, cartopen, setCartOpen}) {

  async function handleOpenSearch() {
    console.log("open-search")
    const maindiv = document.getElementById('maindiv');
    if(maindiv.scrollTop !== 0){
      document.getElementById('maindiv').scrollTo({
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

  function handleOpenCart(){
    setCartOpen(true)
    const sidebardiv = document.getElementById('sidebardiv')
    sidebardiv.classList.remove('hidden')
    sidebardiv.classList.add('z-40')
    // sidebardiv.classList.add('transit')
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
            <header id="hdr" className={`${colorScheme}  shadow-sm dark:bg-gray-950 dark:text-gray-50 h-96`} >
              <div className="flex h-36 mx-0 items-center justify-between px-4 md:px-6 w-full">
                <button className=" rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                  <MenuIcon className="h-8 w-8" />
                  <span className="sr-only">Toggle navigation</span>
                </button>
                <div className="text-4xl cursor-pointer">Bling  💎 Boutique</div>
                <div className="flex items-center gap-2">
                  <button className="searchbarr rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"  onClick={handleOpenSearch}>
                    <SearchIcon className="h-8 w-8 searchbarr" />
                    <span className="sr-only">Open search</span>
                  </button>
                  <button className="rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800" onClick={handleOpenCart}>
                    <ShoppingCartIcon className="h-8 w-8" />
                    <span className="sr-only">Open cart</span>
                  </button>
                </div>
              </div>
              <div className="flex text-center justify-center items-center px-4 md:px-6 py-2">
                  <span className="mr-4 pb-2 text-2xl cursor-pointer">Clothes</span>
                  <span className="mr-4 pb-2 text-2xl cursor-pointer">Jackets</span>
                  <span className="mr-4 pb-2 text-2xl cursor-pointer">Shorts</span>
                  <span className="mr-4 pb-2 text-2xl cursor-pointer">Knickers</span>
                  <span className="mr-4 pb-2 text-2xl cursor-pointer">Pants</span>
                  <span className="mr-4 pb-2 text-2xl cursor-pointer">Shirts</span>
                  <span className="mr-4 pb-2 text-2xl cursor-pointer">Boots</span>
                  <span className="pb-2 text-2xl cursor-pointer">Scarfs</span>
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