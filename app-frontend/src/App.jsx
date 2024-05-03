//imports
import {BrowserRouter, Route, Routes } from 'react-router-dom'; //npm i
import { useSelector } from "react-redux";                      //npm i
// import { useEffect } from 'react';

//import components
import Error from './comps/Error/error';
import Protected from './comps/Protected/Protected';

//import pages
import Login from './views/Login/login';
import Register from './views/Register/register';
import Home from './views/Home/home';
import Browse from './views/Browse/browse';
import Profile from './views/Profile/profile';
import ChangePassword from './views/ChangePassword/changepassword';



function App() {
 
    const isAuth = useSelector((state) => state.user.auth); 
    console.log("auth=",isAuth);

    return (
      <BrowserRouter>
          <Routes>
              <Route path="/"           element={ <Home/> }        />   
              <Route path="/login"   element={ <Login/>   }   />   
              <Route path="/register"   element={ <Register />  }   /> 
              <Route path="/changepassword"       
                     element={  Protected(isAuth,<ChangePassword/>)   }    
              /> 
              <Route path="/profile"      
                    element = { <Profile/>} 
                    //  element={  Protected(isAuth,<Profile/>)  }     
              />
              <Route path="/browse"       
                     element={  Protected(isAuth,<Browse/>)  }    
              />
              <Route path="*"  element={ <Error />  } />
          </Routes>
        </BrowserRouter>
    );
  
}



export default App
