import React from 'react';
import { useSelector } from "react-redux";

const Agenda = () => {

  const events = useSelector(state => state.eventsHandler.events)
    
  return (
    <div>
      Agenda
    </div>
  )
}

export default Agenda