import React from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import App from "../routes/index"

const MainApp = () => {

  return (
    <div>
      <Topbar />
      <Sidebar />
      <App />
    </div>
  )
}

export default MainApp;