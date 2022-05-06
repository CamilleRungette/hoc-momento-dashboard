import React, { useCallback, useEffect, useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DatePicker
} from '@material-ui/pickers';
import TextField from '@mui/material/TextField';
import { IoIosAdd } from "react-icons/io";
import { BiMinusCircle } from "react-icons/bi";
import { VscClose } from "react-icons/vsc";
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

  const initDate = {
    startDate: null,
    endDate: null,
    place: "",
    address: "",
    city:""
  };

  const initLink = {
    name: "",
    link: "",
    type: "pdf"
  };

  const initialState = {
    title: "", 
    description: "",
    dates: [initDate],
    gallery: [],
    links: [initLink]
  };

  const initDates = [Math.floor(Math.random() * 1000000)];
  const initLinks = [Math.floor(Math.random() * 1000000)];

  const [show, setShow] = useState(initialState);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [pictures, setPictures] = useState([]);
  const [pictureNames, setPictureNames] = useState([ "0Z4A56522.jpg", "20211113_162927.jpg", "20211113_164324.jpg" ]);
  const [dates, setDates] = useState(initDates);
  const [links, setLinks] = useState(initLinks);
  
  const handleState = (prop) => (e) => {
    setShow({...show, [prop]: e.target.value});
  };

  const onEditorStateChange = (content) => {
   setEditorState(content);
  };

  const handleItem = (prop) => (e) => {
    if (prop.item === 'date') {
      let datesState = [...show.dates];
  
      if (!datesState[prop.i]) {
        datesState[prop.i] = initDate;
      };
  
      if (prop.type === 'startDate' || prop.type === 'endDate'){
        let month = e.getMonth()+1 < 10 ? `0${e.getMonth()+1}` : e.getMonth()+1;
        
        datesState[prop.i][prop.type] = `${e.getFullYear()}-${month}-${e.getDate()}`;
  
      } else datesState[prop.i][prop.type] = e.target.value; 
  
      setShow({...show, dates: datesState});
    } else {

    };
  };


  const addItem = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    let showCopy = {...show};

    if (type === 'date'){
      setDates([... dates, Math.floor(Math.random() * 1000000)]);
      showCopy.dates.push(initDate);
    } else {
      setLinks([...links, Math.floor(Math.random() * 1000000)]);
      showCopy.links.push(initLink);
    };

    setShow(showCopy);
  };

  const removeItem = (id, index, type) => {
    let showArray = {...show};

    if (type === 'date'){
      let datesArray = [...dates];
      datesArray = datesArray.filter(date => date !== id)
      setDates(datesArray);
  
      showArray.dates.splice(index, 1);
    } else {
      let linksArray = [...links];
      linksArray = linksArray.filter(link => link !== id);
      setLinks(linksArray);

      showArray.links.splice(index, 1);
    };

    setShow(showArray);      
  };


  const fileSelectedHandler = e => {
    let formDatas = [...pictures]; 
    let picturesNamesArray = [...pictureNames];

    Array.from(e.target.files).forEach(file => {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
      formData.append('folder', "hoc-momento");

      formDatas.push(formData);
      picturesNamesArray.push(file.name);
    })
    setPictures(formDatas);
    setPictureNames(picturesNamesArray);
  }; 
  
  const deletePicture = () => {
    // setPicture();
    // setPictureName();
  };

  const saveShow = (e) => {
    e.preventDefault();

    console.log(show);
    // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    console.log(pictures);
    console.log(pictureNames);
  };
  
  return (
    <div className='inside-app'>
      <div className='card card-main create-show-main'>
        <h3>Créer un spectacle</h3>

        <form className='show-form' onSubmit={saveShow}>

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

            {dates.map((date, i) => (
              <div key={date} className='dates' >
                <div className='date-picker-div '>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} className="date-picker">
                    <DatePicker
                      autoOk
                      label="Début"
                      inputVariant='outlined'
                      ampm={false}
                      format="dd/MM/yyyy"
                      size="small"
                      onChange={handleItem({type: 'startDate', i})}
                      value={show.dates[i].startDate}
                      />
                  </MuiPickersUtilsProvider>
                  
                  <MuiPickersUtilsProvider utils={DateFnsUtils} className="date-picker">
                  <DatePicker
                      autoOk
                      label="Fin"
                      inputVariant='outlined'
                      ampm={false}
                      format="dd/MM/yyyy"
                      onChange={handleItem({type: 'endDate', i, item: 'date'})}
                      value={show.dates[i].endDate}
                      size='small'
                      />
                  </MuiPickersUtilsProvider>
                  <BiMinusCircle className='remove-icon pointer' onClick={() => removeItem(date, i, 'date')} />
                </div>
          
                <div className='input-form adress-line'>
                  <TextField
                      id="place"
                      name="place"
                      label="Lieu"
                      className="line full-width"
                      size="small"
                      onChange={handleItem({type: 'place', i, item: 'date'})}
                      value={show.dates[i].place}
                    />
                    <TextField
                      id='city'
                      name="city"
                      label="Ville"
                      className="line full-width"
                      size="small"
                      onChange={handleItem({type: 'city', i, item: 'date'})}
                      value={show.dates[i].city}
                    />
                </div>
                <div className="input-form">
                  <TextField
                    id="address"
                    name="address"
                    label="Adresse"
                    className="input-form full-width"
                    size="small"
                    onChange={handleItem({type: 'address', i, item: 'date'})}
                    value={show.dates[i].address}
                  />
                </div>
              </div>
            ))}

            <button className='add-date pointer' onClick={(e) => addItem(e, 'date')}> <IoIosAdd /> Ajouter une date</button>
            </div>

            <div className='pictures-div'>
            <h4>Télécharger des photos</h4> 
        
                <div className="upload-multiple-pictures">
                  <input onChange={fileSelectedHandler} type="file" name="file" id="file" className="inputfile" multiple />
                  <label htmlFor="file" className='label'>
                  <IoIosAdd className='plus-icon' />
                    Ajouter des photos</label>
                </div>
                <ul className='no-list-style picture-names-list'>
                {pictureNames.map(name => (
                  <li key={name}>{name} <VscClose className='delete-picture pointer' onClick={deletePicture} /> </li>
                ))}
                </ul>
            </div>
          </div>

          <div className='div-links'>
              <h4>Liens</h4>
              {links.map((link, i) => (
                <div key={link} className='links'>
                  <div id="name">
                  <TextField
                    name="name"
                    label="Nom"
                    className='input-form full-width'
                    size="small"
                    value={show.links[0].name}
                    onChange={handleItem({type: 'name', i, item: 'link'})}
                    />
                  </div>
                  <div id="link">
                    <TextField
                      name="link"
                      label="Lien"
                      className='input-form full-width'
                      size="small"
                      value={show.links[0].link}
                      onChange={handleItem({type: 'link', i, item: 'link'})}
                      />
                  </div>
                  <div id="type">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                      id="demo-simple-select"
                      name="link"
                      value={show.links[0].type}
                      onChange={handleItem({type: 'type', i, item: 'link'})}
                      >
                      <MenuItem value={"pdf"}>Pdf</MenuItem>
                      <MenuItem value={"video"}>Video</MenuItem>
                      <MenuItem value={"url"}>Url</MenuItem>
                    </Select>
                  </FormControl>
                  {/* NEED TO CHECK THIS PART */}
                  </div>
                  <BiMinusCircle className='remove-icon pointer' onClick={() => removeItem(link, i, 'link')} />
                </div>
              ))}
              <button className='add-date pointer' onClick={(e) => addItem(e, 'link')}> <IoIosAdd /> Ajouter un lien</button>
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