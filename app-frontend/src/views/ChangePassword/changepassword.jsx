import React,{useState,useEffect} from 'react'
import Navbar from '../../comps/Navbar/Navbar';
import { useSelector } from "react-redux"; 
import { useNavigate } from 'react-router-dom';
import { changepassword } from '../../api/internal';

function Changepassword() {
  const username = useSelector((state) => state.user.username);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
      return () => clearTimeout(timeoutId); // Cleanup on component unmount
    }
  }, [error]); // Re-run effect only when error changes

  async function handleChangePassword(e) {
    e.preventDefault();
    if(password === "") {
      setError("No field should be left empty");
      return;
    }
    const data = { username, newpassword: password };
    try{
      console.log("handling change password-----",data);
      const response = await changepassword(data);
      console.log("response-----",response);

      if (response.status === 202) { 
          navigate("/profile", { replace: true });
      }  else if (response.code === "ERR_BAD_REQUEST") {  // display error message
          console.log("setting error-----",response.response.status); 
          if (response.response.status === 404) {setError("error 404 Server is offline");}
          if (response.response.status === 500) {setError("error 500 Internal Server Error");}      
      } 
    } catch(e) {console.error("Change password failed:", error);}
  }

  return (
    <div>
      <Navbar/>
      <form onSubmit={handleChangePassword} style={{ textAlign: 'center' }}>
          <h4>Change Password</h4>
          <div>
            <label htmlFor="password"  style={{ marginRight: 10 }} >New Password:</label>
            <input type="password" id="password" name="password" onChange = { (e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" style={{ marginTop: 15 }}>Change</button>
      </form>
      <span>{error !== "" ? <p style = {{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize:35, color:"red"}}>{error}</p> : ""}</span>
    </div>
  )
}

export default Changepassword;