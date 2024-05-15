import axios from "axios";

const api = axios.create({
  baseURL:  'http://192.168.100.136:3000', //process.env.VITE_APP_INTERNAL_API_PATH,
  headers: {
    "Content-Type": "application/json",
  },
});


// product APIS  ------------------------------------------------------------------------

export const addproduct = async (data) => {
  let response;
  try {
    response = axios.post('http://192.168.100.136:3000/addproduct', data, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      }})
  }
  catch (error) { return error; }

  return response;
};


export const editproductaddphoto = async (data) => {
  let response;
  try {
    response = axios.post('http://192.168.100.136:3000/editproductaddphoto', data, {
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

export const editproduct = async (data) => {
  let response;
  try { response = await api.post("/editproduct",data); } 
  catch (error) { return error; }

  return response;
};


export const deleteproduct = async (data) => {
  let response;
  try { response = await api.post("/deleteproduct",data); } 
  catch (error) { return error; }

  return response;
};


export const fetchinitialdata = async () => {
  let response;
  try { response = await api.post("/fetchinitialdata"); } 
  catch (error) { return error; }

  return response;
};




//email  APIs ----------------------------------------------------

export const sendorderconfirmationemail = async (data) => {
  let response;
  try { response = await api.post("/sendorderconfirmationemail",data); } 
  catch (error) { return error; }

  return response;
};

export const sendformsubmissionemail = async (data) => {
  let response;
  try { response = await api.post("/sendformsubmissionemail",data); } 
  catch (error) { return error; }

  return response;
};

export const changemail = async (data) => {
  let response;
  try { response = await api.post("/changemail",data); } 
  catch (error) { return error; }

  return response;
};

export const addemail = async (data) => {
  let response;
  try { response = await api.post("/addemail",data); } 
  catch (error) { return error; }

  return response;
};

export const getallemails = async () => {
  let response;
  try { response = await api.post("/getallemails"); } 
  catch (error) { return error; }

  return response;
};

export const changedowntime = async () => {
  let response;
  try { response = await api.post("/changedowntime"); } 
  catch (error) { return error; }

  return response;
};


export const otp = async () => {
  let response;
  try { response = await api.post("/otp"); } 
  catch (error) { return error; }

  return response;
};




//basic user authentication APIS  ------------------------------------------------------------------------

// export const login = async (data) => {
//   let response;

//   try { response = await api.post("/login", data); }
//   catch (error) { return error; }

//   return response;
// };

// export const register = async (data) => {
//   let response;

//   try {  response = await api.post("/register", data); } 
//   catch (error) {  return error; }

//   return response;
// };

// export const logout = async () => {
//   let response;
//   try { response = await api.post("/logout"); } 
//   catch (error) { return error; }

//   return response;
// };

// export const changepassword = async (data) => {
//     let response;
  
//     try {  response = await api.post("/changepassword", data); } 
//     catch (error) {  return error; }
  
//     return response;
// };



//testing API ----------------------------------------------------------------------------
// export const test = async () => {
//   let response;

//   try { response = await api.post("/test"); } 
//   catch (error) { return error; }

//   return response;
// };
