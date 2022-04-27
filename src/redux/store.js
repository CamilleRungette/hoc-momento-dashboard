import { configureStore } from "@reduxjs/toolkit";
import  eventHandler  from "./event.reducer";

export default configureStore({
  reducer: {
    eventsHandler: eventHandler
  }
});