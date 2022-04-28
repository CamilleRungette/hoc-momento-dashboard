import { createSlice } from "@reduxjs/toolkit";

export const eventHandler = createSlice({
  name: 'eventHandler',
  initialState:  {
    events: []
  }, 
  reducers: {
    addEvents : (state, data) => {
      state.events = data.payload;
    }
  }
});

export const { addEvents} = eventHandler.actions;

export default eventHandler.reducer;