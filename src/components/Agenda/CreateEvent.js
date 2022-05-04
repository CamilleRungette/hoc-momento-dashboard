import React, { useState, useMemo, useRef } from 'react';
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
import DatePicker from './DatePicker';

const CreateEvent = ({showAlert, closeModal, saveEventComp}) => {

  const initialState = {
    title: "",
    description: "",
    dates: [{
      startDate: null,
      endDate: null,
      place: "",
      address: "",
      city:""
    }],
    photo:""
  };

  const dateRef = useRef();
  const [event, setEvent] = useState(initialState);
  const [picture, setPicture] = useState();
  const [pictureName, setPictureName] = useState();
  const [dates, setDates] = useState([{
      id: Math.floor(Math.random() * 1000000),
      startDate: null,
      endDate: null,
  }]);
  

  const handleState = (prop) => (e) => {
    setEvent({...event, [prop]: e.target.value})
  };

  const handleDate = (prop) => (e) => {
    let datesState = [...event.dates];

    if (!datesState[prop.i]) {
      datesState[prop.i] = {
            startDate: null,
            endDate: null,
            place: "",
            address: "",
            city:""
          };
       datesState[prop.i][prop.type] = e.target.value;
      setEvent({...event, dates: datesState});
    } else {
      datesState[prop.i][prop.type] = e.target.value; 
      setEvent({...event, dates: datesState});
    };
  };


  const addDate = (e) => {
    e.preventDefault();
    e.stopPropagation();

    
    setDates([... dates, {id: Math.floor(Math.random() * 1000000),
      startDate: null,
      endDate: null
    }]);
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

  // const handleDateChange = (e, prop, i) => {
  //   console.log(prop);
  //   console.log(e);
  //   let datesArray = [...dates];
  //   datesArray[i][prop] = `${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()} ${e.getHours()}:${e.getMinutes()}`
  //   console.log(datesArray);
  //   setDates([...dates, datesArray]);
  // };

  // console.log(dates);

  const removeDate = i => {
    // let array = [...dates];
    // array.splice(i, 1);
    // setDate(array);
  };

  
  const saveInfos = e => {
    e.preventDefault();
    console.log(event);

    // dateRef.current.sendState();

    // let newEvent = {
    //   title: event.title, 
    //   description: event.description,
    //   photo: null,
    //   dates: dates
    // };

    // if (!newEvent.title || !newEvent.dates){
    //   showAlert("warning", "Le titre et au moins une date sont obligatoires");
    // } else {
    //   if (picture) {  
    //     axios.post(process.env.REACT_APP_CLOUDINARY, picture)
    //     .then(res => {
    //       newEvent.photo = res.data.secure_url;

    //       axios.post(`${url}/dashboard/create-event`, newEvent)
    //       .then(res => {
    //         saveEventComp(res.data);

    //         setPicture();
    //         setPictureName();
    //         setEvent(initialState)
    //         closeModal();
    //         showAlert("success", "Le nouvel événement a bien été créé");
    //       })
    //       .catch(error => {
    //         showAlert("error", "Erreur lors de la création de l'événement, veuillez réessayer plus tard");
    //         console.log(error);
    //       });
    //     })
    //     .catch(error => {
    //       showAlert("error", "Erreur avec le chargement de la photo, veuillez réessayer plus tard");
    //       console.log(error);
    //     })
    //   } else {
    //     axios.post(`${url}/dashboard/create-event`, newEvent)
    //     .then(res => {
    //       saveEventComp(res.data);

    //       setPicture();
    //       setPictureName();
    //       setEvent(initialState)
    //       closeModal();
    //       showAlert("success", "Le nouvel événement a bien été créé");
    //     })
    //     .catch(error => {
    //       showAlert("error", "Erreur lors de la création de l'événement, veuillez réessayer plus tard");
    //       console.log(error);
    //     });
    //   };
    // };
  };

  const getState = (data) => {
    console.log("createEvent", data);
  };

 
  return (
    <div className='event-components'>
      <h3>Créer un événement </h3>

      <form className="event-form" onSubmit={saveInfos}>
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
          <div key={date.id} className='dates' >
            {/* <div className='date-picker-div input-form'>
              <MuiPickersUtilsProvider utils={DateFnsUtils} className="date-picker">
                <DateTimePicker
                  autoOk={false}
                  label="Début"
                  inputVariant='outlined'
                  ampm={false}
                  format="dd/MM/yyyy HH:mm"
                  onChange={(e) => handleDateChange(e, 'startDate', i)}
                  value={date.startDate}
                  />
              </MuiPickersUtilsProvider>
              
              <MuiPickersUtilsProvider utils={DateFnsUtils} className="date-picker">
              <DateTimePicker
                  label="Fin"
                  inputVariant='outlined'
                  ampm={false}
                  format="dd/MM/yyyy HH:mm"
                  // onChange={handleDateChange('endDate')}
                  // value={event.dates[i].endDate}
                  />
              </MuiPickersUtilsProvider>
              <BiMinusCircle className='remove-icon pointer' onClick={() => removeDate(i)} />
            </div> */}
      
            <div className='input-form adress-line'>
              <TextField
                  id="place"
                  name="place"
                  label="Lieu"
                  className="input-form full-width"
                  onChange={handleDate({type: 'place', i})}
                />
                <TextField
                  id='city'
                  name="city"
                  label="Ville"
                  className="input-form full-width"
                  onChange={handleDate({type: 'city', i})}
                />
            </div>
            <div className="input-form">
              <TextField
                id="address"
                name="address"
                label="Adresse"
                className="input-form full-width"
                onChange={handleDate({type: 'address', i})}
              />
            </div>
          </div>
        ))}

        <button className='add-date pointer' onClick={(e) => addDate(e)}> <IoIosAdd /> Ajouter</button>

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

// export default connect(
//   (state) => ({}),
//   (dispatch) => ({
//     saveEventComp: data => dispatch(eventsActions.saveEvent(data))
//   })
// ) (CreateEvent);

export default CreateEvent

