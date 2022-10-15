import axios from "axios";
import React, { useRef, useState } from "react";
import { act } from "react-dom/test-utils";
import { connect } from "react-redux";
import {
  actionActions,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ExpandMoreIcon,
  Link,
  BsDownload,
  url,
  Alert,
  ConfirmModal,
} from "./_index";

const Actions = ({ actions, deleteActionComp }) => {
  const initDate = {
    startDate: null,
    endDate: null,
    place: "",
    address: "",
    city: "",
  };

  const initLink = {
    name: "",
    link: "",
    type: "pdf",
  };

  const initialAction = {
    title: "",
    description: "",
    dates: [initDate],
    gallery: [],
    links: [initLink],
  };

  const modalRef = useRef();
  const alertRef = useRef();
  const confirmRef = useRef();
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const [action, setAction] = useState(initialAction);
  const [alert, setAlert] = useState({
    type: "info",
    message: "",
  });

  const showAlert = (type, message) => {
    setAlert({ type, message });
    alertRef.current.showAlert();
  };

  const showDialog = (data) => {
    setAction(data);
    confirmRef.current.showModal();
  };

  const deleteAction = () => {
    axios
      .post(`${url}/dashboard/delete-action`, { id: action._id })
      .then((res) => {
        if (res.data === "success") {
          deleteActionComp(action._id);
          showAlert("success", "L'action culturelle a bien été supprimée");
        } else {
          showAlert(
            "error",
            "Erreur lors de la suppression de l'action culturelle, veuillez rééssayer plus tard."
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log({ actions });
  return (
    <div className="inside-app">
      {actions.length ? (
        actions.map((action) => (
          <Accordion key={action._id} className="card action-main">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <h2>
                {" "}
                {action.place} – {action.period}{" "}
              </h2>
            </AccordionSummary>
            <AccordionDetails>
              <div className="action-buttons-div">
                <Link to={`/spectacle/${action._id}/modifier`}>
                  <button className="btn">Modifier</button>
                </Link>
                <Link to={`/actions-culturelles/${action._id}/gallerie`}>
                  <button className="btn-outlined">Voir la gallerie</button>
                </Link>
                <button
                  className="btn-red-outlined"
                  onClick={() => showDialog(action)}
                >
                  Supprimer
                </button>
              </div>
              <p
                className="show-description"
                dangerouslySetInnerHTML={{ __html: action.description }}
              />
              {action.links.length ? (
                <ul className="no-list-style links-list">
                  <h4>Liens</h4>
                  {action.links.map((link) =>
                    link.type === "pdf" ? (
                      <li key={Math.floor(Math.random() * 1000000)}>
                        <a
                          href={link.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="action-link"
                        >
                          {" "}
                          {link.name}{" "}
                        </a>{" "}
                        <BsDownload className="icon" />
                      </li>
                    ) : (
                      <li key={Math.floor(Math.random() * 1000000)}>
                        <a
                          href={link.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="action-link"
                        >
                          {" "}
                          {link.name}
                        </a>{" "}
                        ({link.type})
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <></>
              )}
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <div className="loading-div">
          <img src="/images/loading.gif" alt="events-loader" />
        </div>
      )}

      <Alert ref={alertRef} type={alert.type} message={alert.message} />
      <ConfirmModal
        ref={confirmRef}
        content={<div>Êtes-vous sûr de vouloir supprimer ce spectacle ?</div>}
        button={true}
        confirmParent={deleteAction}
      />
    </div>
  );
};

export default connect(
  (state) => ({
    actions: state.actionsReducer,
  }),
  (dispatch) => ({
    deleteActionComp: (id) => dispatch(actionActions.deleteAction(id)),
  })
)(Actions);
