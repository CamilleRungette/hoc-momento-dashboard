import React from 'react';
import { AiOutlineMenuUnfold, AiOutlineMenuFold, AiOutlineMenu } from "react-icons/ai"
import { FiMenu } from "react-icons/fi";
import Avatar from '@mui/material/Avatar';

const Topbar = () => {
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
        <Avatar>H</Avatar>
      </div>
    </div>
  )
};

export default Topbar;