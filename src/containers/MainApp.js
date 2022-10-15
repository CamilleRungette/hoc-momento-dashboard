import React, { useEffect } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import App from "../routes/index";
import { url, showsActions, actionsActions } from "./_index";
import { connect } from "react-redux";
import axios from "axios";

const MainApp = ({ saveShowsComp, saveActionsComp }) => {
  useEffect(() => {
    axios
      .get(`${url}/shows`)
      .then((res) => {
        saveShowsComp(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${url}/actions`)
      .then((res) => {
        console.log({ res });
        saveActionsComp(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [saveActionsComp, saveShowsComp]);

  return (
    <div className="main-app">
      <Topbar />
      <Sidebar />
      <App />
    </div>
  );
};

export default connect(
  (state) => () => {
    // console.log(state);
  },
  (dispatch) => ({
    saveShowsComp: (data) => dispatch(showsActions.saveShows(data)),
    saveActionsComp: (data) => dispatch(actionsActions.saveActions(data)),
  })
)(MainApp);
