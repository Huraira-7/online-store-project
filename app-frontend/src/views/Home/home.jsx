import  {useEffect, useState} from 'react';
import { Button } from "@/components/ui/button"
import { CarouselItem, CarouselContent, CarouselPrevious, CarouselNext, Carousel } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { ScrollArea,ScrollBar } from "@/components/ui/scroll-area"
import { Helmet } from 'react-helmet';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import Navbar from '../../comps/Navbar/Navbar'
import Sidebar from '../../comps/Sidebar/Sidebar';
import Footer from '../../comps/Footer/Footer'
import './home.css'
import { works,halfworks } from '@/assets/randomdata';

function Home() {
  const totalSlides = 4
  const navbarfootercolorscheme = 'bg-rose-400';
  const pagecolorscheme = "bg-red-400/50";
  const titles = [
    "A captivating journey awaits, filled with breathtaking landscapes and vibrant cultures. Explore hidden gems and iconic landmarks, creating memories that will last a lifetime.",
    "Indulge in culinary delights from around the world. Savor authentic flavors and innovative dishes, tantalizing your taste buds and expanding your culinary horizons.",
    "Immerse yourself in the rich tapestry of history and tradition. Uncover ancient secrets and captivating stories woven into the very fabric of the places you visit.",
    "Embrace the thrill of adventure. Step outside your comfort zone and discover new experiences, pushing your limits and creating a sense of accomplishment.",
    "Connect with nature's beauty. Hike amidst stunning scenery, relax on pristine beaches, or simply revel in the tranquility of the natural world.",
    "Forge lasting connections with locals and fellow travelers. Share stories, broaden your perspective, and create a community of like-minded adventurers.",
    "Unleash your creativity. Capture breathtaking photos, write inspiring journals, or simply soak in the inspiration that travel provides.",
    "Find peace and rejuvenation. Escape the daily grind and reconnect with yourself amidst new surroundings, fostering a sense of well-being and inner peace.",
    "Challenge your perspective. Immerse yourself in different cultures and customs, gaining a deeper understanding of the world and your place within it.",
    "Invest in yourself. Travel is an enriching experience that broadens your horizons, cultivates resilience, and creates memories that become lifelong treasures."
  ];
    
  
  const [api, setApi] = useState()  //CarouselApi
  const [search,setSearch] = useState(false)
  const [cartopen,setCartOpen] = useState(false)
  const [searchQuery,setSearchQuery] = useState('')
  const [searchRes,setSearchRes] = useState([])
  const [lastScroll,setlastScroll] = useState(0)
  const hdr=document.getElementById('hdr')
  const maindiv= document.getElementById('maindiv')
  //window is NOT scrolling (hence should not add event listener to window) 
  // since overflow-auto/overflow-scroll is allowed on maindiv (so add event listener to it)

  useEffect(() => {
    if (!api) { return; }
  }, [api])

  useEffect(() => {
    
  }, []) //fetch all items by title 

  useEffect(() => {
    // console.log(searchQuery)
    const filteredTitles = titles.filter(title => title.toLowerCase().includes(searchQuery.toLowerCase()));
    console.log(filteredTitles)
    setSearchRes(filteredTitles)
  }, [searchQuery]) //fetch all items by title 

  useEffect(() => {
    if(maindiv){
      if(cartopen){
        maindiv.style.opacity = '0.6'
        maindiv.style.overflow = 'hidden'
      } else {
        maindiv.style.opacity = '1'
        maindiv.style.overflow = 'auto'
      }
    }
  }, [cartopen]) //update opacities at cart open/close
  

  const handleNextClick = () => {
    if(api.canScrollNext()) {api.scrollNext()} else {api.scrollTo(0,false,-1)}
  };

  const handlePreviousClick = () => {
    if(api.canScrollPrev()) {api.scrollPrev()} else {api.scrollTo(totalSlides-1,false,1)}
  };
  
  const handleScroll = async () => {
    const currentScrollY = maindiv.scrollTop;
      // console.log(`Scrolled Y: ${currentScrollY}`, lastScroll);
      if(currentScrollY > 200){
          if(currentScrollY > lastScroll ){
              // console.log("setting -208")
              hdr.style.top = '-208px'
          } else {
            // console.log("setting 0")
              hdr.style.top = '0'
          }
    }
    setlastScroll(currentScrollY)
    if(search){
      setSearch(false)
      setSearchQuery('')
      setSearchRes([])
      await new Promise((resolve) => setTimeout(resolve, 500));
      const hdr=document.getElementById('hdr')
      hdr.style.top = '-208px'
    } else {
      // console.log(lastScroll)
    }
  };

  function handleCloseCart(){
    setCartOpen(false)
    const sidebardiv = document.getElementById('sidebardiv')
    sidebardiv.classList.remove('z-40')
    sidebardiv.classList.add('hidden')
  }

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

  return (
    <>
    <Sidebar cartopen = {cartopen} setCartOpen={setCartOpen} handleCloseCart={handleCloseCart}/>
    <div id="maindiv" className="fixed top-0 bottom-0 left-0 right-0 overflow-auto" onScroll = {handleScroll} onClick = {(e)=>handleClick(e)}>
          <Helmet>
            {/* {add SEO tags over here ....} */}
            {/* <script src="src/views/Home/scroll.js"> </script> */}
          </Helmet>
          <Navbar colorScheme={navbarfootercolorscheme} search={search} setSearch={setSearch} searchQuery={searchQuery} setSearchQuery={setSearchQuery} setSearchRes={setSearchRes} cartopen = {cartopen} setCartOpen={setCartOpen}/>
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
        <section className="px-4 md:px-6 py-12">
          <span className="text-3xl font-bold">Categories</span>
          <div className=" mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative group rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
              {/* <Link className="absolute inset-0 z-10" href="#">
                <span className="sr-only">View</span>
              </Link> */}
              <img
                alt="Shorts"
                className="object-cover w-full h-auto"
                height={400}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "500/400",
                  objectFit: "cover",
                }}
                width={500}
              />
              <div className="bg-white p-4 dark:bg-gray-950">
                <h3 className="font-bold text-xl">Shorts</h3>
                <p className="text-sm text-gray-500">Comfortable and stylish</p>
              </div>
            </div>
            <div className="relative group rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
              {/* <Link className="absolute inset-0 z-10" href="#">
                <span className="sr-only">View</span>
              </Link> */}
              <img
                alt="Shirts"
                className="object-cover w-full h-auto"
                height={400}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "500/400",
                  objectFit: "cover",
                }}
                width={500}
              />
              <div className="bg-white p-4 dark:bg-gray-950">
                <h3 className="font-bold text-xl">Shirts</h3>
                <p className="text-sm text-gray-500">Stylish and comfortable</p>
              </div>
            </div>
            <div className="relative group rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
              {/* <Link className="absolute inset-0 z-10" href="#">
                <span className="sr-only">View</span>
              </Link> */}
              <img
                alt="Trousers"
                className="object-cover w-full h-auto"
                height={400}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "500/400",
                  objectFit: "cover",
                }}
                width={500}
              />
              <div className="bg-white p-4 dark:bg-gray-950">
                <h3 className="font-bold text-xl">Trousers</h3>
                <p className="text-sm text-gray-500">Tailored and versatile</p>
              </div>
            </div>
            </div>
          </section>
          <section className="px-4 md:px-6 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="relative group rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
              {/* <Link className="absolute inset-0 z-10" href="#">
                <span className="sr-only">View</span>
              </Link> */}
              <img
                alt="Accessories"
                className="object-cover w-full h-auto"
                height={400}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "500/400",
                  objectFit: "cover",
                }}
                width={500}
              />
              <div className="bg-white p-4 dark:bg-gray-950">
                <h3 className="font-bold text-xl">Accessories</h3>
                <p className="text-sm text-gray-500">Complete your look</p>
              </div>
            </div>
        
        
            <div className="relative group rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
              {/* <Link className="absolute inset-0 z-10" href="#">
                <span className="sr-only">View</span>
              </Link> */}
              <img
                alt="Dresses"
                className="object-cover w-full h-auto"
                height={400}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "500/400",
                  objectFit: "cover",
                }}
                width={500}
              />
              <div className="bg-white p-4 dark:bg-gray-950">
                <h3 className="font-bold text-xl">Dresses</h3>
                <p className="text-sm text-gray-500">Elegant and chic</p>
              </div>
            </div>
            <div className="relative group rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
              {/* <Link className="absolute inset-0 z-10" href="#">
                <span className="sr-only">View</span>
              </Link> */}
              <img
                alt="Shoes"
                className="object-cover w-full h-auto"
                height={400}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "500/400",
                  objectFit: "cover",
                }}
                width={500}
              />
              <div className="bg-white p-4 dark:bg-gray-950">
                <h3 className="font-bold text-xl">Shoes</h3>
                <p className="text-sm text-gray-500">Comfortable and stylish</p>
              </div>
            </div>
            </div>
            </section>
            <section className=" px-4 md:px-6 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="relative group rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
              {/* <Link className="absolute inset-0 z-10" href="#">
                <span className="sr-only">View</span>
              </Link> */}
              <img
                alt="Jackets"
                className="object-cover w-full h-auto"
                height={400}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "500/400",
                  objectFit: "cover",
                }}
                width={500}
              />
              <div className="bg-white p-4 dark:bg-gray-950">
                <h3 className="font-bold text-xl">Jackets</h3>
                <p className="text-sm text-gray-500">Warm and fashionable</p>
              </div>
            </div>
            <div className="relative group rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
              {/* <Link className="absolute inset-0 z-10" href="#">
                <span className="sr-only">View</span>
              </Link> */}
              <img
                alt="Scarfs"
                className="object-cover w-full h-auto"
                height={400}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "500/400",
                  objectFit: "cover",
                }}
                width={500}
              />
              <div className="bg-white p-4 dark:bg-gray-950">
                <h3 className="font-bold text-xl">Scarfs</h3>
                <p className="text-sm text-gray-500">Complete your look</p>
              </div>
            </div>
            <div className="relative group rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
              {/* <Link className="absolute inset-0 z-10" href="#">
                <span className="sr-only">View</span>
              </Link> */}
              <img
                alt="Sleeves"
                className="object-cover w-full h-auto"
                height={400}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "500/400",
                  objectFit: "cover",
                }}
                width={500}
              />
              <div className="bg-white p-4 dark:bg-gray-950">
                <h3 className="font-bold text-xl">Sleeves</h3>
                <p className="text-sm text-gray-500">Complete your look</p>
              </div>
            </div>
          </div>
        </section>  
        <section className="px-4 md:px-6 py-12">
          <span className="text-3xl font-bold flex justify-center ">Fresh Arrivals</span>
          <ScrollArea className="mt-16 w-full whitespace-nowrap">
            <div className="flex w-max space-x-16 p-4">
              {works.map((artwork) => (
                <figure key={artwork.artist} className="shrink-0">
                  <div className="overflow-hidden rounded-md">
                    <img
                      src={artwork.art}
                      alt={`Photo by ${artwork.artist}`}
                      className="aspect-[3/4] object-cover"
                      width={500}
                      height={500}
                    />
                  </div>
                  <figcaption className="pt-2 text-xl text-muted-foreground">
                    Photo by{" "}
                    <span className="font-semibold text-foreground">
                      {artwork.artist}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>   
        <section className="px-4 md:px-6 py-24 ">
          <span className="text-3xl font-bold flex justify-center">Best Selling</span>
          <ScrollArea className="mt-16 w-full whitespace-nowrap">
            <div className={`flex ${500*halfworks.length < window.innerWidth-50 ? 'justify-center' : 'w-max'} space-x-16 p-4`}> 
            {/* 500 is width of image ^ */}
              {halfworks.map((artwork) => (
                <figure key={artwork.artist} className="shrink-0">
                  <div className="overflow-hidden rounded-md">
                    <img
                      src={artwork.art}
                      alt={`Photo by ${artwork.artist}`}
                      className="aspect-[3/4] object-cover"
                      width={500}
                      height={500}
                    />
                  </div>
                  <figcaption className="pt-2 text-xl text-muted-foreground">
                    Photo by{" "}
                    <span className="font-semibold text-foreground">
                      {artwork.artist}
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
          <div className={`h-full ${pagecolorscheme}`}>   
            {searchRes.length === 0 && <span className='text-4xl flex pt-64 justify-center'> No items found matching your search query </span>}
            {searchQuery.length > 0 && searchRes.length >  0  && 
               searchRes.map((result, idx) => (
               <div className='text-3xl pt-32 px-6'>
                <span> {result}  </span>
                <br/>
               </div>
              ))
            }
          </div>
          
        )}
          <Footer colorScheme={navbarfootercolorscheme}/>
      </div>
    </>
  );
}



function LeftRightButtons(props) {
  return (
    <>
    <div className="absolute left-4 rounded-md "> 
      <button className="w-12 h-12 px-4 rounded-2xl focus:outline-none hover:bg-white" onClick={props.handlePreviousClick}>
        {/* <img alt='left' src={left} className='rounded-3xl' /> */}
        <IoIosArrowBack  />
      </button>
    </div>
    <div className="absolute right-4 rounded-md "> 
      <button className="w-12 h-12 px-4 rounded-2xl focus:outline-none hover:bg-white" onClick={props.handleNextClick}>
        {/* <img alt='right' src={right} className='rounded-3xl' /> */}
        <IoIosArrowForward />
      </button>
    </div>
    </>
  )
}



export default Home;