import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Index from "./containers/Index";
import Login from "./pages/Login";
import './sass/style.scss'
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";


const App = () => {


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/*" element={<Index />} />
            <Route path="/login" element={<Login/>} />
          </Routes>
        </Router>
      </PersistGate>
   </Provider>
  );
}

export default App;
