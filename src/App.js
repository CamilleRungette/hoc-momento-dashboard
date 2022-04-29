import React, {useEffect} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import MainApp from "./containers/MainApp";
import axios from "axios";
import url from "./url";
import { useDispatch } from "react-redux";
import { addEvents } from './redux/event.reducer';
import './sass/style.scss'


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${url}/events`)
    .then(res => {
      console.log(res.data);
      dispatch(addEvents(res.data));
    })
    .catch(err => {
      console.log(err);
    })

  }, [dispatch])

  return (
    <Router>
      <Routes>
        <Route path="*" element={< MainApp />} />
      </Routes>
    </Router>
  );
}

export default App;
