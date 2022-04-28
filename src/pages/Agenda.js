import React, {useRef, useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { IoIosMore } from 'react-icons/io';
import { GrAdd } from "react-icons/gr";
import { IoIosAdd } from "react-icons/io";


const Agenda = () => {

  const events = useSelector(state => state.eventsHandler.events);
  const modalRef = useRef();

  const [eventsYear, setEventsYear] = useState([]);
  const date = new Date();
  const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020,  2019, 2018];
  const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]

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

    
  return (
    <div className='inside-app'>
      <div className='card agenda-main'>
        <h3>Agenda</h3>
        <IoIosAdd className='add-event pointer' />

        <div className='past-events'>
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
                  <h2>{event.title}</h2>
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
                </AccordionDetails>
                ) : <></>
              ))}
            </Accordion>
            ) : (<></>)
          ))}
        </div>

      </div>
    </div>
  )
}

export default Agenda