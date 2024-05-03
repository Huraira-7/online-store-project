import axios from "axios";

const api = axios.create({
  baseURL:  'http://localhost:3000', //process.env.VITE_APP_INTERNAL_API_PATH,
  headers: {
    "Content-Type": "application/json",
  },
});

//basic user authentication APIS  ------------------------------------------------------------------------

export const login = async (data) => {
  let response;

  try { response = await api.post("/login", data); }
  catch (error) { return error; }

  return response;
};

export const register = async (data) => {
  let response;

  try {  response = await api.post("/register", data); } 
  catch (error) {  return error; }

  return response;
};

export const logout = async () => {
  let response;
  try { response = await api.post("/logout"); } 
  catch (error) { return error; }

  return response;
};

export const changepassword = async (data) => {
    let response;
  
    try {  response = await api.post("/changepassword", data); } 
    catch (error) {  return error; }
  
    return response;
};


// trade APIS  ------------------------------------------------------------------------

export const createtrade = async (data) => {
    let response;
  
    try {  response = await api.post("/createtrade", data); } 
    catch (error) {  return error; }
  
    return response;
};

export const gettradesandoffersforthisuser = async (data) => {
    let response;
  
    try {  response = await api.post("/gettradesandoffersforthisuser", data); } 
    catch (error) {  return error; }
  
    return response;
};

export const getongoingtrades = async (data) => {
  let response;
  try { response = await api.post("/getongoingtrades",data); } 
  catch (error) { return error; }

  return response;
};

export const acceptoffer = async (data) => {
  let response;
  try { response = await api.post("/acceptoffer",data); } 
  catch (error) { return error; }

  return response;
};

export const declineoffer = async (data) => {
  let response;
  try { response = await api.post("/declineoffer",data); } 
  catch (error) { return error; }

  return response;
};

// offer APIS  ------------------------------------------------------------------------

export const getoffersforthistradeifthisuserownsthistrade = async (data) => {
  let response;
  try { response = await api.post("/getoffersforthistradeifthisuserownsthistrade",data); } 
  catch (error) { return error; }

  return response;
};

export const sendoffer = async (data) => {
  let response;
  try { response = await api.post("/sendoffer",data); } 
  catch (error) { return error; }

  return response;
};




export const addproduct = async (data) => {
  let response;
  // try { response = await api.post("/addproduct",data); } 
  try {
    response = axios.post('http://localhost:3000/addproduct', data, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      }})
  }
  catch (error) { return error; }

  return response;
};


export const fetchproductbycategory = async (data) => {
  let response;
  try { response = await api.post("/fetchproductbycategory",data); } 
  catch (error) { return error; }

  return response;
};


export const fetchallproducts = async () => {
  let response;
  try { response = await api.post("/fetchallproducts"); } 
  catch (error) { return error; }

  return response;
};









//active users data APIS  ------------------------------------------------------------------------

// export const setactiveuser = async (data) => {
//   let response;

//   try { response = await api.post("/setactiveuser", data); } 
//   catch (error) { return error; }

//   return response;
// };

// export const delactiveuser = async (data) => {
//   let response;

//   try { response = await api.post("/delactiveuser", data); } 
//   catch (error) { return error; }

//   return response;
// };

// export const getactiveusers = async () => {
//   let response;

//   try { response = await api.post("/getactiveusers"); } 
//   catch (error) { return error; }

//   return response;
// };







//testing API ----------------------------------------------------------------------------
// export const test = async () => {
//   let response;

//   try { response = await api.post("/test"); } 
//   catch (error) { return error; }

//   return response;
// };
