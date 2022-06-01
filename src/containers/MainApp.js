import React, { useEffect } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import App from "../routes/index";
import { url, showsActions } from "./_index";
import { connect } from "react-redux";
import axios from "axios";

const MainApp = ({ saveShowsComp }) => {
  useEffect(() => {
    axios
      .get(`${url}/shows`)
      .then((res) => {
        saveShowsComp(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="main-app">
      <Topbar />
      <Sidebar />
      <App />
    </div>
  );
};

export default connect(
  (state) => ({}),
  (dispatch) => ({
    saveShowsComp: (data) => dispatch(showsActions.saveShows(data)),
  })
)(MainApp);
