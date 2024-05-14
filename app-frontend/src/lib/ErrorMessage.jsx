import {useState} from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { MdError } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

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
            severity="error"
            variant="filled"
            icon={<MdError  fontSize={35}/>}
            sx={{ fontSize:'30px'  }}
            action={ <AiOutlineClose  className='cursor-pointer m-auto ml-8 text-4xl' onClick={()=>setOpenerr(false)}/>}
            >
            {error}
            </Alert>
        </Snackbar>
    </>
  )
}

export default ErrorMessage

