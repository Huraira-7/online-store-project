import {useState} from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { MdError } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import './font.css'

function ErrorMessage({setOpenerr,error,setError,openerr}) {
    const handleCloseerr = (event, reason) => {
      if (reason === 'clickaway') {  return; }
      setOpenerr(false);
      setError('')
    };
  
  return (
    <>
        <Snackbar open={openerr}   className='w-auto text-center' autoHideDuration={6000} onClose={handleCloseerr}>
            <Alert onClose={handleCloseerr}
              // color='s' //in order to override color in Snackbar ^
              className='max-[800px]:responsive-font min-[801px]:resp-font'
              severity="error"
              variant="filled"
              icon={<MdError  fontSize={35}/>}
              action={ <AiOutlineClose  className='cursor-pointer m-auto ml-8 text-4xl max-[800px]:text-xl' onClick={()=>setOpenerr(false)}/>}
            >
             <span className='responsive-font'>{error}</span>
            </Alert>
        </Snackbar>
    </>
  )
}

export default ErrorMessage

