import {useEffect, useState} from 'react';
import { Toggle } from "@/components/ui/toggle"
import { ScrollArea,ScrollBar } from "@/components/ui/scroll-area"
import { MdDelete } from "react-icons/md";
import {  addproduct, fetchproductbycategory} from '../../api/internal';
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
  const [imgtoggle, setImgToggle] = useState([]);
  const [selected, setSelected] = useState("Processing");
  const [error, setError] = useState("");
  const allowedFileExtensions = ['jpg','jpeg','png','bmp','gif','tiff']


  const handlesetFile = (e) => {
    e.preventDefault()
    setFile(e.target.files[0])
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

  const handleImgtoggle = (event) => {
    // const { id } = event.target;
    // const index = parseInt(id.split('-')[1], 10);
    // setImgToggle([...stocktoggle.slice(0, index), !stocktoggle[index], ...stocktoggle.slice(index + 1)]); // Update descriptions at specific index
  };

  async function handleEditProd(e,idx){
    //show alert dialog
    e.preventDefault()
    // pids[idx], titles[idx], descs[idx], prices[idx], stocktoggle[idx] --> find by id to update all these

  }

  async function handleDelProd(e,idx){
    //show alert dialog 
    const id = products[idx]._id;
    console.log(products[idx])
  }

  async function handleAddProd(e) {
    e.preventDefault(); 
    if(title === "" || desc === ""  || file === undefined ) {
      setError("No field should be left empty");
      return;
    }
    if (price === 0){
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
      console.log("response-----",response);
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
      const data = {category:'Ready'}
      console.log("fetching all products")
      const resp = await fetchproductbycategory(data)
      console.log(resp)
      if(resp.status === 200){
        setProducts(resp.data.products)
        let ts = []
        let ps = []
        let ds = []
        let ids = []
        let instks = []
        for (var idx in resp.data.products){
          let p = resp.data.products[idx]
          ts.push(p.title)
          ps.push(p.price)
          ds.push(p.description)
          ids.push(p._id)
          instks.push(p.is_out_stock)
        }
        setDescs(ds)
        setPrices(ps)
        setTitles(ts)
        setPids(ids)
        setStockToggle(instks)
      } else if (response.code === "ERR_BAD_REQUEST") {  // display error message
        console.log("setting error-----",response.response.status); 
        if (response.response.status === 404) {setError("error 404 Server is offline");}
        if (response.response.status === 500) {setError("error 500 Internal Server Error");}      
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
    <div className='absolute right-0 top-0 text-3xl p-4 bg-yellow-200 w-[400px] rounded-lg '>
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
                  <option value="Processing" >Processing</option>
                  <option value="Preparing" >Preparing</option>
                  <option value="Ready" >Ready</option>
                  <option value="Delivered" >Delivered</option>
                  <option value="Category5" >Category5</option>
              </select>
          </div>
          <div className='fileinput flex justify-center py-6'>
            <input type="file" onChange={(e) => handlesetFile(e)}/>
          </div>
      </form>
      <button type="submit" className='bg-white px-4 py-2 rounded-md mb-4' style={{ marginTop: 15 }} onClick={handleAddProd}>Submit</button>
    </div> 
    <h2 className='font-bold text-3xl pt-8 text-center bg-red-200'> Edit Products </h2>
    <div className='flex flex-col bg-red-200'>
    {products.length>0 && products.map((_prod, index) => (
        <div key={index} className='w-inherit p-6'>
        <div className=' flex'>
              <li key={index} className='list-none'>
                <span className='text-xl text-wrap'>
                 <span className='text-3xl flex justify-between'>
                    Product {index+1} 
                    <MdDelete className='cursor-pointer text-4xl' onClick={(e) => handleDelProd(e,index)}/>
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
                  <Toggle id={`s-${index}`} aria-label="Toggle bold" className='border border-red-900' onClick={handleStocktoggle}>
                    { stocktoggle[index] ?  'Mark As In Stock' : 'Mark as Out of Stock'}
                  </Toggle>
                  </span>
                </li>
                <ScrollArea className="mt-16 w-full whitespace-nowrap">
            <div className="flex w-max space-x-16 pl-10">
              {_prod.images.map((img,idx) => (
               <> 
                <div className='flex flex-col items-center'>
                  <img key={idx} className='rounded-lg' src={`http://localhost:3000/images/${img}`} width={200} height={100} alt="imgfile"/>
                  <Toggle id={`img-${index}-${idx}`} aria-label="Toggle bold" className='border border-red-900 mt-10' onClick={handleImgtoggle}>
                    { imgtoggle[index] ?  'Keep Image' : 'Remove Image'}
                  </Toggle>
                </div><div className='flex flex-col items-center'>
                  <img key={idx} className='rounded-lg' src={`http://localhost:3000/images/${img}`} width={200} height={100} alt="imgfile"/>
                  <Toggle id={`img-${index}-${idx}`} aria-label="Toggle bold" className='border border-red-900 mt-10' onClick={handleImgtoggle}>
                    { imgtoggle[index] ?  'Keep Image' : 'Remove Image'}
                  </Toggle>
                </div><div className='flex flex-col items-center'>
                  <img key={idx} className='rounded-lg' src={`http://localhost:3000/images/${img}`} width={200} height={100} alt="imgfile"/>
                  <Toggle id={`img-${index}-${idx}`} aria-label="Toggle bold" className='border border-red-900 mt-10' onClick={handleImgtoggle}>
                    { imgtoggle[index] ?  'Keep Image' : 'Remove Image'}
                  </Toggle>
                </div><div className='flex flex-col items-center'>
                  <img key={idx} className='rounded-lg' src={`http://localhost:3000/images/${img}`} width={200} height={100} alt="imgfile"/>
                  <Toggle id={`img-${index}-${idx}`} aria-label="Toggle bold" className='border border-red-900 mt-10' onClick={handleImgtoggle}>
                    { imgtoggle[index] ?  'Keep Image' : 'Remove Image'}
                  </Toggle>
                </div><div className='flex flex-col items-center'>
                  <img key={idx} className='rounded-lg' src={`http://localhost:3000/images/${img}`} width={200} height={100} alt="imgfile"/>
                  <Toggle id={`img-${index}-${idx}`} aria-label="Toggle bold" className='border border-red-900 mt-10' onClick={handleImgtoggle}>
                    { imgtoggle[index] ?  'Keep Image' : 'Remove Image'}
                  </Toggle>
                </div><div className='flex flex-col items-center'>
                  <img key={idx} className='rounded-lg' src={`http://localhost:3000/images/${img}`} width={200} height={100} alt="imgfile"/>
                  <Toggle id={`img-${index}-${idx}`} aria-label="Toggle bold" className='border border-red-900 mt-10' onClick={handleImgtoggle}>
                    { imgtoggle[index] ?  'Keep Image' : 'Remove Image'}
                  </Toggle>
                </div>
                <div className='fileinput flex justify-center py-6'>
                  <input type="file" onChange={(e) => handlesetFile(e)}/>
                </div>
                </>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          </div>
          <div className='flex justify-center py-8 '>
            <button className='p-4 bg-white rounded-lg flex text-3xl' onClick={(e)=>handleEditProd(e,index)}>  Save Changes </button>
          </div>
        </div>
    ))}
    </div>
    <span>{error !== "" ? <p style = {{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize:35, color:"red"}}>{error}</p> : ""}</span>
    </div>
  )
}

export default Profile;