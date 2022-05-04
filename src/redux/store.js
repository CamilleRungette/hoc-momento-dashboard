import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import {eventsReducer} from "./reducers/events.reducers";
import {loginReducer} from "./reducers/login.reducer";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = { 
  key: 'root', 
  version: 1, 
  storage, 
  whitelist: ['loginReducer'] };

const combinedReducers = combineReducers({loginReducer, eventsReducer})

const persistedReducer = persistReducer(persistConfig, combinedReducers);

let store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})
let persistor = persistStore(store);

export {store, persistor};