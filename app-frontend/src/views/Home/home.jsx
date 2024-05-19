import  {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, setUser , resetUser, additemsOnSale, setDown} from '../../store/userSlice';

// import { Button } from "@/components/ui/button"
import { CarouselItem, CarouselContent, CarouselPrevious, CarouselNext, Carousel } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { ScrollArea,ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

import { Helmet } from 'react-helmet';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { fetchinitialdata } from '../../api/internal';
import {  useNavigate } from 'react-router-dom';
import './home.css'
import Loading from '@/lib/Loading';
// import { works,halfworks } from '@/assets/randomdata';

function Home({suggestions,search,searchQuery,setSearch, setSearchQuery, setSearchRes, searchRes,navbarfootercolorscheme,pagecolorscheme,loading,setLoading, setTitles,setCartbadge}) {
  const totalSlides = 4
  const [categorywise, setCategorywise] = useState([])
  const [bestselling, setBestselling] = useState([])
  const [latest, setLatest] = useState([])
  const [onsale, setOnsale] = useState([])
  const [all, setAll] = useState([])
  const [currimg, setCurrimg] = useState([0,0,0,0,0]) //initial pictures for all categories
  
  const [api, setApi] = useState()  //CarouselApi
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = useSelector((state) => state.user);
  // console.log(user)

  useEffect(() => {
    if (user.cart === undefined){
      dispatch(setUser({_id: generateRandomId()}));
    } else {
      setCartbadge(user.cart.length)
    }
  }, [user])
  
  const handleHoverImg = (event) => {
    const { id } = event.target;
    const index = parseInt(id.split('-')[1], 10);
    let value = currimg[index]+1;
    if(latest[index].images.length === value) {value = 0;}
    setCurrimg([...currimg.slice(0, index), value, ...currimg.slice(index + 1)]); // Update images at specific index
    // let tmp = [...currimg.slice(0, index), value, ...currimg.slice(index + 1)]
    // console.log(tmp)
    let imgg = document.getElementById(id)
    // console.log(imgg.classList)
    // imgg.classList.add('bg-red-900')
  };

  window.onbeforeunload = function (e) { //not at page change but at reload
      // dispatch(resetUser()) 
      // fetch data again for latest info?
  };

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetchinitialdata();
      // console.log(resp);
      if(resp.status === 200){
        if(resp.data.down === true) {
          dispatch(setDown(true))
          navigate('/downtime',{replace:true})
        }
        setTitles(resp.data.titles)
        setAll(resp.data.products)
        setCategorywise(resp.data.categorywise)
        setBestselling(resp.data.bestselling)
        setLatest(resp.data.latestproducts)
        setOnsale(resp.data.sale)
        if(resp.data.sale.length>0){ dispatch(additemsOnSale(resp.data.sale)) }
        setLoading(false)
      } else if (resp.code === "ERR_BAD_REQUEST") {  // display error message
        // console.log("setting error-----",resp.response.status); 
        // if (resp.response.status === 404) {setError("error 404 Server is offline");}
        // if (resp.response.status === 500) {setError("error 500 Internal Server Error");}      
      } 
    }
    fetchData();
  }, []) //fetch all items by title 
  
  const handleNextClick = () => {
    if(api.canScrollNext()) {api.scrollNext()} else {api.scrollTo(0,false,-1)}
  };

  const handlePreviousClick = () => {
    if(api.canScrollPrev()) {api.scrollPrev()} else {api.scrollTo(totalSlides-1,false,1)}
    // dispatch(resetUser())
  };

  function generateRandomId() {
    const randomNum = Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;
    return randomNum.toString().padStart(8, '0');
  }

  function navtoProduct(result){ //from search window
    setSearch(false) 
    setSearchQuery('')
    setSearchRes([])
    let prod = all.filter(dictionary => dictionary._id === result.id)[0]
    navigate('/product', { state:{product: btoa(JSON.stringify(prod))} })
  }

  function navigatetoProduct(result){ //from home page
    navigate('/product', { state:{product: btoa(JSON.stringify(result))} })
  }

  const handleAddItem = (e,prod) => {
    // console.log("adding item")
    e.preventDefault()
    if(prod.is_out_stock === false){
      // console.log(prod)
      let temp = {...prod}
      temp['qty'] = 1
      dispatch(addItem(temp));
      let cartt = user.cart
      setCartbadge(cartt.length)
    }
  }

  

  return (
    <>
    <div >
          <Helmet>
            {/* {add SEO tags over here ....} */}
            {/* <script src="src/views/Home/scroll.js"> </script> */}
          </Helmet>
          {/* greater than 1000px maybe design something else ?? */}
          { !search ? (
              loading ? 
               <Loading/>
              :
              <div className='mainhomepage'>
                <Carousel  setApi={setApi} plugins={[ Autoplay({delay: 5000, }),]} className={`bg-rose-200 pb-10 w-full overflow-hidden`}>
                <CarouselContent className="">
                    <CarouselItem className='bg-rose-200'>
                    <div className="relative h-[600px]  w-full rounded-lg flex items-center justify-center">
                      <img
                        alt="Get earrings, rings, and necklaces on discounted prices"
                        className="h-full w-full object-contain "
                        src={`images/theme3.jpg`}
                      />
                      <LeftRightButtons handleNextClick={handleNextClick} handlePreviousClick={handlePreviousClick}/>
                    </div>
                  </CarouselItem>
                  <CarouselItem className='bg-rose-200'>
                      <div className="relative h-[600px] w-full rounded-lg flex items-center justify-center">
                        <img
                          alt="The perfect store for women's beauty products"
                          className="h-full w-full object-contain"
                          src={`images/theme2.jpg`}
                        />
                        <LeftRightButtons handleNextClick={handleNextClick} handlePreviousClick={handlePreviousClick}/>
                      </div>
                    </CarouselItem>
                    <CarouselItem className='bg-rose-200'>
                      <div className="relative h-[600px] w-full rounded-lg flex items-center justify-center">
                        <img
                          alt="Sparkle with our latest collections, here at Bling Boutique"
                          className="h-full w-full object-contain"
                          src={`images/theme1.jpg`}
                        />
                        <LeftRightButtons handleNextClick={handleNextClick} handlePreviousClick={handlePreviousClick}/>
                      </div>
                    </CarouselItem>
                    {/* <CarouselItem>
                    <div className="relative h-[400px] w-full rounded-lg flex items-center justify-center">
                    <img
                        alt="Slide 4"
                        className="h-full w-full object-cover"
                        height={400}
                        src="/placeholder.svg"
                        style={{
                          aspectRatio: "1600/400",
                          objectFit: "cover",
                        }}
                        width={1600}
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4 text-center text-white">
                        <h2 className="text-3xl font-bold">Sustainable Style</h2>
                        <p className="text-lg">Explore our eco-friendly collections</p>
                        <Button>Shop Now</Button>
                      </div>
                      <LeftRightButtons handleNextClick={handleNextClick} handlePreviousClick={handlePreviousClick}/>
                      </div>
                    </CarouselItem> */}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
        {/* <div className="px-4 md:px-6 py-12"> */}
        {/* <Carousel plugins={[ Autoplay({delay: 5000, }),]} className="px-4 md:px-6 py-10 w-full overflow-hidden">
            <CarouselContent className="full">
            <CarouselItem>
            <div className="relative h-[300px] w-full rounded-lg">
            <img
            alt="Slide 1"
            className="h-full w-full object-cover"
            height={300}
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "1200/300",
                      objectFit: "cover",
                    }}
                    width={1200}
                    />
                    </div>
                    </CarouselItem>
              <CarouselItem>
                <div className="relative h-[300px] w-full rounded-lg">
                <img
                alt="Slide 2"
                className="h-full w-full object-cover"
                    height={300}
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "1200/300",
                      objectFit: "cover",
                    }}
                    width={1200}
                    />
                    </div>
                    </CarouselItem>
                    <CarouselItem>
                    <div className="relative h-[300px] w-full rounded-lg">
                    <img
                    alt="Slide 3"
                    className="h-full w-full object-cover"
                    height={300}
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "1200/300",
                      objectFit: "cover",
                    }}
                    width={1200}
                  />
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel> */}
        {/* </div> */}
        <div className={`bg-amber-800/10`}>
        {Object.keys(categorywise).length > 0 && <div>
        <section className="px-4 md:px-6 py-12">
          <span className="text-3xl font-semibold">Categories</span>
          <div className=" mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative group rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
              <img
                src={categorywise['Earrings'].images[0].imagestring[0] === 'f' ? `images/${categorywise['Earrings'].images[0].imagestring}` : categorywise['Earrings'].images[0].imagestring}
                alt="Earrings"
                className="object-cover w-full h-auto rounded-3xl"
                height={400}
                width={500}
                style={{
                  aspectRatio: "500/400",
                  objectFit: "cover",
                }}
                onClick={()=>navigate('/category/earrings')}
              />
              <div className="bg-white p-4 dark:bg-gray-950">
                <h3 className="font-bold text-xl">Earrings</h3>
                <p className="text-sm text-gray-500">Comfortable and stylish</p>
              </div>
            </div>
            <div className="relative group rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
              <img
                alt="Bracelet"
                src={categorywise['Bracelet'].images[0].imagestring[0] === 'f' ? `images/${categorywise['Bracelet'].images[0].imagestring}` : categorywise['Bracelet'].images[0].imagestring}
                className="object-cover w-full h-auto rounded-3xl"
                height={400}
                width={500}
                style={{
                  aspectRatio: "500/400",
                  objectFit: "cover",
                }}
                onClick={()=>navigate('/category/bracelet')}
              />
              <div className="bg-white p-4 dark:bg-gray-950">
                <h3 className="font-bold text-xl">Bracelet</h3>
                <p className="text-sm text-gray-500">Stylish and comfortable</p>
              </div>
            </div>
            <div className="relative group rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
              <img
                alt="Beauty"
                src={categorywise['Beauty'].images[0].imagestring[0] === 'f' ? `images/${categorywise['Beauty'].images[0].imagestring}` : categorywise['Beauty'].images[0].imagestring}
                className="object-cover w-full h-auto rounded-3xl"
                height={400}
                width={500}
                style={{
                  aspectRatio: "500/400",
                  objectFit: "cover",
                }}
                onClick={()=>navigate('/category/beauty')}
                />
              <div className="bg-white p-4 dark:bg-gray-950">
                <h3 className="font-bold text-xl">Beauty</h3>
                <p className="text-sm text-gray-500">Complete your look</p>
              </div>
            </div>
            </div>
          </section>
          <section className="px-4 md:px-6 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
              <div className="relative group rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
              <img
                alt="Rings"
                src={categorywise['Rings'].images[0].imagestring[0] === 'f' ? `images/${categorywise['Rings'].images[0].imagestring}` : categorywise['Rings'].images[0].imagestring}
                className="object-cover w-full h-auto rounded-3xl"
                height={400}
                width={500}
                style={{
                  aspectRatio: "500/400",
                  objectFit: "cover",
                }}
                onClick={()=>navigate('/category/rings')}
              />
              <div className="bg-white p-4 dark:bg-gray-950">
                <h3 className="font-bold text-xl">Rings</h3>
                <p className="text-sm text-gray-500">Tailored and versatile</p>
              </div>
            </div>
        
        
            <div className="relative group rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
              <img
                alt="Necklaces"
                src={categorywise['Necklace'].images[0].imagestring[0] === 'f' ? `images/${categorywise['Necklace'].images[0].imagestring}` : categorywise['Necklace'].images[0].imagestring}
                className="object-cover w-full h-auto rounded-3xl"
                height={400}
                width={500}
                style={{
                  aspectRatio: "500/400",
                  objectFit: "cover",
                }}
                onClick={()=>navigate('/category/necklace')}
              />
              <div className="bg-white p-4 dark:bg-gray-950">
                <h3 className="font-bold text-xl">Necklaces</h3>
                <p className="text-sm text-gray-500">Elegant and chic</p>
              </div>
            </div>    
            </div>
          </section>
          </div>}
        <section className="px-4 md:px-6 py-12">
          {latest.length>0 && <span className="text-3xl font-semibold flex justify-center ">Fresh Arrivals</span>}     
          <ScrollArea className="mt-16 w-full whitespace-nowrap">
            <div className="flex w-max space-x-8 max-[500px]:space-x-4 p-1">
              {latest.length>0 && latest.map((latestprod,idx) => (
                <figure key={idx} className="shrink-0 bg-red-100 rounded-3xl max-[1500px]:w-52">
                  <div className="overflow-hidden rounded-md">
                    <img
                      id = {`img-${idx}`}
                      onMouseEnter = {handleHoverImg}
                      src={latestprod.images[currimg[idx]].imagestring[0] === 'f' ? `images/${latestprod.images[currimg[idx]].imagestring}` : latestprod.images[currimg[idx]].imagestring}
                      alt={`${latestprod.title}`}
                      className="aspect-[3/4] object-contain outline"
                      width={500}
                      height={500}
                      onClick={()=>navigatetoProduct(latestprod)}
                      />
                  </div>
                  { latestprod.is_out_stock ? 
                    <div className="p-4 max-[1000px]:p-1 max-[1000px]:pb-0 bg-pink-500/80 w-9/12 text-center m-auto cursor-pointer relative bottom-20 max-[1000px]:bottom-6 rounded-full text-3xl max-[1000px]:text-2xl">
                      Sold
                    </div> : ''
                  }
                  <figcaption className="pt-2 text-2xl mt-4 text-muted-foreground text-center max-[1500px]:text-xl">
                     {"  "}
                    <span className="font-semibold text-foreground text-wrap">
                    {`${latestprod.title}`} 
                    </span>
                  </figcaption>
                  {   latestprod.oldprice  && latestprod.oldprice > latestprod.price ?  
                        <figcaption className="line-through pt-2 max-[500px]:pt-0 pt-4 text-2xl  max-[500px]:text-xl text-muted-foreground text-center">
                          Rs {"  "}
                          <span className="text-foreground">
                          {`${latestprod.oldprice.toLocaleString()}`} 
                          </span>
                        </figcaption> 
                    :  <figcaption className="mt-1"></figcaption> 
                  }
                  <figcaption className={`"pt-1 text-2xl flex justify-center max-[500px]:text-xl ${(latestprod.oldprice && latestprod.oldprice > latestprod.price)? 'mt-2' : 'mt-20'} text-muted-foreground text-center"`}>
                    Rs {"  "}
                    <span className="text-foreground">
                    {`${latestprod.price.toLocaleString()}`} 
                    </span>
                  </figcaption>
                  <div className='flex justify-center my-4'>
                    <button className={`'noscalebtn px-16  max-[1500px]:px-8 py-8 ${latestprod.is_out_stock ? 'cursor-not-allowed' : 'cursor-pointer'} text-4xl  max-[1500px]:text-xl bg-white rounded-md outline-none hover:outline-slate-800 outline-1'`} onClick={(e)=>handleAddItem(e,latestprod)}> Add to Cart</button>
                  </div>
                </figure>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>   
        <section className="px-4 md:px-6 py-24 ">
          {bestselling.length > 0 && <span className="text-3xl font-semibold flex justify-center">Best Selling</span>}       
          <ScrollArea className="my-20 w-full whitespace-nowrap">
            <div className={`flex ${500*bestselling.length < window.innerWidth-50 ? 'justify-center' : 'w-max'} space-x-8 max-[500px]:space-x-4 p-4`}> 
            {/* 500 is width of image ^ */}
              {bestselling.length>0 && bestselling.map((bestprod,idx) => (
                <figure key={idx} className="shrink-0 bg-red-100 rounded-3xl max-[1500px]:w-52" >
                  <div className="overflow-hidden rounded-md">
                    <img
                      src={bestprod.images[0].imagestring[0] === 'f' ? `images/${bestprod.images[0].imagestring}` : bestprod.images[0].imagestring}
                      alt={`${bestprod.title}`}
                      className="aspect-[3/4] object-cover"
                      width={500}
                      height={500}
                      onClick={()=>navigatetoProduct(bestprod)}
                      />
                  </div>
                  { bestprod.is_out_stock ? 
                    <div className="p-4 bg-pink-500/80 w-9/12 text-center m-auto cursor-pointer relative bottom-20 rounded-full text-3xl">
                      Sold
                    </div> : <div className="p-7 w-9/12 text-center m-auto cursor-pointer relative bottom-20 rounded-full text-3xl">
                    </div> 
                  }
                  <figcaption className="pt-2 text-2xl text-center mt-4 text-muted-foreground">
                     {"  "}
                    <span className="font-semibold text-foreground text-wrap max-[500px]:text-xl">
                      {`${bestprod.title}`}
                    </span>
                  </figcaption>
                  {   bestprod.oldprice && bestprod.oldprice > bestprod.price ?  
                        <figcaption className="line-through pt-2 text-2xl max-[500px]:text-xl mt-4 text-muted-foreground text-center">
                          Rs {"  "}
                          <span className="text-foreground ">
                          {`${bestprod.oldprice.toLocaleString()}`} 
                          </span>
                        </figcaption> 
                    :  <figcaption className="mt-16"></figcaption> 
                  }
                  <figcaption className="pt-2 text-2xl mt-4 max-[500px]:text-xl text-muted-foreground text-center">
                    Rs {"  "}
                    <span className="text-foreground">
                    {`${bestprod.price.toLocaleString()}`} 
                    </span>
                  </figcaption>
                  <div className='flex justify-center my-8'>
                    <button className={`'noscalebtn px-16 max-[1500px]:px-8 py-8 text-2xl max-[1500px]:text-xl ${bestprod.is_out_stock ? 'cursor-not-allowed' : 'cursor-pointer'} bg-white rounded-md outline-none hover:outline-slate-800 outline-1'`} onClick={(e)=>handleAddItem(e,bestprod)}> Add to Cart</button>
                  </div>
                </figure>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>   
        <section className="px-4 md:px-6 py-24 ">
          {onsale.length > 0 && <span className="text-3xl font-semibold flex justify-center"> On Sale </span>}       
          <ScrollArea className="my-20 w-full whitespace-nowrap">
            <div className={`flex ${500*onsale.length < window.innerWidth-50 ? 'justify-center' : 'w-max'} space-x-8 max-[500px]:space-x-4 p-4`}> 
            {/* 500 is width of image ^ */}
              {onsale.length>0 && onsale.map((saleprod,idx) => (
                <figure key={idx} className="shrink-0 bg-red-100 rounded-3xl max-[1500px]:w-52" >
                  <div className="overflow-hidden rounded-md">
                    <img
                      src={saleprod.images[0].imagestring[0] === 'f' ? `images/${saleprod.images[0].imagestring}` : saleprod.images[0].imagestring}
                      alt={`${saleprod.title}`}
                      className="aspect-[3/4] object-cover"
                      width={500}
                      height={500}
                      onClick={()=>navigatetoProduct(saleprod)}
                      />
                  </div>
                  { saleprod.is_out_stock ? 
                    <div className="p-4 bg-pink-500/80 w-9/12 text-center m-auto cursor-pointer relative bottom-20 rounded-full text-3xl">
                      Sold
                    </div> : <div className="p-7 w-9/12 text-center m-auto cursor-pointer relative bottom-20 rounded-full text-3xl">
                    </div> 
                  }
                  <figcaption className="pt-2 text-2xl text-center mt-4 text-muted-foreground">
                     {"  "}
                    <span className="font-semibold text-foreground text-wrap max-[500px]:text-xl">
                      {`${saleprod.title}`}
                    </span>
                  </figcaption>
                  {   saleprod.oldprice && saleprod.oldprice > saleprod.price ?  
                        <figcaption className="line-through pt-2 text-2xl max-[500px]:text-xl mt-4 text-muted-foreground text-center">
                          Rs {"  "}
                          <span className="text-foreground ">
                          {`${saleprod.oldprice.toLocaleString()}`} 
                          </span>
                        </figcaption> 
                    :  <figcaption className="mt-16"></figcaption> 
                  }
                  <figcaption className="pt-2 text-2xl mt-4 max-[500px]:text-xl text-muted-foreground text-center">
                    Rs {"  "}
                    <span className="text-foreground">
                    {`${saleprod.price.toLocaleString()}`} 
                    </span>
                  </figcaption>
                  <div className='flex justify-center my-8'>
                    <button className={`'noscalebtn px-16 max-[1500px]:px-8 py-8 text-2xl max-[1500px]:text-xl ${saleprod.is_out_stock ? 'cursor-not-allowed' : 'cursor-pointer'} bg-white rounded-md outline-none hover:outline-slate-800 outline-1'`} onClick={(e)=>handleAddItem(e,saleprod)}> Add to Cart</button>
                  </div>
                </figure>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>     
        </div>
        </div>  ) : (
          <div id="searchresultscreen" className={`searchbarr h-screen ${pagecolorscheme} overflow-auto`}>   
            {searchRes.length === 0 && <span className='searchbarr text-2xl flex pt-64 justify-center text-center max-[1100px]:text-xl '> No items found matching your search query </span>}
            <div className='searchbarr flex max-[950px]:flex-col justify-between mb-52'>  
                  <div className='searchbarr text-3xl pt-32 max-[950px]:pt-12 px-6 flex'>
                    <div> 
                      { searchQuery.length > 0 && searchRes.length >  0 && suggestions.length>0 &&
                        suggestions.map((sugg, idx) => (
                          <div key = {idx}  className='searchbarr flex flex-col py-4 max-[950px]:py-0 mr-52 max-[950px]:mr-0' >
                              <span className='searchbarr text-2xl mb-16 max-[950px]:mb-6 text-center font-semibold'> {idx === 0 ? 'Suggestions' : ''} </span>
                              <li className='searchbarr text-xl'>{sugg.title}</li>
                            </div>
                        ))}
                    </div>
                  </div>
                  { searchRes.length >  0  && suggestions.length>0 &&
                    <Separator className="searchbarr my-64 max-[950px]:my-2 bg-red-900 h-auto" orientation='vertical'/>
                  }
                  <div className='searchbarr pt-32 px-6 max-[950px]:pt-4 text-2xl'>
                    {searchQuery.length > 0 && searchRes.length >  0  &&
                    searchRes.map((result, idx) => (
                      <div key = {idx}  className='searchbarr flex flex-col py-4 mr-52' onClick={()=> navtoProduct(result)} >
                        <span className='searchbarr mb-16 max-[950px]:mb-4 text-center font-semibold'> {idx === 0 ? 'Products' : ''} </span>
                        <div className='flex flex-row cursor-pointer'> 
                          <img src={`images/${result.img}`}
                          height={150} width={150} alt={`${result.title}`} />
                          <span className='px-6 flex items-center text-xl text-wrap'> {result.title}  </span>
                        </div>
                      </div>
                    ))}
                  </div>
            </div>
          </div>
          
        )}
          
      </div>
    </>
  );
}



function LeftRightButtons(props) {
  return (
    <>
    <div className="absolute left-4 rounded-md "> 
      <button className="w-16 h-16 px-4 rounded-full focus:outline-none hover:bg-white text-3xl" onClick={props.handlePreviousClick}>
        <IoIosArrowBack  />
      </button>
    </div>
    <div className="absolute right-4 rounded-md "> 
      <button className="w-16 h-16 px-4 rounded-full focus:outline-none hover:bg-white text-3xl" onClick={props.handleNextClick}>
        <IoIosArrowForward />
      </button>
    </div>
    </>
  )
}



export default Home;