import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  cart : []
  // username: "",
  // auth: false,
};

//save homepage data also in state

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { _id, } = action.payload;
      state._id = _id;
      state.cart = [];
      //set homepage data
    },
    addItem: (state,action) => {
      const prod = action.payload;
      for (var i in state.cart){
        let p = state.cart[i]
        if (p._id === prod._id){ 
          state.cart[i].qty +=1 ;
          return;
        }
      }
      state.cart.push(prod)
    },
    removeItem: (state,action) => {
      const prod = action.payload;
      let tmp = []
      for (var i in state.cart){
        let p = state.cart[i]
        if (p._id === prod._id){ continue; }
        tmp.push(p)
      }
      state.cart = tmp
    },
    incrementItem: (state,action) => {
      const prod = action.payload;
      for (var i in state.cart){
        let p = state.cart[i]
        if (p._id === prod._id){
          state.cart[i]['qty']+=1
        }
      }
    },
    decrementItem: (state,action) => {
      const prod = action.payload;
      for (var i in state.cart){
        let p = state.cart[i]
        if (p._id === prod._id){
          state.cart[i]['qty']-=1
        }
      }
    },
    setItemquantity: (state,action) => {
      const {prod, qty} = action.payload;
      for (var i in state.cart){
        let p = state.cart[i]
        if (p._id === prod._id){
          state.cart[i]['qty'] = qty
        }
      }
    },
    emptyCart: (state) => {
      state.cart = []
    },
    resetUser: (state) => {
      state._id = "";
      state.cart = [];
    },
  },
});

export const { setUser, addItem, incrementItem, decrementItem, removeItem, setItemquantity, emptyCart, resetUser } = userSlice.actions;

export default userSlice.reducer;


