import { createSlice } from "@reduxjs/toolkit";

export const loginHandler = createSlice({
  name: 'loginHandler',
  initialState:  {
    logged: false
  }, 
  reducers: {
    login: state => {
      state.logged = true;
    },
    logout: state => {
      state.logged = false
    }
  }
});

export const { login, logout} = loginHandler.actions;

export default loginHandler.reducer;