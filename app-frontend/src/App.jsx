import {BrowserRouter, Route, Routes } from 'react-router-dom'; //npm i
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
import { fetchcategories } from './api/internal';
import { setCategories } from './store/userSlice';
import { useDispatch, useSelector } from 'react-redux';


function App() {
 
    const user = useSelector((state) => state.user);
    const navbarfootercolorscheme = 'bg-rose-400/60'
    const pagecolorscheme = "bg-red-400/70";
    let categories = ['earrings', 'necklace', 'bracelet', 'beauty', 'rings', 'all', 'sale'];
    const dispatch = useDispatch();

    const [titles,setTitles] = useState([])
    const [suggestions,setSuggestions] = useState([])
    const [search,setSearch] = useState(false)
    const [cartopen,setCartOpen] = useState(false)
    const [searchQuery,setSearchQuery] = useState('')
    const [searchRes,setSearchRes] = useState([])
    const [lastScroll,setlastScroll] = useState(0)
    const [cartbadge, setCartbadge] = useState(0)

    const [fetched,setFetched] = useState(false)

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
        async function fetchCategories(){
            const resp = await fetchcategories();
            // console.log("fetch-cat",resp)
            if(resp.status === 200){
              for(var i in resp.data.categories){
                let c = resp.data.categories[i]
                if(categories.indexOf(c.toLowerCase()) === -1) {
                  // console.log("pushing",c)
                  categories.push(c.toLowerCase())
                }
              }
              dispatch(setCategories(categories))
              setFetched(true)
              // console.log(categories)
              // categories = user.categories
            }
        }
        fetchCategories();
    }, [])
        
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
    fetched && <div id="maindiv" className="fixed top-0 bottom-0 left-0 right-0 overflow-auto" onScroll = {handleScroll} >
      <BrowserRouter>
          <Routes>
              {/* /{console.log(user.categories)} */}
              {user.categories.map((category,idx) => (
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
