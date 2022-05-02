import React, { useEffect } from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import App from "../routes/index";
import { useSelector } from "react-redux";
import { Navigate} from 'react-router-dom';

const MainApp = () => {

  const logged = useSelector(state => state.loginHandler);

  useEffect(() => {
    if (logged.logged === false) {
      <Navigate replace to="/login" />
    };
  }, [logged]);

  return (
    <div className='main-app'>
      <Topbar />
      <Sidebar />
      <App />
    </div>
  )
}

export default MainApp;