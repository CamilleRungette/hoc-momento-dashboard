import React, {useRef, useState, useEffect} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { IoIosMore } from 'react-icons/io';
import { IoIosAdd } from "react-icons/io";
import { BasicModal, CreateEvent, EditEvent, AlertMessage, eventsActions } from './_index';
import { AiOutlineEdit } from "react-icons/ai";
import { connect } from 'react-redux';

const Agenda = ({events}) => {

  const initialState = {
    title: "",
    description: "",
    dates: [],
    photo:""
  };

  const modalRef = useRef();
  const alertRef = useRef()
  const [event, setEvent] = useState({});
  const [modalContent, setModalContent] = useState(<CreateEvent />)
  const [eventsYear, setEventsYear] = useState([]);
  const years = [2033, 2032, 2031, 2030, 2029, 2028, 2027, 2026, 2025, 2024, 2023, 2022, 2021, 2020,  2019, 2018];
  const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
  const [alert, setAlert] = useState({
    type: "info",
    message: ""
  });

  useEffect(() => {
    if (events.length){
      let array = [];
      events.forEach(event => {
        array.push(new Date(event?.dates[0].startDate).getFullYear());
      });
      setEventsYear(array);
    };
  },[events]);


  const showModal = () => {
    modalRef.current.showModal()
  };

  const closeModal = () => {
    modalRef.current.closeModal();
  };

  const showAlert = (type, message) =>  {
    setAlert({type, message});
    alertRef.current.showAlert();
  };

  const changeModalContent = (type, thisEvent) => {
    if (type === "edit") {
      setEvent(thisEvent);
      setModalContent(<EditEvent key={Math.floor(Math.random() * 1000000)} showAlert={showAlert} closeModal={closeModal} eventInfos={thisEvent} />)
    } else if (type === "create") {
      setEvent(initialState);
      setModalContent(<CreateEvent showAlert={showAlert} closeModal={closeModal} />)
    };
    showModal();
  };

  return (
    <div className='inside-app' >
      <div className='card agenda-main' >
        <h3 >Agenda</h3>
        
        <AlertMessage ref={alertRef} type={alert.type} message={alert.message} />

        <IoIosAdd className='add-event pointer' onClick={() => changeModalContent("create")} />

        <div className='events'>
          {years.map(year => (
            eventsYear.includes(year) ? (
            <Accordion key={Math.floor(Math.random() * 1000000)} className='accordion' defaultExpanded>
              <AccordionSummary
                key={Math.floor(Math.random() * 1000000)}
                expandIcon={<IoIosMore className='icon' />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                
              >
                <h3>{year}</h3>
              </AccordionSummary>
              {events.map(event => (
                new Date(event.dates[0].startDate).getFullYear() === year ? (
                    <AccordionDetails key={Math.floor(Math.random() * 1000000)}  className="event-details">
                      <div  className='accordion-title'>
                        <h2  >{event.title}</h2>
                        <AiOutlineEdit  className='icon-edit pointer' onClick={() => changeModalContent("edit", event)}  />
                      </div>
                        {event.dates.map(date => (
                        <div  className='event-date'>
                            <p >
                              {new Date(date.startDate).getDate() === new Date(date.endDate).getDate() ?
                                <span>Le {new Date(date.startDate).getDate()} {months[new Date(date.startDate).getMonth()]} </span>
                              : 
                              <span>
                                Du {new Date(date.startDate).getDate()} 
                                  {new Date(date.startDate).getMonth() !== new Date(date.endDate).getMonth() ? (
                                  <span> {months[new Date(date.startDate).getMonth()]} </span>
                                  ):( <> </>)}
                                au {new Date(date.endDate).getDate()} {months[new Date(date.endDate).getMonth()]}
                              </span>}
                            </p>
                            
                            <p >{date.place} </p>
    
                            <p >{date.address ? <span>{date.address},</span> : <></>} {date.city ? date.city : <></>}</p>
                        </div>
                        ))}
                      <div  className='event-desc'>
                        <div  className='description'>
                          <p >{event.description} </p>
                        </div>
                        <div  className='photo'>
                          <img  alt={event.title} src={event.photo} />
                        </div>
                      </div>
                    </AccordionDetails>
                  
                ) : <></>
              ))}
            </Accordion>
            ) : (<></>)
          ))}
        </div>
      </div>
      <BasicModal ref={modalRef} content={modalContent}  />
    </div>
  )
};

export default connect(
  (state) => ({
    events: state.eventsReducer
  }), 
  (dispatch) => ({

  })
)(Agenda);