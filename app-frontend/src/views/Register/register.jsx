import React, { useState, useEffect } from 'react';
import { register } from '../../api/internal';
import { setUser } from "../../store/userSlice";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
      return () => clearTimeout(timeoutId); // Cleanup on component unmount
    }
  }, [error]); // Re-run effect only when error changes

  function handleSetItems (e){
    const value = e.target.value;
    if (!isNaN(parseInt(value))) {
      // setState(parseInt(value));
    } else {
      setError("Number of items owned must be an integer");
    }   
  }

  async function handleRegister (e) {
    e.preventDefault(); 
    if(username === "" || password === "" || confirmPassword === "" ) {
      setError("No field should be left empty");
      return;
    }
    const data = { username, password , confirmPassword};
    try  { 
      console.log("handling register-----",data);
      const response = await register(data);
      console.log("response-----",response);

      if (response.status === 201) { // set User
          const user = {
              _id: response.data.user._id,
              username: response.data.user.username,
              auth: response.data.auth,
          };

          dispatch(setUser(user));
          navigate("/home", { replace: true });
      }  else if (response.code === "ERR_BAD_REQUEST") {  // display error message
          console.log("setting error-----",response.response.status); 
          if (response.response.status === 404) {setError("error 404 Server is offline");}
          if (response.response.status === 408) {setError("error 408 Passwords do not match");}
          if (response.response.status === 409) {setError("error 409 Username is not available");}
          if (response.response.status === 500) {setError("error 500 Internal Server Error");}      
      } 
    }
    catch(error) { console.error("Register failed:", error); }
  };

  return (
    <div>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
      <form onSubmit={handleRegister} style={{ textAlign: 'center' }}>
        <h4>Register</h4>
        <div style={{ marginBottom: 15 }}>
          <label htmlFor="username"  style={{ marginRight: 10 }} >Username:</label>
          <input type="text" id="username" name="username" value={username} onChange = { (e) => setUsername(e.target.value)} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label htmlFor="password"  style={{ marginRight: 10 }} >Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={ (e) => setPassword(e.target.value)} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label htmlFor="confirmPassword"  style={{ marginRight: 10 }} >Confirm Password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={ (e) => setConfirmPassword(e.target.value)} />
        </div>
        <button type="submit" style={{ marginTop: 15 }}>Register</button>
        <p style={{ marginTop: 10 }}>Already have an account?<a href="/">Login</a></p>
      </form>
    </div>
    <span>{error !== "" ? <p style = {{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize:35, color:"red"}}>{error}</p> : ""}</span>
    </div>
  )
}

export default Register
