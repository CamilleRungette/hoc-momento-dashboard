import React from 'react';
import { FiMenu } from "react-icons/fi";
import Avatar from '@mui/material/Avatar';
import { loginActions } from './_index';
import { connect } from "react-redux";

const Topbar = ({logged, logOutComp}) => {
  
  const showLogOut = () =>{
    document.getElementById('logout').style.display = 'block';
    document.getElementById('close-logout').style.display = 'block';
  };

  const closeLogOut = () => {
    document.getElementById('logout').style.display = 'none';
    document.getElementById('close-logout').style.display = 'none';
  };

  const logOut = () => {
    logOutComp();
  };

  return (
    <div className='topbar-main'>
      <div className='logo-div'>
        <div className='menu-logo'>
          <FiMenu />
        </div>
        <div className='hoc-momento-logo'>
          <img src="/images/logo_noir.png" />
        </div>
      </div>
      <div className='profile'>
        <Avatar className='pointer' onClick={showLogOut}>H</Avatar>
        <div id="logout" className='logout pointer' onClick={logOut} >
          Se déconnecter
        </div>
      <div id="close-logout" className='close-logout' onClick={closeLogOut}></div>
      </div>
    </div>
  )
};

export default connect(
  (state) => ({
    logged: state.loginReducer.logged
  }),
  (dispatch) => ({
    logOutComp: () => dispatch(loginActions.logOut())
  })
) (Topbar)