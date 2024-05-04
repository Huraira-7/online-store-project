import  {useEffect, useState} from 'react';
import { Button } from "@/components/ui/button"
import { CarouselItem, CarouselContent, CarouselPrevious, CarouselNext, Carousel } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { ScrollArea,ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

import { Helmet } from 'react-helmet';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
// import Navbar from '../../comps/Navbar/Navbar'
// import Footer from '../../comps/Footer/Footer'
import Sidebar from '../../comps/Sidebar/Sidebar';
import { fetchinitialdata } from '../../api/internal';
import './home.css'
// import { works,halfworks } from '@/assets/randomdata';

function Home({cartopen,setCartOpen,handleCloseCart,search,searchQuery,searchRes,navbarfootercolorscheme,pagecolorscheme,setTitles}) {
  const totalSlides = 4
  const [categorywise, setCategorywise] = useState([])
  const [bestselling, setBestselling] = useState([])
  const [latest, setLatest] = useState([])
  const [currimg, setCurrimg] = useState([0,0,0,0,0]) //initial pictures for all categories
  
  const [api, setApi] = useState()  //CarouselApi

  // useEffect(() => {
  //   if (!api) { return; }
  // }, [api])

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

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetchinitialdata();
      console.log(resp);
      if(resp.status === 200){
        setTitles(resp.data.titles)
        setCategorywise(resp.data.categorywise)
        setBestselling(resp.data.bestselling)
        setLatest(resp.data.latestproducts)
      } else if (resp.code === "ERR_BAD_REQUEST") {  // display error message
        console.log("setting error-----",resp.response.status); 
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
  };
  

  return (
    <>
    <Sidebar cartopen = {cartopen} setCartOpen={setCartOpen} handleCloseCart={handleCloseCart}/>
    <div >
          <Helmet>
            {/* {add SEO tags over here ....} */}
            {/* <script src="src/views/Home/scroll.js"> </script> */}
          </Helmet>
          
          { !search ? (<div className='mainhomepage'>

          <Carousel  setApi={setApi} plugins={[ Autoplay({delay: 5000, }),]} className={`slideshow-carousel w-full overflow-hidden ${navbarfootercolorscheme}`}>
          <CarouselContent className="">
              <CarouselItem>
              <div className="relative h-[400px] w-full rounded-lg flex items-center justify-center">
                <img
                  alt="Slide 1"
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
                  <h2 className="text-3xl font-bold">Welcome to Fresh Goods</h2>
                  <p className="text-lg">Discover the latest fashion trends</p>
                  <Button >Shop Now</Button>
                </div>
                <LeftRightButtons handleNextClick={handleNextClick} handlePreviousClick={handlePreviousClick}/>
              </div>
            </CarouselItem>
            <CarouselItem>
                <div className="relative h-[400px] w-full rounded-lg flex items-center justify-center">
                  <img
                    alt="Slide 2"
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
                    <h2 className="text-3xl font-bold">Elevate Your Style</h2>
                    <p className="text-lg">Explore our latest collections</p>
                    <Button>Shop Now</Button>
                  </div>
                  <LeftRightButtons handleNextClick={handleNextClick} handlePreviousClick={handlePreviousClick}/>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative h-[400px] w-full rounded-lg flex items-center justify-center">
                  <img
                    alt="Slide 3"
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
                    <h2 className="text-3xl font-bold">Timeless Essentials</h2>
                    <p className="text-lg">Find the perfect pieces for any occasion</p>
                    <Button>Shop Now</Button>
                  </div>
                  <LeftRightButtons handleNextClick={handleNextClick} handlePreviousClick={handlePreviousClick}/>
                </div>
              </CarouselItem>
              <CarouselItem>
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
            </CarouselItem>
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
        <div className={`${pagecolorscheme}`}>
        {Object.keys(categorywise).length > 0 && <div>
        <section className="px-4 md:px-6 py-12">
          <span className="text-3xl font-semibold">Categories</span>
          <div className=" mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative group rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
              {/* <Link className="absolute inset-0 z-10" href="#">
                <span className="sr-only">View</span>
              </Link> */}
              <img
                src={`http://localhost:3000/images/${categorywise['Earrings'].images[0].imagestring}`}
                alt="Earrings"
                className="object-cover w-full h-auto"
                height={400}
                width={500}
                style={{
                  aspectRatio: "500/400",
                  objectFit: "cover",
                }}
              />
              <div className="bg-white p-4 dark:bg-gray-950">
                <h3 className="font-bold text-xl">Earrings</h3>
                <p className="text-sm text-gray-500">Comfortable and stylish</p>
              </div>
            </div>
            <div className="relative group rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
              {/* <Link className="absolute inset-0 z-10" href="#">
                <span className="sr-only">View</span>
              </Link> */}
              <img
                alt="Bracelet"
                src="/placeholder.svg" 
                // http://localhost:3000/images/${categorywise['Bracelet'].images[0].imagestring}
                className="object-cover w-full h-auto"
                height={400}
                width={500}
                style={{
                  aspectRatio: "500/400",
                  objectFit: "cover",
                }}
              />
              <div className="bg-white p-4 dark:bg-gray-950">
                <h3 className="font-bold text-xl">Bracelet</h3>
                <p className="text-sm text-gray-500">Stylish and comfortable</p>
              </div>
            </div>
            <div className="relative group rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
              {/* <Link className="absolute inset-0 z-10" href="#">
                <span className="sr-only">View</span>
              </Link> */}
              <img
                alt="Beauty"
                src="/placeholder.svg"
                // http://localhost:3000/images/${categorywise['Beauty'].images[0].imagestring}
                className="object-cover w-full h-auto"
                height={400}
                width={500}
                style={{
                  aspectRatio: "500/400",
                  objectFit: "cover",
                }}
              />
              <div className="bg-white p-4 dark:bg-gray-950">
                <h3 className="font-bold text-xl">Beauty</h3>
                <p className="text-sm text-gray-500">Tailored and versatile</p>
              </div>
            </div>
            </div>
          </section>
          <section className="px-4 md:px-6 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
              <div className="relative group rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
              {/* <Link className="absolute inset-0 z-10" href="#">
                <span className="sr-only">View</span>
              </Link> */}
              <img
                alt="Rings"
                src="/placeholder.svg"
                // http://localhost:3000/images/${categorywise['Rings'].images[0].imagestring}
                className="object-cover w-full h-auto"
                height={400}
                width={500}
                style={{
                  aspectRatio: "500/400",
                  objectFit: "cover",
                }}
              />
              <div className="bg-white p-4 dark:bg-gray-950">
                <h3 className="font-bold text-xl">Rings</h3>
                <p className="text-sm text-gray-500">Complete your look</p>
              </div>
            </div>
        
        
            <div className="relative group rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
              {/* <Link className="absolute inset-0 z-10" href="#">
                <span className="sr-only">View</span>
              </Link> */}
              <img
                alt="Necklaces"
                src="/placeholder.svg"
                // http://localhost:3000/images/${categorywise['Necklace'].images[0].imagestring}
                className="object-cover w-full h-auto"
                height={400}
                width={500}
                style={{
                  aspectRatio: "500/400",
                  objectFit: "cover",
                }}
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
            <div className="flex w-max space-x-16 p-4">
              {latest.length>0 && latest.map((latestprod,idx) => (
                <figure key={idx} className="shrink-0">
                  <div className="overflow-hidden rounded-md">
                    <img
                      id = {`img-${idx}`}
                      onMouseEnter = {handleHoverImg}
                      src={`http://localhost:3000/images/${latestprod.images[currimg[idx]].imagestring}`}
                      alt={`${latestprod.category}`}
                      className="aspect-[3/4] object-contain outline"
                      width={500}
                      height={500}
                    />
                  </div>
                  <figcaption className="pt-2 text-xl text-muted-foreground">
                    Category: {"  "}
                    <span className="font-semibold text-foreground">
                    {`${latestprod.category}`}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>   
        <section className="px-4 md:px-6 py-24 ">
          {bestselling.length > 0 && <span className="text-3xl font-semibold flex justify-center">Best Selling</span>}       
          <ScrollArea className="mt-16 w-full whitespace-nowrap">
            <div className={`flex ${500*bestselling.length < window.innerWidth-50 ? 'justify-center' : 'w-max'} space-x-16 p-4`}> 
            {/* 500 is width of image ^ */}
              {bestselling.length>0 && bestselling.map((bestprod,idx) => (
                <figure key={idx} className="shrink-0">
                  <div className="overflow-hidden rounded-md">
                    <img
                      src={`http://localhost:3000/images/${bestprod.images[0].imagestring}`}
                      alt={`${bestprod.category}`}
                      className="aspect-[3/4] object-cover"
                      width={500}
                      height={500}
                    />
                  </div>
                  <figcaption className="pt-2 text-xl text-muted-foreground">
                    Category: {"  "}
                    <span className="font-semibold text-foreground">
                      {`${bestprod.category}`}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>     
        </div>
        </div> ) : (
          <div id="searchresultscreen" className={`searchbarr h-screen ${pagecolorscheme} overflow-auto`}>   
            {searchRes.length === 0 && <span className='searchbarr text-4xl flex pt-64 justify-center'> No items found matching your search query </span>}
            <div className='searchbarr flex justify-between mb-52'>  
                  <div className='searchbarr text-3xl pt-32 px-6 flex'>
                  { searchQuery.length > 0 && searchRes.length >  0 && suggestions.length>0 &&
                    suggestions.map((sugg, idx) => (
                      <div key = {idx}  className='searchbarr flex flex-col py-4 mr-52' >
                          <span className='searchbarr text-3xl mb-16 text-center font-semibold'> {idx === 0 ? 'Suggestions' : ''} </span>
                          <li className='searchbarr'>{sugg.title}</li>
                        </div>
                    ))}
                  </div>
                  { searchRes.length >  0  && suggestions.length>0 &&
                    <Separator className="searchbarr my-64 bg-red-900 h-auto" orientation='vertical'/>
                  }
                  <div className='searchbarr text-3xl pt-32 px-6'>
                    {searchQuery.length > 0 && searchRes.length >  0  &&
                    searchRes.map((result, idx) => (
                      <div key = {idx}  className='searchbarr flex flex-col py-4 mr-52' >
                        <span className='searchbarr mb-16 text-center font-semibold'> {idx === 0 ? 'Products' : ''} </span>
                        <div className='flex flex-row cursor-pointer'> {/* onclick leads to that page */}
                          <img src={`http://localhost:3000/images/${result.img}`}
                          height={150} width={150} alt={`${idx}`} />
                          <span className='px-6 flex items-center'> {result.title}  </span>
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
        {/* <img alt='left' src={left} className='rounded-3xl' /> */}
        <IoIosArrowBack  />
      </button>
    </div>
    <div className="absolute right-4 rounded-md "> 
      <button className="w-16 h-16 px-4 rounded-full focus:outline-none hover:bg-white text-3xl" onClick={props.handleNextClick}>
        {/* <img alt='right' src={right} className='rounded-3xl' /> */}
        <IoIosArrowForward />
      </button>
    </div>
    </>
  )
}



export default Home;