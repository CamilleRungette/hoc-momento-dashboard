import React, { useState, useRef } from 'react';
import {
  MuiPickersUtilsProvider,
  DatePicker
} from '@material-ui/pickers';
import axios from "axios";
import { connect } from 'react-redux';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { showActions, Alert, TextField, url, DateFnsUtils, IoIosAdd, BiMinusCircle, VscClose, Editor,
EditorState, convertToRaw, draftToHtml, Select, MenuItem, InputLabel, FormControl, Navigate} from './_index';

const CreateShows = ({saveShowComp}) => {

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

  const alertRef = useRef();
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [show, setShow] = useState(initialState);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [pictures, setPictures] = useState([]);
  const [pictureNames, setPictureNames] = useState([]);
  const [dates, setDates] = useState(initDates);
  const [links, setLinks] = useState(initLinks);
  const [alert, setAlert] = useState({
    type: "info",
    message: ""
  });
  
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
      let linksState = [...show.links];

      if (!linksState[prop.i]) {
        linksState[prop.i] = initLink;
      };

      linksState[prop.i][prop.type] = e.target.value; 

      setShow({...show, links: linksState});
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
  
  const deletePicture = (i) => {
    let picturesCopy = [...pictures];
    let pictureNamesCopy = [...pictureNames];

    picturesCopy.splice(i, 1);
    pictureNamesCopy.splice(i, 1);
    
    setPictures(picturesCopy);
    setPictureNames(pictureNamesCopy);
  };


  const showAlert = (type, message) => {
    setAlert({type, message});
    alertRef.current.showAlert();
  };

  const saveShow = async (e) => {
    e.preventDefault();
    
    setLoading(true);

    let finalShow = {...show};
    finalShow.description = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    if (!finalShow.title || finalShow.description === "<p></p>\n"){
      showAlert('warning', 'Les champs "Titre" et "description" sont obligatoires');
    } else {
      let promises = pictures.map(async picture => {
        let result = await axios.post(process.env.REACT_APP_CLOUDINARY, picture);
        return result.data.secure_url;
      });
      
      if (finalShow.dates.length === 1 && JSON.stringify(finalShow.dates[0]) == JSON.stringify(initDate)) finalShow.dates = [];
      if (finalShow.links.length === 1 && JSON.stringify(finalShow.links[0]) == JSON.stringify(initLink)) finalShow.links = [];
      
      if (pictures.length){
        Promise.all(promises).then(values => {
          finalShow.gallery = values;
  
          axios.post(`${url}/dashboard/create-show`, finalShow)
          .then(res => {
            saveShowComp(res.data);
            showAlert("success", "Le spectacle a bien été créé");
            setTimeout(function(){
              setRedirect(true);
            }, [2000]);
          })
          .catch(err => {
            console.log(err);
            showAlert("error", "Erreur lors de la création du spectacle, veuillez réessayer plus tard");
          });
        })
        .catch(error => {
          console.log(error);
          showAlert("error", "Erreur lors du téléchargement des photos, veuillez réessayer plus tard");
        })
      } else {
        axios.post(`${url}/dashboard/create-show`, finalShow)
        .then(res => {
          saveShowComp(res.data);
          showAlert("success", "Le spectacle a bien été créé");
          setTimeout(function(){
            setRedirect(true);
          }, [2000]);      
        })
        .catch(err => {
          console.log(err);
          showAlert("error", "Erreur lors de la création du spectacle, veuillez réessayer plus tard");
        });
      };
    };
  };
  
  
  return !redirect ?  (
    <div className='inside-app'>
      <div className='card card-main create-show-main'>
        <h3>Créer un spectacle</h3>

        <form className='show-form' onSubmit={saveShow}>

          <TextField
            id="title"
            label="Titre"
            value={show.title}
            onChange={handleState('title')}
            className='input-form full-width'
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
                <div className='date-picker-div input-form '>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} className="date-picker">
                    <DatePicker
                      autoOk
                      label="Début"
                      inputVariant='outlined'
                      ampm={false}
                      format="dd/MM/yyyy"
                      size="small"
                      onChange={handleItem({type: 'startDate', i, item: 'date'})}
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
                {pictureNames.map((name, i) => (
                  <li key={name}>{name} <VscClose className='delete-picture pointer' onClick={() => deletePicture(i)} /> </li>
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
                    value={show.links[i].name}
                    onChange={handleItem({type: 'name', i, item: 'link'})}
                    />
                  </div>
                  <div id="link">
                    <TextField
                      name="link"
                      label="Lien"
                      className='input-form full-width'
                      size="small"
                      value={show.links[i].link}
                      onChange={handleItem({type: 'link', i, item: 'link'})}
                      />
                  </div>
                  <div id="type">
                  <FormControl fullWidth size="small" className='input-form full-width'>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                      id="demo-simple-select"
                      name="link"
                      value={show.links[i].type}
                      onChange={handleItem({type: 'type', i, item: 'link'})}
                      >
                      <MenuItem value={"pdf"}>Pdf</MenuItem>
                      <MenuItem value={"video"}>Video</MenuItem>
                      <MenuItem value={"url"}>Url</MenuItem>
                    </Select>
                  </FormControl>
                  </div>
                  <BiMinusCircle className='remove-icon pointer' onClick={() => removeItem(link, i, 'link')} />
                </div>
              ))}
              <button className='add-date pointer' onClick={(e) => addItem(e, 'link')}> <IoIosAdd /> Ajouter un lien</button>
          </div>
          <div className='btn-div'>
            {!loading ? (
              <button className='btn'> Créer</button>
            ) : (
              <button className='btn-grey loading-btn'>
                <div className='loading-div'><img src="/images/loading-btn.gif" alt="Loading ... " /> </div>
                Créer
              </button>
            )}
          </div>
        </form>
      <Alert ref={alertRef} type={alert.type} message={alert.message} />
      </div>
    </div>
  ) : (
    <Navigate replace to="/spectacles" />
  )
};

export default connect(
  (state => ({})),
  (dispatch => ({
    saveShowComp: data => dispatch(showActions.saveShow(data))
  }))
) (CreateShows);