import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./reducers/login.reducer";
import { sidebarReducer } from "./reducers/sidebar.reducer";
import { showsReducer } from "./reducers/shows.reducer";
import { actionsReducer } from "./reducers/actions.reducer";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["loginReducer"],
};

const combinedReducers = combineReducers({
  loginReducer,
  sidebarReducer,
  showsReducer,
  actionsReducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

let store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
let persistor = persistStore(store);

export { store, persistor };
