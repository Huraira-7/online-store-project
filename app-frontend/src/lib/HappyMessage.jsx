import {useEffect, useState} from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AiOutlineClose } from "react-icons/ai";
import './font.css'

function HappyMessage({setOpenmsg,msg,setMsg,openmsg}) {
    const handleClosemsg = (event, reason) => {
      if (reason === 'clickaway') {  return; }
      setOpenmsg(false);
      setMsg('')
    };
    
  
  return (
    <>
        <Snackbar open={openmsg}   className='w-auto text-center' autoHideDuration={6000} onClose={handleClosemsg}>
            <Alert onClose={handleClosemsg}
                // color='s' //in order to override color in Snackbar ^
                severity="success"
                variant="filled"
                action={ <AiOutlineClose  className='cursor-pointer m-auto ml-8 text-4xl max-[800px]:text-xl' onClick={()=>setOpenmsg(false)}/>}
            >
            <span className='responsive-font'>{msg}</span>
            </Alert>
        </Snackbar>
    </>
  )
}

export default HappyMessage

