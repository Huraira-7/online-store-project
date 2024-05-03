import React, { useState, useEffect } from 'react';
import { login } from '../../api/internal';
import { setUser } from "../../store/userSlice";
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const state = useSelector((state) => state.user); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    //console.log("persistent state ... ",state); 
    if (state.auth) { navigate("/home", { replace: true });  }
  }, []); // Re-run effect at page load

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
      return () => clearTimeout(timeoutId); // Cleanup on component unmount
    }
  }, [error]); // Re-run effect only when error changes

  async function handleLogin(e) {
    e.preventDefault(); 
    if(username === "" || password === "") {
      setError("No field should be left empty");
      return;
    }
    const data = { username, password };
    try  { 
      console.log("handling login-----",data);
      const response = await addproduct(data);
      console.log("response-----",response);

      if (response.status === 201) { // set User
          // const user = {
          //     _id: response.data.user._id,
          //     username: response.data.user.username,
          //     auth: response.data.auth
          // };
          // dispatch(setUser(user));
          // navigate("/home", { replace: true });
      }  else if (response.code === "ERR_BAD_REQUEST") {  // display error message
          console.log("setting error-----",response.response.status); 
          if (response.response.status === 404) {setError("error 404 Server is offline");}
          if (response.response.status === 500) {setError("error 500 Internal Server Error");}      
      } 
    }
    catch(error) { console.error("Add product failed:", error); }
  };

  return (
    <div>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
      <form onSubmit={handleLogin} style={{ textAlign: 'center' }}>
          <h4>Login</h4>
          <div style={{ marginBottom: 15 }}>
            <label htmlFor="username" style={{ marginRight: 10 }} >Username:</label>
            <input type="text" id="username" name="username" onChange = { (e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password"  style={{ marginRight: 10 }} >Password:</label>
            <input type="password" id="password" name="password" onChange = { (e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" style={{ marginTop: 15 }}>Login</button>
          <p style={{ marginTop: 10 }}> Don't have an account? <a href="/register">Register now</a></p>
      </form>
    </div>
    <span>{error !== "" ? <p style = {{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize:35, color:"red"}}>{error}</p> : ""}</span>
    </div>
    
  )
}

export default Login