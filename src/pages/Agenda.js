import React, {useRef, useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { IoIosMore } from 'react-icons/io';
import { IoIosAdd } from "react-icons/io";
import { BasicModal, CreateEvent, EditEvent, AlertMessage, eventsActions } from './_index';
import { AiOutlineEdit } from "react-icons/ai";
import { connect } from 'react-redux';

const Agenda = ({events}) => {

  const modalRef = useRef();
  const alertRef = useRef()
  const [modalContent, setModal] = useState(<div> hello </div>)
  const [eventsYear, setEventsYear] = useState([]);
  const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020,  2019, 2018];
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
    setAlert({type, message})
    alertRef.current.showAlert();
  };
    
  const changeModalContent = (type) => {
    if (type === "create") setModal(<CreateEvent showAlert={showAlert} closeModal={closeModal} />);
    if (type === "edit") setModal(<EditEvent showAlert={showAlert} closeModal={closeModal} />);
    showModal();
  };

  return (
    <div className='inside-app'>
      <div className='card agenda-main'>
        <h3>Agenda</h3>
        
        <AlertMessage ref={alertRef} type={alert.type} message={alert.message} />

        <IoIosAdd className='add-event pointer' onClick={() => changeModalContent("create")} />

        <div className='events'>
          {years.map(year => (
            eventsYear.includes(year) ? (
            <Accordion key={Math.floor(Math.random() * 10000)} className='accordion'>
              <AccordionSummary
                expandIcon={<IoIosMore className='icon' />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h3>{year}</h3>
              </AccordionSummary>
              {events.map(event => (
                new Date(event.dates[0].startDate).getFullYear() === year ? (
                <AccordionDetails key={`${event._id}${year}`} className="event-details">
                  <div className='accordion-title'>
                    <h2>{event.title}</h2>
                    <AiOutlineEdit className='icon-edit pointer' onClick={() => changeModalContent("edit")}  />
                  </div>
                  <div className='event-date'>
                    <p>
                      {new Date(event.dates[0].startDate).getDate() === new Date(event.dates[0].endDate).getDate() ?
                        <span>Le {new Date(event.dates[0].startDate).getDate()} {months[new Date(event.dates[0].startDate).getMonth() +1]} </span>
                      : 
                      <span>
                        Du {new Date(event.dates[0].startDate).getDate()} 
                          {new Date(event.dates[0].startDate).getMonth() !== new Date(event.dates[0].endDate).getMonth() ? (
                          <span> {months[new Date(event.dates[0].startDate).getMonth() +1]} </span>
                          ):( <> </>)}
                        au {new Date(event.dates[0].endDate).getDate()} {months[new Date(event.dates[0].endDate).getMonth() +1]}
                      </span>}
                    </p>
                    
                    <p>{event.dates[0].place} </p>

                    <p>{event.dates[0].address ? <span>{event.dates[0].address},</span> : <></>} {event.dates[0].city ? event.dates[0].city : <></>}</p>

                  </div>
                  <div className='event-desc'>
                    <div className='description'>
                      <p>{event.description} </p>
                    </div>
                    <div className='photo'>
                      <img alt={event.title} src={event.photo} />
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
      <BasicModal ref={modalRef} content={modalContent} />
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