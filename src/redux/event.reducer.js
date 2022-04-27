import { createSlice } from "@reduxjs/toolkit";

export const eventHandler = createSlice({
  name: 'eventHandler',
  initialState:  {
    events: []
  }, 
  reducers: {
    addEvents : state => {
      console.log(state);
      events = state;
    }
  }
});

export const { addEvents} = counterSlice.actions;

export default eventHandler.reducer;