import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Accordion, AccordionDetails, AccordionSummary, BsDownload, ExpandMoreIcon, EditShow, BasicModal, Alert, 
  initialShowState, ConfirmModal, Link, url, showActions } from "./_index";

const Shows = ({shows, deleteShowComp}) => {
  
  const modalRef = useRef();
  const alertRef = useRef();
  const confirmRef = useRef();
  const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
  const [show, setShow] = useState(initialShowState.initialShow);
  const [alert, setAlert] = useState({
    type: "info",
    message: ""
  });

  const showModal = (data) => {
    setShow(data);
    modalRef.current.showModal();
  };

  const closeModal = () => {
    modalRef.current.closeModal();
  }

  const showAlert = (type, message) => {
    setAlert({type, message});
    alertRef.current.showAlert();
  };

  const showDialog = (data) => {
    setShow(data);
    confirmRef.current.showModal();
  };

  const deleteShow = () => {
    axios.post(`${url}/dashboard/delete-show`,{id: show._id})
    .then(res => {
      if (res.data === "success") {
        deleteShowComp(show._id);
        showAlert("success", "Le spectacle a bien été supprimé");
      } else {
        showAlert('error', "Erreur lors de la suppression du spectacle, veuillez rééssayer plus tard.")
      };

    })
    .catch(error => {
      console.log(error);
    });
  };

  return (
    <div className='inside-app'>

      {shows.map(show => (
        <Accordion key={show._id} className='card show-main'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h2>{show.title} </h2>
          </AccordionSummary>
          <AccordionDetails>
            <div className='show-buttons-div'>
              <button className='btn' onClick={() => showModal(show)}>Modifier</button>
              <Link to={`/spectacle/${show._id}/gallerie`}><button className='btn-outlined'>Voir la gallerie</button></Link>
              <button className='btn-red-outlined' onClick={() => showDialog(show)}>Supprimer</button>
            </div>
            <p className='show-description' dangerouslySetInnerHTML={{__html: show.description}} />
           { show.dates.length ? (
              <ul className='no-list-style'>
                <h4> Dates </h4>
                {show.dates.map(date => (
                  <li key={Math.floor(Math.random() * 1000000)} >
                    <p>
                      {date.place} {date.address ? <span>, {date.address},</span> : <></>} {date.city ? date.city + " " : <></>}
                      |
                      {new Date(date.startDate).getDate() === new Date(date.endDate).getDate() ?
                        <span> Le {new Date(date.startDate).getDate()} {months[new Date(date.startDate).getMonth()]} </span>
                      : 
                      <span> Du {new Date(date.startDate).getDate()} 
                          {new Date(date.startDate).getMonth() !== new Date(date.endDate).getMonth() ? (
                          <span> {months[new Date(date.startDate).getMonth()]} </span>
                          ):( <> </>)}
                        au {new Date(date.endDate).getDate()} {months[new Date(date.endDate).getMonth()]}
                      </span>}
                    
                    </p>

                    <p ></p>
                  </li>
                ))}
              </ul>) :(
                <></>
              )}

            {show.links.length ? (
              <ul className='no-list-style links-list'>
                <h4>Liens</h4>
                {show.links.map(link => (
                  link.type === "pdf" ? (
                    <li key={Math.floor(Math.random() * 1000000)}>
                      <a href={link.link} target="_blank" rel="noopener noreferrer" className='show-link' >  {link.name} </a> <BsDownload className='icon'/>
                    </li>
                  ) : (
                    <li key={Math.floor(Math.random() * 1000000)}>
                      <a href={link.link} target="_blank" rel="noopener noreferrer" className='show-link' >  {link.name} </a>
                    </li>
                  )
                ))}
              </ul> ) :( 
                <></>
              )}
          </AccordionDetails>
        </Accordion>
      ))}
    <BasicModal ref={modalRef} content={<EditShow showAlert={showAlert} showInfos={show} closeModal={closeModal} />} />
    <Alert ref={alertRef} type={alert.type} message={alert.message} />
    <ConfirmModal ref={confirmRef} content={<div>Êtes-vous sûr de vouloir supprimer ce spectacle ?</div> } button={true} confirmParent={deleteShow}  />    </div>
  )
}

export default connect (
  (state) => ({
    shows: state.showsReducer
  }),
  (dispatch) => ({
    deleteShowComp: id => dispatch(showActions.deleteShow(id))
  })
) (Shows)