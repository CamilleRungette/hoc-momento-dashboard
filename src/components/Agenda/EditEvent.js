import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import TextField from "@mui/material/TextField";
import { IoIosAdd } from "react-icons/io";
import { BsTrash } from "react-icons/bs";
import { BiMinusCircle } from "react-icons/bi";
import { url, eventsActions } from "./_index";
import axios from "axios";
import { connect } from "react-redux";

const EditEvent = ({ showAlert, closeModal, getEventsParent, eventInfos }) => {
  const initDate = {
    startDate: null,
    endDate: null,
    place: "",
    address: "",
    city: "",
  };

  const initialEvent = {
    title: "",
    description: "",
    dates: [initDate],
    photo: "",
  };

  const [event, setEvent] = useState(initialEvent);
  const [picture, setPicture] = useState("");
  const [pictureName, setPictureName] = useState("");
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let eventCopy = { ...eventInfos };
    setEvent(eventCopy);
    setPicture(eventCopy.photo);
    setPictureName(
      eventCopy.photo
        ? eventCopy.photo.substr(eventCopy.photo.length - 15)
        : null
    );

    setDates(
      eventCopy.dates.map(() => {
        return Math.floor(Math.random() * 1000000);
      })
    );
  }, [eventInfos]);

  const handleState = (prop) => (e) => {
    setEvent({ ...event, [prop]: e.target.value });
  };

  const handleDate = (prop) => (e) => {
    let datesState = [...event.dates];

    if (!datesState[prop.i]) {
      datesState[prop.i] = initDate;
    }

    if (prop.type === "startDate" || prop.type === "endDate") {
      let month =
        e.getMonth() + 1 < 10 ? `0${e.getMonth() + 1}` : e.getMonth() + 1;
      let hour = e.getHours() < 10 ? `0${e.getHours()}` : e.getHours();
      let minute = e.getMinutes() < 10 ? `0${e.getMinutes()}` : e.getMinutes();

      datesState[prop.i][
        prop.type
      ] = `${e.getFullYear()}-${month}-${e.getDate()} ${hour}:${minute}`;
    } else datesState[prop.i][prop.type] = e.target.value;

    setEvent({ ...event, dates: datesState });
  };

  const addDate = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDates([...dates, Math.floor(Math.random() * 1000000)]);

    let eventCopy = { ...event };
    eventCopy.dates.push(initDate);
    setEvent(eventCopy);
  };

  const removeDate = (id, index) => {
    let datesArray = [...dates];
    datesArray = datesArray.filter((date) => date !== id);
    setDates(datesArray);

    let eventsArray = { ...event };
    eventsArray.dates.splice(index, 1);
    setEvent(eventsArray);
  };

  const fileSelectedHandler = (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
    formData.append("folder", "hoc-momento");
    setPicture(formData);

    setPictureName(e.target.files[0].name);
  };

  const deletePicture = () => {
    setPicture();
    setPictureName();
    setEvent({ ...event, photo: "" });
  };

  const saveInfos = (e) => {
    e.preventDefault();

    setLoading(true);
    let newEvent = { ...event };

    if (!newEvent.title || !newEvent.dates) {
      showAlert("warning", "Le titre et au moins une date sont obligatoires");
    } else {
      if (picture && picture !== event.photo) {
        console.log("here");
        axios
          .post(process.env.REACT_APP_CLOUDINARY, picture)
          .then((res) => {
            newEvent.photo = res.data.secure_url;

            axios
              .post(`${url}/dashboard/edit-event`, newEvent)
              .then(() => {
                closeModal();
                setLoading(false);
                getEventsParent();
              })
              .catch((error) => {
                showAlert(
                  "error",
                  "Erreur lors de la mise à jour de l'événement, veuillez réessayer plus tard"
                );
                closeModal();
                setLoading(false);
                console.log(error);
              });
          })
          .catch((error) => {
            closeModal();
            setLoading(false);
            showAlert(
              "error",
              "Erreur avec le chargement de la photo, veuillez réessayer plus tard"
            );
            console.log(error);
          });
      } else {
        axios
          .post(`${url}/dashboard/edit-event`, newEvent)
          .then(() => {
            closeModal();
            setLoading(false);
            getEventsParent();
          })
          .catch((error) => {
            closeModal();
            setLoading(false);
            showAlert(
              "error",
              "Erreur lors de la mise à jour de l'événement, veuillez réessayer plus tard"
            );
            console.log(error);
          });
      }
    }
  };

  const cancelEdit = (e) => {
    e.preventDefault();
    closeModal();
    setEvent(eventInfos);
    setPicture("");
    setPictureName("");
    setDates([]);
  };

  return (
    <div className="event-components">
      <h3>Modifier un événement </h3>

      <form className="event-form" onSubmit={saveInfos}>
        <div className="input-form full-width">
          <TextField
            id="title"
            label="Titre"
            value={event.title}
            onChange={handleState("title")}
            className="full-width"
          />
        </div>
        <textarea
          id="description"
          placeholder="Description"
          rows={10}
          value={event.description}
          onChange={handleState("description")}
          className="full-width text-area"
        />

        <h4>Dates</h4>
        {dates.map((date, i) => (
          <div key={date} className="dates">
            <div className="date-picker-div input-form">
              <MuiPickersUtilsProvider
                utils={DateFnsUtils}
                className="date-picker"
              >
                <DateTimePicker
                  autoOk
                  label="Début"
                  inputVariant="outlined"
                  ampm={false}
                  format="dd/MM/yyyy HH:mm"
                  onChange={handleDate({ type: "startDate", i })}
                  value={event.dates[i].startDate}
                />
              </MuiPickersUtilsProvider>

              <MuiPickersUtilsProvider
                utils={DateFnsUtils}
                className="date-picker"
              >
                <DateTimePicker
                  autoOk
                  label="Fin"
                  inputVariant="outlined"
                  ampm={false}
                  format="dd/MM/yyyy HH:mm"
                  onChange={handleDate({ type: "endDate", i })}
                  value={event.dates[i].endDate}
                />
              </MuiPickersUtilsProvider>
              <BiMinusCircle
                title="Supprimer cette date"
                className="remove-icon pointer"
                onClick={() => removeDate(date, i)}
              />
            </div>

            <div className="input-form adress-line">
              <TextField
                id="place"
                name="place"
                label="Lieu"
                className="line full-width"
                onChange={handleDate({ type: "place", i })}
                value={event.dates[i].place}
              />
              <TextField
                id="city"
                name="city"
                label="Ville"
                className="line full-width"
                onChange={handleDate({ type: "city", i })}
                value={event.dates[i].city}
              />
            </div>
            <div className="input-form">
              <TextField
                id="address"
                name="address"
                label="Adresse"
                className="input-form full-width"
                onChange={handleDate({ type: "address", i })}
                value={event.dates[i].address}
              />
            </div>
          </div>
        ))}

        <button className="add-date pointer" onClick={(e) => addDate(e)}>
          {" "}
          <IoIosAdd /> Ajouter une date
        </button>

        <h4>Télécharger une photo</h4>

        {!pictureName ? (
          <div className="upload-picture">
            <input
              onChange={fileSelectedHandler}
              type="file"
              name="file"
              id="file"
              className="inputfile"
            />
            <label htmlFor="file" className="label">
              <IoIosAdd className="plus-icon" />
              Ajouter
            </label>
          </div>
        ) : (
          <div>
            <p>
              <a
                href={event.photo}
                target="_blank"
                rel="noreferrer"
                className="picture-link"
              >
                {pictureName}
              </a>{" "}
              <BsTrash
                title="Supprimer cette photo"
                className="delete-picture pointer"
                onClick={deletePicture}
              />{" "}
            </p>
          </div>
        )}
        <div className="btn-div btn-div-form">
          <button className="btn-grey-outlined" onClick={cancelEdit}>
            Annuler
          </button>
          {!loading ? (
            <button className="btn">Enregistrer</button>
          ) : (
            <button className="btn-grey">
              <img
                src="/images/loading-btn.gif"
                alt="Modification en cours..."
                className="loading-gif"
              />
              Enregistrer
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditEvent;
