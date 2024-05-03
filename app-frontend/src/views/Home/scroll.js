// // console.log("running script")
// let lastScroll = 0;
// const hdr=document.getElementById('hdr')
// // const searchbar=document.getElementById('srchbr')
// const maindiv= document.getElementById('maindiv')

// //window is NOT scrolling (hence should not add event listener to window) 
// //  since overflow-auto/overflow-scroll is allowed on maindiv (so add event listener to it)
// maindiv.addEventListener('scroll',function(){
//     console.log(maindiv)
//     const currentScrollY = maindiv.scrollTop;
//     // console.log(`Scrolled Y: ${currentScrollY}`);
//     // console.log(searchbar)
//     if(currentScrollY > 200){
//         if(currentScrollY > lastScroll ){
//             hdr.style.top = '-208px'
//             // hdr.style.transform = 'translate3d(0, -100%, 0)';
//         } else {
//             hdr.style.top = '0'
//             // hdr.style.transform = 'translate3d(0, 0, 0)';
//         }
//     } else {
//         // hdr.style.backgroundColor = 'bg-red-900/50'
//     }
//     lastScroll = currentScrollY
// })


