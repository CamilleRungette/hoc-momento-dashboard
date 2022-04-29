import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import { AlertMessage, url } from './_index';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../redux/login.reducer";

const Login = () => {

  const alertRef = useRef();
  const dispatch = useDispatch();
  const logged = useSelector(state => state.loginHandler);


  const [values, setValues] = useState({
    email: "",
    password: ""
  });
  const [alert, setAlert] = useState({
    type: "info",
    message: ""
  });

  const showAlert = (type, message) =>  {
    setAlert({type, message})
    alertRef.current.showAlert();
  };

  const handleState = (prop) => (event) => {
    setValues({...values, [prop] : event.target.value});
  };

  const connect = e => {
    e.preventDefault();

    if (!values.email) showAlert("warning", "Vous n'avez pas entré d'email")
    else if (!values.password)showAlert("warning", "Vous n'avez pas entré de mot de passe")
    else {
      axios.post(`${url}/dashboard/login`, values)
      .then(res => {
        res.data === "email" && showAlert('error', 'L\'adresse email est incorrecte');
        res.data === "password" && showAlert('error', 'Le mot de passe est incorrect');
        if (res.data === "success") {
          dispatch(login());
        };
      })
      .catch(err => {
        console.log(err);
      })
    };
  };

  return (
    <div className='login-main'>

      <div className='card'>
        <div className='center-content'>
          <h3>Se connecter à l'espace Hoc Momento</h3>
        </div>

        <div className='connection'>
          <div className='gif'>
            <img src="/images/login.gif" />
          </div>
          <form className='login-form' onSubmit={connect}>
            <TextField
              id="email"
              label="Email"
              value={values.email}
              onChange={handleState('email')}
              size="small"
              className='full-width input'
            />

            <TextField
              id="password"
              label="Mot de passe"
              value={values.password}
              onChange={handleState('password')}
              size="small"
              type="password"
              className='full-width input'
            />

            <div className='center-content'>
              <button className='btn'>Connexion</button>
            </div>
          
          </form>
        </div>
        <AlertMessage ref={alertRef} type={alert.type} message={alert.message} />
      </div>
    </div>
  )
}

export default Login