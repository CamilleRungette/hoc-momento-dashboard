import React, { useState, useRef } from "react";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import axios from "axios";
import { connect } from "react-redux";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  actionActions,
  Alert,
  TextField,
  url,
  DateFnsUtils,
  IoIosAdd,
  BiMinusCircle,
  VscClose,
  Editor,
  EditorState,
  convertToRaw,
  draftToHtml,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Navigate,
} from "./_index";

const CreateAction = ({ saveActionComp }) => {
  return <div className="inside-app">create action</div>;
};

export default connect(
  (state) => ({}),
  (dispatch) => ({
    saveActionComp: (data) => dispatch(actionActions.saveShow(data)),
  })
)(CreateAction);
