import { createSlice } from "@reduxjs/toolkit";

export const eventHandler = createSlice({
  name: 'eventHandler',
  initialState:  {
    events: []
  }, 
  reducers: {
    addEvents : (state, data) => {
      state.events = data.payload;
    },
    addEvent: (state, data) => {
      let array = state.events;
      array.push(data.payload);
      state.events = array;
    }
  }
});

export const { addEvents, addEvent} = eventHandler.actions;

export default eventHandler.reducer;