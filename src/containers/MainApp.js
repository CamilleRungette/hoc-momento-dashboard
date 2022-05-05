import React, { useEffect } from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import App from "../routes/index";
import { eventsActions, url } from "./_index";
import { connect } from 'react-redux';
import axios from "axios";

const MainApp = ({saveEventsComp}) => {

  useEffect(() => {
    axios.get(`${url}/events`)
    .then(res => {
      saveEventsComp(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);
  
  return (
    <div className='main-app'>
      <Topbar />
      <Sidebar />
      <App />
    </div>
  )
}

export default connect (
  (state) => ({}),
  (dispatch) => ({
    saveEventsComp: data => dispatch(eventsActions.saveEvents(data))
  })
)(MainApp);