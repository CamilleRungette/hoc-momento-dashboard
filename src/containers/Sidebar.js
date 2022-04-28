import React from 'react';
import { MdDashboard } from "react-icons/md";
import { RiCalendarEventLine,RiHandHeartLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className='sidebar-main'>
      <div className='top-div'>
        <div className='logo-div'>
          <img src="/images/logo_blanc.png" />
        </div>
      </div>

      <ul className='sidebar-navigation no-list-style'>
        <li><Link to="/dashboard" className='link'> <MdDashboard  className='sidebar-icon '/> Tableau de bord </Link></li>
        <li><Link to="/agenda" className='link'> <RiCalendarEventLine className='sidebar-icon '/> Agenda </Link></li>
        <li><Link to="/" className='link'> <RiHandHeartLine className='sidebar-icon '/> Partenaires & Soutiens </Link></li>
        <li><Link to="/" className='link'> <AiOutlineMail className='sidebar-icon '/> Messagerie </Link></li>

      </ul>
    </div>
  )
}

export default Sidebar