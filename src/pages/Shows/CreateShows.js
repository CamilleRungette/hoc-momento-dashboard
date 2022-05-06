import React, { useCallback, useEffect, useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DateTimePicker
} from '@material-ui/pickers';
import TextField from '@mui/material/TextField';
import { IoIosAdd } from "react-icons/io";
import { BiMinusCircle } from "react-icons/bi";
import axios from "axios";
import { connect } from 'react-redux';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';



const CreateShows = () => {

  const initialState = {
    title: "", 
    description: "",
    dates: "",
    gallery: [],
    links: [{
      name: "",
      link: "",
      type: "pdf"
    }]
  };

  const initDate = {
    startDate: null,
    endDate: null,
    place: "",
    address: "",
    city:""
  };

  const initDates = [Math.floor(Math.random() * 1000000)];

  const [show, setShow] = useState(initialState);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [picture, setPicture] = useState();
  const [pictureName, setPictureName] = useState();
  const [dates, setDates] = useState(initDates);


  useEffect(() => {
    // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  }, []);
  
  const handleState = (prop) => (e) => {
    setShow({...show, [prop]: e.target.value});
  };

  const saveShow = (e) => {
    e.preventDefault();
  };

  const onEditorStateChange = (content) => {
   setEditorState(content);
  };

  const handleDate = (prop) => (e) => {
    // let datesState = [...event.dates];

    // if (!datesState[prop.i]) {
    //   datesState[prop.i] = initDate;
    // };

    // if (prop.type === 'startDate' || prop.type === 'endDate'){
    //   let month = e.getMonth()+1 < 10 ? `0${e.getMonth()+1}` : e.getMonth()+1;
    //   let hour = e.getHours() < 10 ? `0${e.getHours()}` : e.getHours();
    //   let minute = e.getMinutes() < 10 ? `0${e.getMinutes()}` : e.getMinutes();
      
    //   datesState[prop.i][prop.type] = `${e.getFullYear()}-${month}-${e.getDate()} ${hour}:${minute}`;

    // } else datesState[prop.i][prop.type] = e.target.value; 

    // setEvent({...event, dates: datesState});
  };


  const addDate = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // setDates([... dates, Math.floor(Math.random() * 1000000)]);

    // let eventCopy = {...event};
    // eventCopy.dates.push(initDate);
    // setEvent(eventCopy);
  };

  const removeDate = (id, index) => {
    // let datesArray = [...dates];
    // datesArray = datesArray.filter(date => date !== id)
    // setDates(datesArray);

    // let eventsArray = {...event};
    // eventsArray.dates.splice(index, 1);
    // setEvent(eventsArray);    
  };


  const fileSelectedHandler = e => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
    formData.append('folder', "hoc-momento")
    setPicture(formData);

    setPictureName(e.target.files[0].name);
  }; 
  
  const deletePicture = () => {
    setPicture();
    setPictureName();
  };

  
  return (
    <div className='inside-app'>
      <div className='card card-main show-main'>
        <h3>Créer un spectacle</h3>

        <form className='create-show-form' onSubmit={saveShow}>

          <TextField
            id="title"
            label="Titre"
            value={show.title}
            onChange={handleState('title')}
            className='input-form'
            size="small"
            />

        <div className='editor-div input-form'>
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={onEditorStateChange}
            toolbar={{
              options:['inline', 'list', 'textAlign', 'history'],
              inline: {
                options: ['bold', 'italic', 'underline', 'superscript', 'subscript' ]
              },
              list: {
                options: ['unordered', 'ordered'],
              },

            }}
          />
        </div>
        
        <div className='dates-and-picture'>
          <div className='dates-div'>
            <h4>Dates</h4>

            <div key={"date"} className='dates' >
              <div className='date-picker-div '>
                <MuiPickersUtilsProvider utils={DateFnsUtils} className="date-picker">
                  <DateTimePicker
                    autoOk
                    label="Début"
                    inputVariant='outlined'
                    ampm={false}
                    format="dd/MM/yyyy HH:mm"
                    size="small"
                    // onChange={handleDate({type: 'startDate', i})}
                    // value={event.dates[i].startDate}
                    />
                </MuiPickersUtilsProvider>
                
                <MuiPickersUtilsProvider utils={DateFnsUtils} className="date-picker">
                <DateTimePicker
                    autoOk
                    label="Fin"
                    inputVariant='outlined'
                    ampm={false}
                    format="dd/MM/yyyy HH:mm"
                    // onChange={handleDate({type: 'endDate', i})}
                    // value={event.dates[i].endDate}
                    />
                </MuiPickersUtilsProvider>
                <BiMinusCircle className='remove-icon pointer' onClick={() => removeDate()} />
              </div>
        
              <div className='input-form adress-line'>
                <TextField
                    id="place"
                    name="place"
                    label="Lieu"
                    className="line full-width"
                    size="small"
                    // onChange={handleDate({type: 'place', i})}
                    // value={event.dates[i].place}
                  />
                  <TextField
                    id='city'
                    name="city"
                    label="Ville"
                    className="line full-width"
                    size="small"
                    // onChange={handleDate({type: 'city', i})}
                    // value={event.dates[i].city}
                  />
              </div>
              <div className="input-form">
                <TextField
                  id="address"
                  name="address"
                  label="Adresse"
                  className="input-form full-width"
                  size="small"
                  // onChange={handleDate({type: 'address', i})}
                  // value={event.dates[i].address}
                />
              </div>
            </div>
            <button className='add-date pointer' onClick={(e) => addDate(e)}> <IoIosAdd /> Ajouter une date</button>
            </div>

            <div className='pictures-div'>
            <h4>Télécharger des photos</h4> 
        
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
            </div>
          </div>

          <div className='div-links'>
              <h4>Liens</h4>
              <div className='links'>
                <div id="name">
                <TextField
                  name="name"
                  label="Nom"
                  className='input-form full-width'
                  size="small"
                  />
                </div>
                <div id="link">
                  <TextField
                    name="link"
                    label="Lien"
                    className='input-form full-width'
                    size="small"
                    />
                </div>
                <div id="type">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={show.links[0].type}
                    label="Age"
                    onChange={handleState('type')}
                    >
                    <MenuItem value={"pdf"}>Pdf</MenuItem>
                    <MenuItem value={"video"}>Video</MenuItem>
                    <MenuItem value={"url"}>Url</MenuItem>
                  </Select>
                </FormControl>
                </div>
              </div>
              <button className='add-date pointer' onClick={(e) => addDate(e)}> <IoIosAdd /> Ajouter un lien</button>
          </div>

          <div className='btn-div'>
            <button className='btn'>Créer</button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default CreateShows;