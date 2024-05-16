//imports
import {BrowserRouter, Route, Routes } from 'react-router-dom'; //npm i
import { useSelector } from "react-redux";                      //npm i
import { useState,useEffect } from 'react';

//import components
import Error from './comps/Error/error';
import Downtime from './comps/Downtime/Downtime';
// import Protected from './comps/Protected/Protected';

//import pages
import Checkout from './views/Checkout/Checkout';
import Profile from './views/Profile/profile';
import Layout from './lib/PageLayout';
import Confirmation from './views/Confirmation/Confirmation';


function App() {
 
    // const down = useSelector((state) => state.user.down); 
    // console.log("auth=",isAuth);
    const navbarfootercolorscheme = 'bg-rose-400/60'
    const pagecolorscheme = "bg-red-400/70";
    const categories = ['earrings', 'necklace', 'bracelet', 'beauty', 'rings', 'all', 'sale'];

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
        console.log("filtered",filteredTitles)
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

    
    function handleCloseCart(){
      setCartOpen(false)
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
    
    
      // const handleClick = (e) => {
      //   e.preventDefault()
      //   if(cartopen){
      //     handleCloseCart()
      //     return;
      //   }
      //   //handle the case where search icon or the window below is clicked (it should not close in that case)
      //   let classlist = e.target.classList.value.split(" ")
      //   // console.log(classlist)
      //   let flag = 0
      //   if (classlist.includes('searchbarr')) {return;}
      //   for(var idx in classlist){
      //     let cname = classlist[idx]
      //     // console.log(cname)
      //     if (cname === 'headerbarr'){
      //       flag = 1
      //     }
      //   }
      //   if (flag === 0){  
      //     setSearch(false) 
      //     setSearchQuery('')
      //     setSearchRes([])
      //   }
      // };
    const [loading, setLoading] = useState(true)

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
      setCartbadge: setCartbadge,
      loading: loading,
      setLoading: setLoading
    }

    return (
    <div id="maindiv" className="fixed top-0 bottom-0 left-0 right-0 overflow-auto" onScroll = {handleScroll} >
      <BrowserRouter>
          <Routes>
               
              {categories.map((category,idx) => (
                <Route key={idx} path={`/category/${category}`} 
                element={ <Layout key={`/category/${category}`} pagename={`category/${category}`} {...navbarfooterprops} category={category} /> } />
              ))}

              <Route path="/"   element={<Layout pagename='home' {...navbarfooterprops}  pagecolorscheme={pagecolorscheme} searchRes={searchRes}  setTitles={setTitles} suggestions={suggestions} /> }/>  
              <Route path="/product" element={ <Layout pagename='product' {...navbarfooterprops} /> }  />
              <Route path="/contact" element={ <Layout pagename='contact' {...navbarfooterprops} /> }  />
              <Route path="/termsandconditions" element={ <Layout pagename='termsandconditions' {...navbarfooterprops} />}  />
              <Route path="/ordercancellation" element={ <Layout pagename='ordercancellation' {...navbarfooterprops} />}  />


              <Route path="/confirmation"   element = { <Confirmation/>}  />
              <Route path="/profile"   element = { <Profile  loading={loading} setLoading={setLoading} />}  />
              <Route path="/checkout" element={ <Checkout setCartbadge={setCartbadge} loading={loading} setLoading={setLoading} /> }  />
              <Route path="/downtime" element={ <Downtime/>  }  />
              <Route path="/category/*" element={<Error /> } />
              <Route path="*"  element={ <Error />  } />
          </Routes>
        </BrowserRouter>
      </div>
    );
}



export default App
