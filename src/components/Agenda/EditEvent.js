import React, {useEffect, useState} from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DateTimePicker
} from '@material-ui/pickers';
import TextField from '@mui/material/TextField';
import { IoIosAdd } from "react-icons/io";
import { BiMinusCircle } from "react-icons/bi";
import { url, eventsActions } from './_index';
import axios from "axios";
import { connect } from 'react-redux';


const EditEvent = ({showAlert, closeModal, eventInfos}) => {

  const initialState = {
    title: "",
    description: "",
    photo: ""
  };

  const [event, setEvent] = useState(initialState);
  const [dates, setDates] = useState(eventInfos.dates);
  const [picture, setPicture] = useState();
  const [pictureName, setPictureName] = useState(); // à gérer

  useEffect(() => {
    setEvent(eventInfos);
  }, [eventInfos]);

  const handleState = (prop) => (e) => {
    setEvent({...event, [prop]: e.target.value})
  };

  const handleDateChange = (prop, e, i) => {
    let array = [... dates];
    if (e.target) array[i][prop] = e.target.value 
    else {
      array[i][prop] = `${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()} ${e.getHours()}:${e.getMinutes()}`
    };
    setDates(array);
  };

  console.log(event);

  const updateInfos = e => {
    e.preventDefault();
  };

  const removeDate = i => {
    let item = {...event};
    item.dates.splice(i, 1);
    setEvent(item);
  };

  const addDate = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let item = {...event};
    item.dates.push({
      startDate: null,
      endDate: null,
      place: "",
      address: "",
      city:""
    })

    setEvent(item);
  };

  const fileSelectedHandler = e => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', 'njetrqy4');
    formData.append('folder', "hoc-momento")
    setPicture(formData);

    setPictureName(e.target.files[0].name);
  }; 
  
  const deletePicture = () => {
    setPicture();
    setPictureName();
  };


  return (
    <div className='event-components'>
      <h3>Modifier un événement</h3>

      <form className='event-form' onSubmit={updateInfos}>
      <div className="input-form full-width">
          <TextField
              id="title"
              label="Titre"
              value={event.title}
              onChange={handleState('title')}
              className="full-width"
            />
        </div>
        <div className="input-form">
        {/* <TextField
            id="description"
            label="Description"
            multiline
            maxRows={5}
            value={event.description}
            onChange={handleState('description')}
            className="full-width"
            /> */}
        </div>

        <h4>Dates</h4>
        {dates.map((date, i) => (
          <div className='dates' key={Math.floor(Math.random() * 1000000)}>
             <div className='date-picker-div input-form'>
              <MuiPickersUtilsProvider utils={DateFnsUtils} className="date-picker">
                <DateTimePicker
                  autoOk
                  label="Début"
                  inputVariant='outlined'
                  ampm={false}
                  format="dd/MM/yyyy HH:mm"
                  onChange={(e) => handleDateChange('startDate', e, i)}
                  value={date.startDate}
                  />
              </MuiPickersUtilsProvider>
              
              <MuiPickersUtilsProvider utils={DateFnsUtils} className="date-picker">
              <DateTimePicker
                  label="Fin"
                  inputVariant='outlined'
                  ampm={false}
                  format="dd/MM/yyyy HH:mm"
                  onChange={(e) => handleDateChange('endDate', e, i)}
                  value={date.endDate}
                  />
              </MuiPickersUtilsProvider>
              <BiMinusCircle className='remove-icon pointer' onClick={() => removeDate(i)} />
            </div>
            <div className='input-form adress-line'>
              <TextField
                  label="Lieu"
                  onChange={(e) => handleDateChange('place', e, i)}
                  className="input-form "
                  value={date.place}
                />
                <TextField
                  label="Ville"
                  value={date.city}
                  onChange={(e) => handleDateChange('city', e, i)}
                  className="input-form "
                />
            </div>
            <div className="input-form">
              <TextField
                label="Adresse"
                value={date.address}
                onChange={(e) => handleDateChange('address', e, i)}
                className="input-form full-width"
              />
            </div>
          </div>
        ))}

      <button className='add-date pointer' onClick={addDate}> <IoIosAdd /> Ajouter</button>

      <h4>Télécharger une photo</h4> 
        
        {!pictureName ? 
          <div className="upload-picture">
            <input onChange={fileSelectedHandler} type="file" name="file" id="file" className="inputfile" />
            <label htmlFor="file" className='label'>
            <IoIosAdd className='plus-icon' />
              Ajouter</label>
          </div>
        :
        <div>
          <p>{pictureName} <i className='icon icon-trash' onClick={deletePicture} ></i> </p>
        </div>
          }

      <div className='btn-div'>
          <button className='btn'>Modifier</button>
        </div>
      </form>

    </div>
  )
}

export default connect(
  (state) => ({

  }), 
  (dispatch) => ({

  })
) (EditEvent);