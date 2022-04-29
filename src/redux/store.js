import { configureStore } from "@reduxjs/toolkit";
import  eventHandler  from "./event.reducer";
import  loginHandler from "./login.reducer";

export default configureStore({
  reducer: {
    eventsHandler: eventHandler,
    loginHandler: loginHandler
  }
});