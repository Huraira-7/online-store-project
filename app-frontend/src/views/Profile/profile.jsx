import {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { Toggle } from "@/components/ui/toggle"
import { ScrollArea,ScrollBar } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from "@/components/ui/alert-dialog"
import {  addproduct, fetchallproducts, editproduct, editproductaddphoto, deleteproduct, getallemails, changemail, changedowntime} from '../../api/internal';
import { setDown } from '@/store/userSlice';
import ErrorMessage from '@/lib/ErrorMessage';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '@/lib/Loading';
import { Helmet } from 'react-helmet';
import { GrRadialSelected } from 'react-icons/gr';
import { splitIntoChunks } from '@/lib/utils';
import './profile.css'
import { split } from 'postcss/lib/list';


function Profile({loading,setLoading}) {
  // const user = useSelector((state) => state.user);
  // console.log(user)
  const navigate = useNavigate();
  const loc = useLocation();


  const [file, setFile] = useState(null);
  const [products,setProducts] = useState([]);
  const [title, setTitle] = useState('');
  const [desc,setDesc] = useState('');
  const [price, setPrice] = useState(0);
  const [titles, setTitles] = useState([]);
  const [descs,setDescs] = useState([]);
  const [pids, setPids] = useState([]) 
  const [prices, setPrices] = useState([]);
  const [stocktoggle, setStockToggle] = useState([]);
  const [bestselltoggle, setBestsellToggle] = useState([]);
  const [imgtoggle, setImgToggle] = useState([]);
  const [files,setFiles] = useState([])
  const [selected, setSelected] = useState("");
  const [isOpen, setIsOpen] = useState([]);
  const [isOpen2, setIsOpen2] = useState([]);
  const allowedFileExtensions = ['jpg','jpeg','png','bmp','gif','tiff']

  const [isdown, setIsdown] = useState(false)
  const [newmail, setNewmail] = useState('')
  const [selectedcatgry, setselectedcatgry] = useState("Earrings"); //while editing
  const [categories, setCategories] = useState([])
  const [chunks, setChunks] = useState([])
  const [newcatg, setnewCatg] = useState('')
  const [diffcatg, setdiffCatg] = useState(false)
  const dispatch = useDispatch()

  //errors 
  const [error, setError] = useState('')
  const [openerr, setOpenerr] = useState(false);
  const handleOpenerr = (txt) => { 
    setError(txt)
    setOpenerr(true); 
  };


  const handleContinueClickSaveChanges = async (e,idx) => {
    // console.log(idx)
    await handleEditProd(e,idx);
    handlesetIsOpen(false,idx); // Close the dialog manually
    window.location.reload()
  };

  const handleContinueClickDelete = async (e,idx) => {
    await handleDelProd(e,idx);
    handlesetIsOpen2(false,idx); // Close the dialog manually
    window.location.reload()
  };

  function handlesetIsOpen(flag,idx){
    setIsOpen([...isOpen.slice(0, idx), !isOpen[idx], ...isOpen.slice(idx + 1)]); 
  }

  function handlesetIsOpen2(flag,idx){
    setIsOpen2([...isOpen2.slice(0, idx), !isOpen2[idx], ...isOpen2.slice(idx + 1)]); 
  }

  const setFileBase64 = (e,type,idx)  => {

    if(e.size>=2097152){ //file size comparison in bytes (should be <2MB)
      handleOpenerr("File size should be less than 2MB");
      return;
    }

    const fileExtension = e.name.split('.').pop(); // Extract extension
    // console.log("File Extension:", fileExtension);
    if(allowedFileExtensions.includes(fileExtension) === false){
      handleOpenerr('File extension not allowed')
      // handleOpenerr('Allowed file extensions are .jpg, .jpeg, .png, .bmp, .gif, .tiff')
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(e);
    reader.onloadend = () => { 
      console.log("reader-atload-end")
      // console.log(reader.result)
      if(type==='single') {  setFile(reader.result);  } 
      else {
        setFiles([...files.slice(0, idx), reader.result, ...files.slice(idx + 1)]);
      }
    };
  }

  const handlesetFile = (e) => {
    e.preventDefault()
    const f = e.target.files[0]
    setFile(f)
    setFileBase64(f,"single",-1)
  }

  const handlesetFiles = (e) => {
    e.preventDefault()
    const { id } = e.target;
    const index = parseInt(id.split('-')[1], 10);
    setFiles([...files.slice(0, index), e.target.files[0], ...files.slice(index + 1)]); 
    setFileBase64(e.target.files[0],"multiple",index)
  }

  const handleremoveFiles = (e) => {
    e.preventDefault()
    const { id } = e.target;
    const index = parseInt(id.split('-')[1], 10);
    setFiles([...files.slice(0, index), undefined, ...files.slice(index + 1)]); 
  }

  function handleSetPrice (e){
    const value = e.target.value;
    if (!isNaN(parseInt(value))) {
      setPrice(parseInt(value));
    } 
  }

  const handleTitleChange = (event) => {
    const { id, value } = event.target;
    const index = parseInt(id.split('-')[1], 10); // Extract index from id (assuming format `t-index`)
    setTitles([...titles.slice(0, index), value, ...titles.slice(index + 1)]); // Update titles at specific index
  };
  
  const handlePriceChange = (event) => {
    const { id, value } = event.target;
    const index = parseInt(id.split('-')[1], 10);
    if (!isNaN(parseInt(value))) {
      setPrices([...prices.slice(0, index), parseInt(value), ...prices.slice(index + 1)]); // Update prices at specific index
    } 
  };
  
  const handleDescChange = (event) => {
    const { id, value } = event.target;
    const index = parseInt(id.split('-')[1], 10);
    setDescs([...descs.slice(0, index), value, ...descs.slice(index + 1)]); // Update descriptions at specific index
  };

  const handleStocktoggle = (event) => {
    const { id } = event.target;
    const index = parseInt(id.split('-')[1], 10);
    setStockToggle([...stocktoggle.slice(0, index), !stocktoggle[index], ...stocktoggle.slice(index + 1)]); // Update descriptions at specific index
  };

  const handleBestselltoggle = (event) => {
    const { id } = event.target;
    const index = parseInt(id.split('-')[1], 10);
    setBestsellToggle([...bestselltoggle.slice(0, index), !bestselltoggle[index], ...bestselltoggle.slice(index + 1)]); // Update descriptions at specific index
  };

  const handleImgtoggle = (event) => {
    const { id } = event.target;
    const arrayindex = parseInt(id.split('-')[1], 10);
    const elemindex = parseInt(id.split('-')[2], 10);
    // console.log(id,arrayindex,elemindex)
    setImgToggle([...imgtoggle.slice(0, arrayindex), [...imgtoggle[arrayindex].slice(0,elemindex),!imgtoggle[arrayindex][elemindex],...imgtoggle[arrayindex].slice(elemindex+1)], ...imgtoggle.slice(arrayindex + 1)]); // Update descriptions at specific index
  };

  async function updateEmail(e){
    e.preventDefault()
    if(newmail !== ''){
      const emailInput = document.getElementById('newmail');
      // console.log(emailInput.validity.valid)
      if (emailInput.validity.valid) {
        if(newmail.split('@')[1] !== 'gmail.com'){
          handleOpenerr('Please enter a valid GMAIL address')
          return;
        }
        // console.log("valid email")
        const body = {email: newmail}
        const resp = await changemail(body);
        // console.log(resp)
      } else {
        handleOpenerr('Badly formatted email address')
      }
    } else {
      handleOpenerr('Email field is required')
    }
    setNewmail('')
  }

  async function getEmailList(e){
    e.preventDefault()
    const resp = await getallemails();
    // console.log(resp)
  }

  async function toggleDowntime(e){
    e.preventDefault()
    dispatch(setDown(!isdown))
    setIsdown(!isdown)
    const resp = await changedowntime();
    // console.log(resp)
  }

  async function handleEditProd(e,idx){
    
    e.preventDefault()
    let newtitle = titles[idx]
    let newdesc = descs[idx]
    let newprice = prices[idx]
    if(newtitle === "" || newdesc === "" ) {
      handleOpenerr("No field should be left empty");
      return;
    }
    if (newprice <= 0){
      handleOpenerr("Price must be greater than 0");
      return;
    }
    const _id = pids[idx]
    const data = {_id, title: newtitle, description: newdesc, price: newprice, imgdel: imgtoggle[idx], is_out_stock :stocktoggle[idx] , best_selling: bestselltoggle[idx]} 
    // console.log("index",idx)
    // console.log(data)
    let resp;
    if (files[idx] === undefined || files[idx] === null){ //normal edit product
      // console.log("no new img file",data)
      resp = await editproduct(data);
    }  else { //upload new photo also
      // console.log(file)
      if(files[idx].size>=2097152){ //file size comparison in bytes (should be <2MB)
        handleOpenerr("File size should be less than 2MB");
        return;
      }

    const formdata = {};
      for (const key in data) {
        if (key === 'imgdel') {
          formdata[key] = imgtoggle[idx].map(item => item); // Use map to create a new array
        } else {
          formdata[key] = data[key];
        }
      }
    formdata.file = files[idx];

      // const formdata2 = new FormData();
      // for (const key in data) {
      //   if(key === 'imgdel') { imgtoggle[idx].forEach(item => formdata2.append('imgdel[]', item)) }
      //   else   { formdata2.append(key, data[key]); }
      // }
      // formdata2.append('file',files[idx])
      // console.log(formdata)
      // console.log(formdata2)
      // console.log("new img file",data)

      resp = await editproductaddphoto(formdata);
    }
    // console.log(resp)
    if (resp.status !== 202) { 
      if (resp.code === "ERR_BAD_REQUEST") {  // display error message
      // console.log("setting error-----",resp.response.status); 
      if (resp.response.status === 404) {handleOpenerr("error 404 Server is offline");}
      if (resp.response.status === 500) {handleOpenerr("error 500 Internal Server Error");}      
    } 
   }

  }

  async function handleDelProd(e,idx){
    // console.log(products[idx])
    const _id = products[idx]._id;
    const data = {_id}
    const resp = await deleteproduct(data);
    // console.log(resp)
    if (resp.status !== 202) { 
      if (resp.code === "ERR_BAD_REQUEST") {  // display error message
      // console.log("setting error-----",resp.response.status); 
      if (resp.response.status === 404) {handleOpenerr("error 404 Server is offline");}
      if (resp.response.status === 500) {handleOpenerr("error 500 Internal Server Error");}      
    } 
   }

  }

  async function handleAddProd(e) {
    e.preventDefault(); 
    if(title === "" || desc === ""  || file === undefined || file === null ) {
      handleOpenerr("No field should be left empty");
      return;
    }

    if (price <= 0){
      handleOpenerr("Price must be greater than 0");
      return;
    }
    if(diffcatg === false && selected === '') {
      handleOpenerr("Did you set the category of the product correctly?");
      return;
    }
    if(diffcatg === true && newcatg === ''){
      handleOpenerr("Did you set the new category of the product correctly?");
      return;
    }
    // console.log(selected)
    // console.log(newcatg.trim().includes(' '))
    if(diffcatg === true && newcatg.trim().includes(' ')===true){
      handleOpenerr("There can only be one word categories");
      return;
    }
    let data;
    if(diffcatg === false){
      data = {file, title, description: desc, price, category: selected}
    } else {
      data = {file, title, description: desc, price, category: capitalize(newcatg.trim())}
    }
    // data.append('file',file)
    // data.append('title',title)
    // data.append('description',desc)
    // data.append('price',price)
    // data.append('category',selected)
    try  { 
      // console.log("handling add products-----",title,desc,price,selected);
      const response = await addproduct(data);
      // console.log("response status-----",response.status);
      if (response.status !== 201) { 
         if (response.code === "ERR_BAD_REQUEST") {  // display error message
        // console.log("setting error-----",response.response.status); 
        if (response.response.status === 404) {  handleOpenerr("error 404 Server is offline");      }
        if (response.response.status === 500) {  handleOpenerr("error 500 Internal Server Error");  }      
      } 
     } else {//reset the input fields
      setTitle('')
      setDesc('')
      setPrice(0) 
      window.location.reload();
      // const maindiv = document.getElementById('maindiv');
      // maindiv.scrollTo({bottom: 0, behavior: 'smooth', })
     }
    }
    catch(error) {
      // console.log(error)
      handleOpenerr("Add Product failed:", error); }
  };



  useEffect(() => {
    const fetchData = async () => {
      if(loc.state === null || loc.state === undefined ||loc.state.valid === false) {
        navigate('/',{replace:true})
        return;
      }
      // console.log("fetching all products")
      const resp = await fetchallproducts()
      // console.log(resp)
      if(resp.status === 200){
        setCategories(resp.data.categories)
        // console.log(resp.data.categories)
        setChunks(splitIntoChunks(resp.data.categories,5))
        setProducts(resp.data.products)
        setIsdown(resp.data.down === true)
        let ts = []
        let ps = []
        let ds = []
        let ids = []
        let instks = []
        let bsts = []
        let imgtoggles = []
        let filez = []
        let openarr = []
        for (var idx in resp.data.products){
          let p = resp.data.products[idx]
          ts.push(p.title)
          ps.push(p.price)
          ds.push(p.description)
          ids.push(p._id)
          instks.push(p.is_out_stock)
          bsts.push(p.best_selling)
          filez.push(undefined)
          openarr.push(false)
          let imgs = p.images
          let isimgdeleted = []
          for (var idx2 in imgs){
            let i = imgs[idx2]
            isimgdeleted.push(i['is_deleted'])
          }
          imgtoggles.push(isimgdeleted)
        }
        setDescs(ds)
        setPrices(ps)
        setTitles(ts)
        setPids(ids)
        setStockToggle(instks)
        setImgToggle(imgtoggles)
        setFiles(filez)
        setBestsellToggle(bsts)
        setIsOpen(openarr)
        setIsOpen2(openarr)
        setLoading(false)
      } else if (resp.code === "ERR_BAD_REQUEST") {  // display error message
        // console.log("setting error-----",resp.response.status); 
        if (resp.response.status === 404) {handleOpenerr("error 404 Server is offline");}
        if (resp.response.status === 500) {handleOpenerr("error 500 Internal Server Error");}      
      } 
    };
    fetchData();
  },[]); // Re-run effect only at page load


  function capitalize(string) {  return string.charAt(0).toUpperCase() + string.slice(1); }

  return (
    loading ? <Loading/> :
    <>
        <Helmet>
              <meta name='robots' content='noindex'/>
        </Helmet>
        <div className='fixed top-0 right-0 left-0 bottom-0 overflow-auto'>
        <div className='flex flex-col items-center mb-10'>
          <h2 className='text-2xl text-center font-bold mt-5'> Admin Section </h2>
          <span className='mt-10 text-xl'> The button below is used to switch off / bring back on a website for all users (except admin) </span>
          <Toggle aria-label="Toggle bold" className='border w-52 border-red-900 mt-5' onClick={toggleDowntime}>
                    { isdown ?  'Bring Website Back up' : 'Enable Website Downtime'}
          </Toggle>
          <span className='mt-10 text-xl ml-2 mr-2'> The input field below is used to change your <b>GMAIL</b> where you receive all website related emails (order placement emails, list of user emails, contact form submission emails ) </span>
          <div className="flex max-[900px]:flex-col gap-4 mt-5">
            <Input type="email" id="newmail" placeholder="Email" value = {newmail} onChange = { (e) => setNewmail(e.target.value)}  className='w-[700px] max-[900px]:w-9/12 2xl:text-2xl text-xl 2xl:p-6 p-3'/>
            <span className='p-4 2xl:text-xl text-lg max-[900px]:p-3 max-[900px]:w-9/12 max-[900px]:rounded-lg bg-blue-300 rounded-full cursor-pointer' onClick={updateEmail}>Change Email</span>
          </div>
          <span className='mt-5 2xl:text-xl text-lg'> The button below is used to get list all user emails to your email address </span>
          <span className=' mt-5 p-4 2xl:text-xl text-lg bg-blue-500 rounded-lg cursor-pointer' onClick={getEmailList}>Get Email List</span>
        </div>
        <div className='2xl:text-xl text-lg p-4 bg-yellow-200 w-full rounded-lg '>
          <span className='flex justify-center font-bold'>Notes</span> <br/>
          You can only add one picture while adding a product (however you can add more images and even remove images below in the Edit Products section)
          <br/> <br/>
          At successfull add, edit, or deletion of product, the page should reload itself so you can see the changes in the 'Edit Products' section
          <br/> <br/>
          When you change the price of a product to a lower price, it will automatically show in the 'On Sale' products at end of home page as well as the separate 'Sale' category page
          <br/> <br/>
          When you mark something as 'Out of Stock', it will show 'Sold' badge on image of the product, and then customers wont be able to add it to their carts anymore
          <br/> <br/>
          When you mark something as 'Best Selling product', it will show on 'Best Selling' right below 'Fresh Arrivals' section at home page
        </div>
        <div className='flex flex-col justify-center items-center bg-red-100 overflow-auto'>
          <h2 className='font-bold 2xl:text-2xl text-xl pt-8'> Add New Product </h2>
          <form onSubmit={handleAddProd} className='text-left mt-8'>
              <div  className='mb-2 flex max-[768px]:flex-col'>
                <label htmlFor="title" style={{ marginRight: 10 }} className='max-[768px]:text-center' >Title:</label>
                <input type="text" id="title" name="title" className='2xl:text-xl text-lg max-[768px]:w-8/12 max-[768px]:mx-auto' value = {title} onChange = { (e) => setTitle(e.target.value)}/>
              </div>
              <div className='mb-4 flex max-[768px]:flex-col'>
                <label htmlFor="price"  style={{ marginRight: 10 }} className='max-[768px]:text-center' >Price:</label>
                <input type="text" id="price" name="price" className='2xl:text-xl text-lg max-[768px]:w-8/12 max-[768px]:mx-auto' value = {price} onChange = { (e) => handleSetPrice(e)} />
              </div>
              <div  className='mb-4 flex max-[768px]:flex-col gap-1'>
                <label htmlFor="desc" className='mb-4 max-[768px]:text-center' >Description:</label>
                <textarea rows={6} cols={40} type="text" className='2xl:text-xl text-lg max-[768px]:w-8/12 max-[768px]:mx-auto' id="desc" name="desc" value = {desc} onChange = { (e) => setDesc(e.target.value)} />
              </div>
              <div onClick={()=>setdiffCatg(false)} className='my-2 cursor-pointer max-[900px]:w-11/12 mx-auto max-[900px]:p-3 flex justify-between bg-blue-200 p-6 2xl:text-2xl text-xl rounded-md'>
                <span> Use old Category </span>
                {diffcatg === false ?  <GrRadialSelected /> : '' }
              </div>
              {diffcatg === false && 
                  <div className="update-status max-[768px]:flex-col">
                  <label htmlFor="category" className='2xl:text-xl text-lg'  >Category:</label>  
                    <select id="select" className='2xl:text-xl text-lg' onChange={(e)=>{setSelected(e.target.value)}}>
                      {categories.map((c,idx)=>(
                        <option key={idx} value={c} >{c}</option>
                      ))}
                    </select>
                  </div>
               }
              <div onClick={()=>setdiffCatg(true)} className='my-2 cursor-pointer max-[900px]:w-11/12 mx-auto max-[900px]:p-3 flex justify-between bg-blue-200 p-6 2xl:text-2xl text-xl rounded-md'>
                <span>  Add a New Category </span>
                {diffcatg === true ?  <GrRadialSelected /> : '' }
              </div>
              {diffcatg===true && 
                <div className="update-status max-[768px]:flex-col">
                  <label htmlFor="category" className='2xl:text-xl text-lg'  >Category:</label>  
                  <input type="text" id="category" name="category" className='2xl:text-xl text-lg max-[768px]:w-8/12 max-[768px]:mx-auto' value = {newcatg} onChange = { (e) => setnewCatg(e.target.value)}/>
                </div>
               }
              <div className='fileinput  max-[768px]:text-base flex justify-center py-6'>
                {/* <Input id="newpic" type="file" onChange={(e) => handlesetFile(e)} /> */}
                <input type="file"  onChange={(e) => handlesetFile(e)}/>
              </div>
          </form>
          <button type="submit" className='btn text-2xl bg-white px-4 py-2 rounded-md mb-4' style={{ marginTop: 15 }} onClick={handleAddProd}>Submit</button>
        </div> 
        <h2 className='font-bold 2xl:text-2xl text-xl py-8 text-center bg-red-200'> Edit Products </h2>
        <div className="bg-red-400 flex flex-col">
          {chunks.map((categories,index)=>(
            <div key={index} className='p-4 flex justify-between'>
              {categories.map((c,idx)=>(
                <span key={idx} className={`2xl:text-xl text-sm  cursor-pointer hover:underline rounded-lg p-1 2xl:p-2 ${selectedcatgry === c ? "bg-slate-300" : ''}`} onClick={()=>setselectedcatgry(c)}>{c}</span>
              ))}
            </div>
          ))}
        </div>
        <div className='flex flex-col bg-red-200'>
        {products.length>0 && products.map((_prod, index) => (
          _prod.category === selectedcatgry && 
            <div key={index} className='w-inherit p-6'>
            <div className=' flex  max-[900px]:flex-col'>
                  <li className='list-none'>
                    <span className='text-xl text-wrap'>
                    <span className='2xl:text-2xl flex justify-between'>
                        Product {index+1} 
                        <AlertDialog open={isOpen2[index]}>
                          <AlertDialogTrigger>
                              <MdDelete className='cursor-pointer text-4xl hover:bg-red-400' onClick={() => handlesetIsOpen2(true,index)}/>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle  className='text-4xl'>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription  className='text-4xl'>
                                This action cannot be undone. This will permanently delete these product from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel  className='text-4xl' onClick={() => handlesetIsOpen2(false,index)}>Cancel</AlertDialogCancel>
                              <AlertDialogAction  className='text-4xl' onClick={(e)=>handleContinueClickDelete(e,index)} >Continue</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </span> 
                      <div className='my-4 flex max-[768px]:flex-col'>
                        <label htmlFor={`title-${index}`} style={{ marginRight: 10 }} >Title:</label>
                        <input id={`t-${index}`} value = {titles[index]} onChange={handleTitleChange}/>
                      </div>
                      <div className='mb-4 flex max-[768px]:flex-col '>
                        <label htmlFor={`price-${index}`}  style={{ marginRight: 10 }} >Price:</label>
                        <input id={`p-${index}`} value = {prices[index]} onChange={handlePriceChange}  />
                      </div>
                      <div  className='mb-4 '>
                        <label htmlFor={`desc-${index}`} className='flex justify-center mb-4' >Description:</label>
                        <textarea id={`d-${index}`} rows={6} cols={40} className=' max-[768px]:w-11/12' value = {descs[index]} onChange={handleDescChange}  />
                      </div> 
                      <div className='flex justify-between max-[768px]:mx-auto  max-[768px]:gap-2 max-[768px]:flex-col'>
                        <Toggle id={`s-${index}`} aria-label="Toggle bold" className='border border-red-900' onClick={handleStocktoggle}>
                          { stocktoggle[index] ?  'Mark As In Stock' : 'Mark as Out of Stock'}
                        </Toggle>
                        <Toggle id={`sell-${index}`} aria-label="Toggle bold" className='border border-red-900' onClick={handleBestselltoggle}>
                          { bestselltoggle[index] ?  'Mark As Normal Product' : 'Mark As Best Selling'}
                        </Toggle>
                      </div>
                      </span>
                    </li>
                    <ScrollArea className="mt-16 w-full whitespace-nowrap max-[900px]:outline ">
                <div className="flex w-max space-x-16 pl-10">
                  {_prod.images.map((img,idx) => (
                    <div className='flex flex-col items-center' key={index+idx}>
                      <img className='rounded-lg' src={img.imagestring[0] === 'f' ? `images/${img.imagestring}` : `${img.imagestring}`} width={200} height={100} alt="imgfile"/>
                      <Toggle id={`img-${index}-${idx}`} aria-label="Toggle bold" className='border border-red-900 mt-10' onClick={(e)=>handleImgtoggle(e)}>
                        { imgtoggle[index][idx] ?  'Restore Image' : 'Remove Image'}
                      </Toggle>
                    </div>
                  ))}
                  <div className='fileinput py-6 text-lg max-[768px]:text-base'>
                    <span>
                      <input id={`f-${index}`} type="file" onChange={(e) => handlesetFiles(e)}/> 
                      {   files[index] ? <button id={`fbtn-${index}`} className='bg-white px-2 rounded-md hover:bg-red-400' onClick={(e)=> handleremoveFiles(e)}>Remove file</button> 
                          : <button className='bg-white px-2 rounded-md hover:cursor-no-drop' disabled >Remove file</button> 
                      }
                    </span>
                  </div>
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
              </div>
              <div className='flex justify-center py-8 '>
                  <AlertDialog open={isOpen[index]}>
                  <AlertDialogTrigger>
                    <div className='p-4  max-[768px]:p-2 bg-white rounded-lg flex 2xl:text-2xl text-xl ' onClick={() => handlesetIsOpen(true,index)} >  
                      Save Changes
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle  className='text-4xl'>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription  className='text-4xl'>
                        This action cannot be undone. This will permanently make these changes to our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel  className='text-2xl' onClick={() => handlesetIsOpen(false,index)}>Cancel</AlertDialogCancel>
                      <AlertDialogAction  className='text-2xl' onClick={(e)=>handleContinueClickSaveChanges(e,index)} >Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>     
            </div>
          
        ))}
        </div>
        <ErrorMessage  error={error} setError={setError} openerr={openerr} setOpenerr={setOpenerr} />
        </div>
    </>
  )
}

export default Profile;