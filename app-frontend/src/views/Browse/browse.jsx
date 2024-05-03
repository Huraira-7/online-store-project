import React, {useEffect, useState} from 'react'
import Navbar from '../../comps/Navbar/Navbar'
import { getongoingtrades } from '../../api/internal';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Browse() {

  const username = useSelector((state) => state.user.username);
  const [searchQuery, setSearchQuery] = useState('');
  const [trades, setTrades] = useState([]);
  const [filteredTrades, setFilteredTrades] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSearch(e) {
    e.preventDefault();
  }

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching ongoing trades-----");
      const data = {username};
      const response = await getongoingtrades(data);
      console.log("response -----",response);
      if (response.status === 200) {
        setTrades(response.data.trades);
        setFilteredTrades(response.data.trades);
      } else if (response.code === "ERR_BAD_REQUEST") {  // display error message
        console.log("setting error-----",response.response.status); 
        if (response.response.status === 404) {setError("error 404 Server is offline");}
        if (response.response.status === 500) {setError("error 500 Internal Server Error");}      
      } 
    };
    fetchData();
  },[]);

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
      return () => clearTimeout(timeoutId); // Cleanup on component unmount
    }
  }, [error]); // Re-run effect only when error changes

  useEffect(() => {
    if(trades.length>0){
      const filtered = trades.filter((trade) => trade.title.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredTrades(filtered);
    }
  }, [searchQuery, trades]);   // Filter trades based on search query change
  

  return (
    <div>
      <Navbar />
      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ border: 'none', borderBottom: '1px solid gray', padding: '10px', width: '70%', fontSize:35 }}
        />
        <button type="submit" style={{ border: 'none', background: 'none', cursor: 'pointer' }} onClick={handleSearch}>
          {/* <img src="search-icon.png" alt="Search" /> */}
          <h1 style={{marginLeft:20, marginTop:25}}> Search </h1>
        </button>
      </div>
      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
      {trades.length === 0 && <h2> No Open Trades To Browse For Currently ... </h2>}
      {trades.length !== 0 && filteredTrades.length === 0 && <h2> No Open Trade Matches Your Query ... </h2>}
       <ul style={{ listStyleType: 'none' }}>
          {filteredTrades.map((_trade, index) => (
            <div>
              <li key={index} style = {{ cursor: 'pointer'}} onClick={() =>  navigate('/trade', { state:{trade: btoa(JSON.stringify(_trade))} })}>
                <h3> Trade {index+1}</h3>
                Title: {_trade.title} <br />
                Description : {_trade.description} <br />
              </li>
            </div>
          ))}
       </ul>
      </div>
      <span>{error !== "" ? <p style = {{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize:35, color:"red"}}>{error}</p> : ""}</span>
    </div>
  )
}

export default Browse;