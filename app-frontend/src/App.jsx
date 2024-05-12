//imports
import {BrowserRouter, Route, Routes } from 'react-router-dom'; //npm i
import { useSelector } from "react-redux";                      //npm i
import { useState,useEffect } from 'react';

//import components
import Error from './comps/Error/error';
import Downtime from './comps/Downtime/Downtime';
// import Navbar from './comps/Navbar/Navbar';
// import Footer from './comps/Footer/Footer';

// import Protected from './comps/Protected/Protected';
//import pages
// import Login from './views/Login/login';
// import Register from './views/Register/register';
// import ChangePassword from './views/ChangePassword/changepassword';

// import Category from './views/Category/Category';
// import Home from './views/Home/home';
// import Product from './views/Product/Product';
// import Contact from './views/Contact/contact';
// import TnC from './views/TnC/TnC';
// import OrderCancellation from './views/OrderCancellation/OrderCancellation';

import Checkout from './views/Checkout/Checkout';
import Profile from './views/Profile/profile';

import Layout from './lib/PageLayout';




function App() {
 
    // const isAuth = useSelector((state) => state.user.auth); 
    // console.log("auth=",isAuth);
    const navbarfootercolorscheme = 'bg-rose-400'
    const pagecolorscheme = "bg-red-400/50";
    const categories = ['Earrings', 'Necklace', 'Bracelet', 'Beauty', 'Rings'];

    const [titles,setTitles] = useState([])
    const [suggestions,setSuggestions] = useState([])
    const [search,setSearch] = useState(false)
    const [cartopen,setCartOpen] = useState(false)
    const [searchQuery,setSearchQuery] = useState('')
    const [searchRes,setSearchRes] = useState([])
    const [lastScroll,setlastScroll] = useState(0)
    const [cartbadge, setCartbadge] = useState(0)

    const hdr=document.getElementById('hdr')
    //window is NOT scrolling (hence should not add event listener to window) 
    // since overflow-auto/overflow-scroll is allowed on maindiv (so add event listener to it)
    const maindiv= document.getElementById('maindiv')


    useEffect(() => {
        // console.log(searchQuery)
        const filteredTitles = titles.filter(item => item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase()));
        // console.log("filtered",filteredTitles)
        setSearchRes(filteredTitles)
    
        let catgs = []
        for(var i in filteredTitles){ catgs.push(filteredTitles[i].category)  }
        // catgs = ['a','a','a','a','d','d','d'] // Testing 
        const catgCounts = catgs.reduce((acc, char) => {
          acc[char] = (acc[char] || 0) + 1;
          return acc;
        }, {});
        const maxCount = Math.max(...Object.values(catgCounts));
        const mostFrequentCat = Object.keys(catgCounts).filter(char => catgCounts[char] === maxCount)[0];
        const sugg = titles.filter(item => item.category===mostFrequentCat);
        const filteredsugg = sugg.filter(item => filteredTitles.includes(item)===false)
        setSuggestions(filteredsugg)
        
      }, [searchQuery]) //fetch all items by title 
    
      useEffect(() => {
        // if(maindiv){
        //   if(cartopen){
        //     maindiv.style.opacity = '0.6'
        //     maindiv.style.overflow = 'hidden'
        //   } else {
        //     maindiv.style.opacity = '1'
        //     maindiv.style.overflow = 'auto'
        //   }
        // }
      }, [cartopen]) //update opacities at cart open/close

    
    function handleCloseCart(){
      setCartOpen(false)
      // const sidebardiv = document.getElementById('sidebardiv')
      // sidebardiv.classList.remove('z-40')
      // sidebardiv.classList.add('hidden')
    }

    const handleScroll = async () => {
        const currentScrollY = maindiv.scrollTop;
          // console.log(`Scrolled Y: ${currentScrollY}`, lastScroll);
          if(currentScrollY > 200){
              if(hdr){
                if(currentScrollY > lastScroll ){
                    // console.log("setting -208")
                    hdr.style.top = '-270px'
                } else {
                  // console.log("setting 0")
                    hdr.style.top = '0'
                }
              } else{ //searchbar is opened
    
              }
        }
        setlastScroll(currentScrollY)
        if(search && searchRes.length === 0){
          setSearch(false)
          setSearchQuery('')
          setSearchRes([])
          await new Promise((resolve) => setTimeout(resolve, 500));
          const hdr=document.getElementById('hdr')
          if(hdr){
            hdr.style.top = '-270px'
          } //else searchbar is opened
        } else {
          // console.log(lastScroll)
        }
      };
    
    
      const handleClick = (e) => {
        e.preventDefault()
        if(cartopen){
          handleCloseCart()
          return;
        }
        //handle the case where search icon or the window below is clicked (it should not close in that case)
        let classlist = e.target.classList.value.split(" ")
        // console.log(classlist)
        let flag = 0
        if (classlist.includes('searchbarr')) {return;}
        for(var idx in classlist){
          let cname = classlist[idx]
          // console.log(cname)
          if (cname === 'headerbarr'){
            flag = 1
          }
        }
        if (flag === 0){  
          setSearch(false) 
          setSearchQuery('')
          setSearchRes([])
        }
      };

    const navbarfooterprops = {
      navbarfootercolorscheme: navbarfootercolorscheme,
      search: search,
      setSearch: setSearch,
      searchQuery: searchQuery,
      setSearchQuery: setSearchQuery,
      setSearchRes: setSearchRes,
      cartopen : cartopen,
      setCartOpen: setCartOpen,
      handleCloseCart: handleCloseCart,
      cartbadge: cartbadge,
      setCartbadge: setCartbadge
    }

    return (
    <div id="maindiv" className="fixed top-0 bottom-0 left-0 right-0 overflow-auto" onScroll = {handleScroll} onClick = {(e)=>handleClick(e)}>
      <BrowserRouter>
          <Routes>
              <Route path="/"           element={ 
                <>
                <Layout pagename='home' {...navbarfooterprops}  pagecolorscheme={pagecolorscheme} searchRes={searchRes}  setTitles={setTitles} suggestions={suggestions} />
                  {/* <Navbar colorScheme={navbarfootercolorscheme} search={search} setSearch={setSearch} searchQuery={searchQuery} setSearchQuery={setSearchQuery} setSearchRes={setSearchRes} cartopen = {cartopen} setCartOpen={setCartOpen}  handleCloseCart={handleCloseCart}/>
                    <Home cartopen={cartopen} setCartOpen={setCartOpen} handleCloseCart={handleCloseCart} search={search} searchQuery={searchQuery} searchRes={searchRes} navbarfootercolorscheme={navbarfootercolorscheme} pagecolorscheme={pagecolorscheme} setTitles={setTitles} suggestions={suggestions}/> 
                  <Footer colorScheme={navbarfootercolorscheme}/> */}
                </>
              }/>  
               
              {categories.map((category,idx) => (
                <Route key={idx} path={`/category/${category}`} 
                  element={
                    <>
                    <Layout pagename='category/${category}' {...navbarfooterprops} category={category} />
                      {/* <Navbar colorScheme={navbarfootercolorscheme} search={search} setSearch={setSearch} searchQuery={searchQuery} setSearchQuery={setSearchQuery} setSearchRes={setSearchRes} cartopen = {cartopen} setCartOpen={setCartOpen}  handleCloseCart={handleCloseCart}/>
                        <Category category={category} />
                      <Footer colorScheme={navbarfootercolorscheme}/> */}
                    </>
                  } />
              ))}

              <Route path="/product" element={ 
                <>
                  <Layout pagename='product' {...navbarfooterprops} />
                    {/* <Navbar colorScheme={navbarfootercolorscheme} search={search} setSearch={setSearch} searchQuery={searchQuery} setSearchQuery={setSearchQuery} setSearchRes={setSearchRes} cartopen = {cartopen} setCartOpen={setCartOpen}/>
                        <Product/> 
                      <Footer colorScheme={navbarfootercolorscheme}/> */}
                </>
              }  />
              <Route path="/contact" element={ 
                <>
                  <Layout pagename='contact' {...navbarfooterprops} />
                    {/* <Navbar colorScheme={navbarfootercolorscheme} search={search} setSearch={setSearch} searchQuery={searchQuery} setSearchQuery={setSearchQuery} setSearchRes={setSearchRes} cartopen = {cartopen} setCartOpen={setCartOpen}/>
                        <Contact/> 
                      <Footer colorScheme={navbarfootercolorscheme}/> */}
                  </>
              }  />
              <Route path="/termsandconditions" element={ 
                <>
                <Layout pagename='termsandconditions' {...navbarfooterprops} />
                    {/* <Navbar colorScheme={navbarfootercolorscheme} search={search} setSearch={setSearch} searchQuery={searchQuery} setSearchQuery={setSearchQuery} setSearchRes={setSearchRes} cartopen = {cartopen} setCartOpen={setCartOpen}/>
                        <TnC/> 
                      <Footer colorScheme={navbarfootercolorscheme}/> */}
                </>
               }  />
              <Route path="/ordercancellation" element={ 
                <>
                <Layout pagename='ordercancellation' {...navbarfooterprops} />
                    {/* <Navbar colorScheme={navbarfootercolorscheme} search={search} setSearch={setSearch} searchQuery={searchQuery} setSearchQuery={setSearchQuery} setSearchRes={setSearchRes} cartopen = {cartopen} setCartOpen={setCartOpen}/>
                        <OrderCancellation/> 
                      <Footer colorScheme={navbarfootercolorscheme}/> */}
                </>
               }  />


               <Route path="/checkout" element={ <Checkout setCartbadge={setCartbadge}/> }  />
               <Route path="/profile"      
                    element = { <Profile/>} 
                    //  element={  Protected(isAuth,<Profile/>)  }     
               />
              <Route path="/downtime" element={ <Downtime/>  }  />
              <Route path="/category/*" element={<Error /> } />
              <Route path="*"  element={ <Error />  } />
          </Routes>
        </BrowserRouter>
      </div>
    );
    
    {/* <Route path="/login"   element={ <Login/>   }   />   
    <Route path="/register"   element={ <Register />  }   /> 
    <Route path="/changepassword"       
    element={  Protected(isAuth,<ChangePassword/>)   }    
  />  */}
}



export default App
