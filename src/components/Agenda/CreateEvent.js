import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';
import TextField from '@mui/material/TextField';
import { IoIosAdd } from "react-icons/io";

const CreateEvent = () => {

  const [event, setEvent] = useState({
    title: "",
    description: "",
    dates: [],
    photo:""
  });

  const handleState = (prop) => (e) => {
    setEvent({...event, [prop]: e.target.value})
  };

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [picture, setPicture] = useState();
  const [pictureName, setPictureName] = useState();
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
  
  const saveInfos = e => {
    e.preventDefault();
    console.log("save");
  };

  return (
    <div className='create-event'>
      <h3>Créer un événement </h3>

      <form onSubmit={saveInfos} className="create-event-form">

        <TextField
            id="title"
            label="Titre"
            value={event.title}
            onChange={handleState('title')}
          />

        <TextField
            id="description"
            label="Description"
            multiline
            maxRows={5}
            value={event.description}
            onChange={handleState('description')}
          />
          
        <h4>Dates</h4>
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
              disableToolbar
              variant="inline"
              inputVariant='outlined'
              format="dd/MM/yyyy HH:mm"
              margin="normal"
              id="date-picker-inline"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider> <br/>

          <div>
            <TextField
                id="title"
                label="Titre"
                value={event.title}
                onChange={handleState('title')}
              />
              <TextField
                id="title"
                label="Titre"
                value={event.title}
                onChange={handleState('title')}
              />
          </div>
          <TextField
            id="title"
            label="Titre"
            value={event.title}
            onChange={handleState('title')}
          />
          
        </div>

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

        <button>Ok</button>
      </form>
    </div>
  )
}

export default CreateEvent;

