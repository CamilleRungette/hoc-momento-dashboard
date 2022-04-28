import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
  DateTimePicker
} from '@material-ui/pickers';
import TextField from '@mui/material/TextField';
import { IoIosAdd } from "react-icons/io";
import { BiMinusCircle } from "react-icons/bi"

const CreateEvent = () => {

  const [event, setEvent] = useState({
    title: "",
    description: "",
    dates: [],
    photo:""
  });
  const [picture, setPicture] = useState();
  const [pictureName, setPictureName] = useState();
  const [dates, setDates] = useState([]);


  const handleState = (prop) => (e) => {
    setEvent({...event, [prop]: e.target.value})
  };

  const handleDateChange = (prop, e, i) => {
    let array = [... dates];
    e.target ? array[i][prop] = e.target.value : array[i][prop] = e;
    console.log(array);
    setDates(array);
  };

  const handleDateArray = (id, key, value) => {
    
  };

  const addDate = () => {
    setDates([... dates, {
      startDate: new Date(),
      endDate: new Date(),
      place: "",
      address: "",
      city:""
    }]);
  };

  const removeDate = i => {
    let array = [...dates];
    array.splice(i, 1);
    setDates(array);
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
  
  const saveInfos = e => {
    e.preventDefault();

    let newEvent = {
      title: event.title, 
      description: event.description,
      photo: null
    };

    console.log(event);
    console.log(picture);

    // newEvent.dates && newEvent.dates.forEach((date, i) => {
    //   date.startDate = dates[i].startDate;
    //   date.endDate = dates[i].endDate;
    // });
    // if (!newEvent.title || (!newEvent.dates || !newEvent.dates[0].startDate)){
    //   console.log(newEvent);
    // } else {
    //   if (picture) {  
    //     axios.post("https://api.cloudinary.com/v1_1/ds5zdmfj2/image/upload", picture)
    //     .then(res => {
    //       newEvent.photo = res.data.secure_url;
    //       console.log(newEvent);

    //       axios.post(`${url}/dashboard/create-event`, newEvent)
    //       .then(res => {
    //         // ajouter event à redux;
    //         setPicture();
    //         setPictureName();
    //         closeModal();
    //         setRedirect(true);
    //       })
    //       .catch(error => {
    //         openNotificationWithIcon("error", "Erreur", "Erreur lors de la création de l'événement, veuillez réessayer plus tard")
    //         console.log(error);
    //       });
    //     })
    //     .catch(error => {
    //       openNotificationWithIcon("error", "Erreur", "Erreur lors du chargement de la photo, veuillez réessayer plus tard")
    //       console.log(error);
    //     })
    //   } else {
    //       axios.post(`${url}/dashboard/create-event`, newEvent)
    //       .then(res => {
    //         // ajouter event à redux;
    //         setPicture();
    //         setPictureName();
    //         closeModal();
    //         setRedirect(true);
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       });
    //   };
    // };
  };

 
  return (
    <div className='create-event'>
      <h3>Créer un événement </h3>

      <form onSubmit={saveInfos} className="create-event-form">
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
        <TextField
            id="description"
            label="Description"
            multiline
            maxRows={5}
            value={event.description}
            onChange={handleState('description')}
            className="full-width"
            />
        </div>
          
        <h4>Dates</h4>
        {dates.map((date, i) => (
          <div className='dates' key={i}>
            <div className='date-picker-div'>
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
                  className="input-form full-width"
                  value={date.place}
                />
                <TextField
                  label="Ville"
                  value={date.city}
                  onChange={(e) => handleDateChange('city', e, i)}
                  className="input-form full-width"
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
          <button className='btn'>Créer</button>
        </div>
      </form>
    </div>
  )
}

export default CreateEvent;

