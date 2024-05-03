import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  username: "",
  auth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { _id, username, auth } = action.payload;
      state._id = _id;
      state.username = username;
      state.auth = auth;
    },
    resetUser: (state) => {
      state._id = "";
      state.username = "";
      state.auth = false;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;


