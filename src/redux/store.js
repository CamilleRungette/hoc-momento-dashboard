import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import {eventsReducer} from "./reducers/events.reducers";
import {loginReducer} from "./reducers/login.reducer";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = { key: 'root', version: 1, storage };

const combinedReducers = combineReducers({eventsReducer, loginReducer})

const persistedReducer = persistReducer(persistConfig, combinedReducers);

let store = configureStore({
  reducer: persistedReducer
})
let persistor = persistStore(store);

export {store, persistor}