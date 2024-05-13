import {useEffect, useState} from 'react';
import { MdDelete } from "react-icons/md";
import { Toggle } from "@/components/ui/toggle"
import { ScrollArea,ScrollBar } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from "@/components/ui/alert-dialog"
import {  addproduct, fetchallproducts, editproduct, editproductaddphoto, deleteproduct, getallemails, changemail, changedowntime} from '../../api/internal';
import './profile.css'


function Profile() {
  // const username = useSelector((state) => state.user.username);
  // const navigate = useNavigate();

  const [file, setFile] = useState();
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
  const [selected, setSelected] = useState("Earrings");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState([]);
  const [isOpen2, setIsOpen2] = useState([]);
  const allowedFileExtensions = ['jpg','jpeg','png','bmp','gif','tiff']

  const [isdown, setIsdown] = useState(false)
  const [newmail, setNewmail] = useState('')


  const handleContinueClickSaveChanges = async (e,idx) => {
    console.log(idx)
    await handleEditProd(e,idx);
    handlesetIsOpen(false,idx); // Close the dialog manually
  };

  const handleContinueClickDelete = async (e,idx) => {
    await handleDelProd(e,idx);
    handlesetIsOpen2(false,idx); // Close the dialog manually
  };

  function handlesetIsOpen(flag,idx){
    setIsOpen([...isOpen.slice(0, idx), !isOpen[idx], ...isOpen.slice(idx + 1)]); 
  }

  function handlesetIsOpen2(flag,idx){
    setIsOpen2([...isOpen2.slice(0, idx), !isOpen2[idx], ...isOpen2.slice(idx + 1)]); 
  }


  const handlesetFile = (e) => {
    e.preventDefault()
    setFile(e.target.files[0])
  }

  const handlesetFiles = (e) => {
    e.preventDefault()
    const { id } = e.target;
    const index = parseInt(id.split('-')[1], 10);
    setFiles([...files.slice(0, index), e.target.files[0], ...files.slice(index + 1)]); 
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
    } else {
      setError("Price must be an integer");
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
    } else {
      setError("Price must be an integer");
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
        console.log("valid email")
        const body = {email: newmail}
        const resp = await changemail(body);
        console.log(resp)
      } else {
        console.log("invalid email")
      }
    }
    setNewmail('')
  }

  async function getEmailList(e){
    e.preventDefault()
    const resp = await getallemails();
    console.log(resp)
  }

  async function toggleDowntime(e){
    e.preventDefault()
    setIsdown(!isdown)
    const resp = await changedowntime();
    console.log(resp)
  }

  async function handleEditProd(e,idx){
    //show alert dialog
    e.preventDefault()
    let newtitle = titles[idx]
    let newdesc = descs[idx]
    let newprice = prices[idx]
    if(newtitle === "" || newdesc === "" ) {
      setError("No field should be left empty");
      return;
    }
    if (newprice <= 0){
      setError("Price must be greater than 0");
      return;
    }
    const _id = pids[idx]
    const data = {_id, title: newtitle, description: newdesc, price: newprice, imgdel: imgtoggle[idx], is_out_stock :stocktoggle[idx] , best_selling: bestselltoggle[idx]} 
    console.log("index",idx)
    console.log(data)
    let resp;
    if (files[idx] == undefined){ //normal edit product
      console.log("no new img file",data)
      resp = await editproduct(data);
    }  else { //upload new photo also
      const formdata = new FormData();
      for (const key in data) {
        if(key === 'imgdel') { imgtoggle[idx].forEach(item => formdata.append('imgdel[]', item)) }
        else   { formdata.append(key, data[key]); }
      }
      formdata.append('file',files[idx])
      console.log("new img file",data)
      resp = await editproductaddphoto(formdata);
    }
    console.log(resp)
    if (resp.status !== 202) { 
      if (resp.code === "ERR_BAD_REQUEST") {  // display error message
      console.log("setting error-----",resp.response.status); 
      if (resp.response.status === 404) {setError("error 404 Server is offline");}
      if (resp.response.status === 500) {setError("error 500 Internal Server Error");}      
    } 
   }

  }

  async function handleDelProd(e,idx){
    //show alert dialog 
    console.log(products[idx])
    const _id = products[idx]._id;
    const data = {_id}
    const resp = await deleteproduct(data);
    console.log(resp)
    if (resp.status !== 202) { 
      if (resp.code === "ERR_BAD_REQUEST") {  // display error message
      console.log("setting error-----",resp.response.status); 
      if (resp.response.status === 404) {setError("error 404 Server is offline");}
      if (resp.response.status === 500) {setError("error 500 Internal Server Error");}      
    } 
   }

  }

  async function handleAddProd(e) {
    e.preventDefault(); 
    if(title === "" || desc === ""  || file === undefined ) {
      setError("No field should be left empty");
      return;
    }
    if (price <= 0){
      setError("Price must be greater than 0");
      return;
    }
    const fileExtension = file.name.split('.').pop(); // Extract extension
    console.log("File Extension:", fileExtension);
    if(allowedFileExtensions.includes(fileExtension) === false){
      setError('File extension not allowed')
      // setError('Allowed file extensions are .jpg, .jpeg, .png, .bmp, .gif, .tiff')
      return;
    }
    const data = new FormData();
    data.append('file',file)
    data.append('title',title)
    data.append('description',desc)
    data.append('price',price)
    data.append('category',selected)
    try  { 
      console.log("handling add products-----",title,desc,price,selected);
      const response = await addproduct(data);
      console.log("response status-----",response.status);
      if (response.status !== 201) { 
         if (response.code === "ERR_BAD_REQUEST") {  // display error message
        console.log("setting error-----",response.response.status); 
        if (response.response.status === 404) {setError("error 404 Server is offline");}
        if (response.response.status === 500) {setError("error 500 Internal Server Error");}      
      } 
     } else {//reset the input fields
      setTitle('')
      setDesc('')
      setPrice(0) 
     }
    }
    catch(error) { console.error("Add Product failed:", error); }
  };



  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching all products")
      const resp = await fetchallproducts()
      console.log(resp)
      if(resp.status === 200){
        setProducts(resp.data.products)
        setIsdown(resp.data.down)
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
      } else if (resp.code === "ERR_BAD_REQUEST") {  // display error message
        console.log("setting error-----",resp.response.status); 
        // if (resp.response.status === 404) {setError("error 404 Server is offline");}
        // if (resp.response.status === 500) {setError("error 500 Internal Server Error");}      
      } 
    };
    fetchData();
  },[]); // Re-run effect only at page load

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
      return () => clearTimeout(timeoutId); // Cleanup on component unmount
    }
  }, [error]); // Re-run effect only when error changes

  return (
    <div className='fixed top-0 right-0 left-0 bottom-0 overflow-auto'>
    <div className='flex flex-col items-center mb-10'>
      <h2 className='text-2xl text-center font-bold mt-5'> Admin Section </h2>
      <span className='mt-10 text-xl'> The button below is used to switch off / bring back on a website for all users (except admin) </span>
      <Toggle aria-label="Toggle bold" className='border w-52 border-red-900 mt-5' onClick={toggleDowntime}>
                { isdown ?  'Bring Website Back up' : 'Enable Website Downtime'}
      </Toggle>
      <span className='mt-10 text-xl'> The input field below is used to change your <b>GMAIL</b> where you receive all website related emails (order placement emails, list of user emails, contact form submission emails ) </span>
      <div className="flex gap-4 mt-5">
        <Input type="email" id="newmail" placeholder="Email" value = {newmail} onChange = { (e) => setNewmail(e.target.value)}  className='w-[700px] text-3xl p-7'/>
        <span className='p-4 text-2xl bg-blue-300 rounded-full cursor-pointer' onClick={updateEmail}>Change Email</span>
      </div>
      <span className='mt-5 text-xl'> The button below is used to get list all user emails to your email address </span>
      <span className=' mt-5 p-4 text-2xl bg-blue-500 rounded-lg cursor-pointer' onClick={getEmailList}>Get Email List</span>
    </div>
    <div className='absolute right-0 top-70 text-3xl p-4 bg-yellow-200 w-[400px] rounded-lg '>
      Note: You can only add one picture while adding a product (however you can add more images and even remove images below in the Edit Products section)
    </div>
    <div className='flex flex-col justify-center items-center bg-red-100'>
      <h2 className='font-bold text-3xl pt-8'> Add New Product </h2>
      <form onSubmit={handleAddProd} className='text-left mt-8'>
          <div style={{ marginBottom: 15 }} className=''>
            <label htmlFor="title" style={{ marginRight: 10 }} >Title:</label>
            <input type="text" id="title" name="title"  value = {title} onChange = { (e) => setTitle(e.target.value)} />
          </div>
          <div className='mb-4 '>
            <label htmlFor="price"  style={{ marginRight: 10 }} >Price:</label>
            <input type="text" id="price" name="price" value = {price} onChange = { (e) => handleSetPrice(e)} />
          </div>
          <div  className='mb-4 '>
            <label htmlFor="desc" className='flex justify-center mb-4' >Description:</label>
            <textarea rows={6} cols={40} type="text" id="desc" name="desc" value = {desc} onChange = { (e) => setDesc(e.target.value)} />
          </div>
          <div className="update-status">
          <label htmlFor="category"  >Category:</label>  
              <select id="select" onChange={(e)=>{setSelected(e.target.value)}}>
                  <option value="Earrings" >Earrings</option>
                  <option value="Rings" >Rings</option>
                  <option value="Necklace" >Necklace</option>
                  <option value="Bracelet" >Bracelet</option>
                  <option value="Beauty" >Beauty</option>
              </select>
          </div>
          <div className='fileinput flex justify-center py-6'>
            <input type="file" onChange={(e) => handlesetFile(e)}/>
          </div>
      </form>
      <button type="submit" className='btn bg-white px-4 py-2 rounded-md mb-4' style={{ marginTop: 15 }} onClick={handleAddProd}>Submit</button>
    </div> 
    <h2 className='font-bold text-3xl pt-8 text-center bg-red-200'> Edit Products </h2>
    {/* <div className='absolute right-0 top-50 text-3xl p-4 bg-yellow-200 w-[400px] rounded-lg '>
      Note: While editing a product, changes will be made permanently when u click on 'Save Chnages' below in the Edit Products section
    </div> */}
    <div className='flex flex-col bg-red-200'>
    {products.length>0 && products.map((_prod, index) => (
        <div key={index} className='w-inherit p-6'>
        <div className=' flex'>
              <li className='list-none'>
                <span className='text-xl text-wrap'>
                 <span className='text-3xl flex justify-between'>
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
                  <div className='my-4'>
                    <label htmlFor={`title-${index}`} style={{ marginRight: 10 }} >Title:</label>
                    <input id={`t-${index}`} value = {titles[index]} onChange={handleTitleChange}/>
                  </div>
                  <div className='mb-4 '>
                    <label htmlFor={`price-${index}`}  style={{ marginRight: 10 }} >Price:</label>
                    <input id={`p-${index}`} value = {prices[index]} onChange={handlePriceChange}  />
                  </div>
                  <div  className='mb-4 '>
                    <label htmlFor={`desc-${index}`} className='flex justify-center mb-4' >Description:</label>
                    <textarea id={`d-${index}`} rows={6} cols={40}  value = {descs[index]} onChange={handleDescChange}  />
                  </div> 
                  <div className='flex justify-between'>
                    <Toggle id={`s-${index}`} aria-label="Toggle bold" className='border border-red-900' onClick={handleStocktoggle}>
                      { stocktoggle[index] ?  'Mark As In Stock' : 'Mark as Out of Stock'}
                    </Toggle>
                    <Toggle id={`sell-${index}`} aria-label="Toggle bold" className='border border-red-900' onClick={handleBestselltoggle}>
                      { bestselltoggle[index] ?  'Mark As Normal Product' : 'Mark As Best Selling'}
                    </Toggle>
                  </div>
                  </span>
                </li>
                <ScrollArea className="mt-16 w-full whitespace-nowrap">
            <div className="flex w-max space-x-16 pl-10">
              {_prod.images.map((img,idx) => (
                <div className='flex flex-col items-center' key={index+idx}>
                  <img className='rounded-lg' src={`http://localhost:3000/images/${img['imagestring']}`} width={200} height={100} alt="imgfile"/>
                  <Toggle id={`img-${index}-${idx}`} aria-label="Toggle bold" className='border border-red-900 mt-10' onClick={(e)=>handleImgtoggle(e)}>
                    { imgtoggle[index][idx] ?  'Restore Image' : 'Remove Image'}
                  </Toggle>
                </div>
              ))}
              <div className='fileinput py-6'>
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
                <div className='p-4 bg-white rounded-lg flex text-3xl' onClick={() => handlesetIsOpen(true,index)} >  
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
    <span>{error !== "" ? <p style = {{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize:35, color:"red"}}>{error}</p> : ""}</span>
    </div>
  )
}

export default Profile;