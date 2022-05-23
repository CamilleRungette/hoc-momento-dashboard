import React, { useState, useEffect } from "react";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import axios from "axios";
import { connect } from "react-redux";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  showActions,
  url,
  TextField,
  DateFnsUtils,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Editor,
  EditorState,
  draftToHtml,
  convertToRaw,
  IoIosAdd,
  BiMinusCircle,
  htmlToDraft,
  ContentState,
} from "./_index";
import { Navigate, useParams } from "react-router-dom";

const EditShow = ({ showAlert, shows, updateShowComp }) => {
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

  const initialShow = {
    title: "",
    description: "",
    dates: [initDate],
    gallery: [],
    links: [initLink],
  };

  const initDates = [Math.floor(Math.random() * 1000000)];
  const initLinks = [Math.floor(Math.random() * 1000000)];

  const id = useParams().id;
  const showInfos = shows.filter((show) => show._id === id)[0];

  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [show, setShow] = useState(initialShow);
  const [dates, setDates] = useState(initDates);
  const [links, setLinks] = useState(initLinks);

  useEffect(() => {
    if (showInfos) {
      if (showInfos?.description) {
        let contentState = ContentState.createFromBlockArray(
          htmlToDraft(showInfos.description).contentBlocks
        );
        setEditorState(EditorState.createWithContent(contentState));
      }

      let showCopy = { ...showInfos };
      if (!showCopy.dates.length) showCopy.dates = [initDate];
      if (!showCopy.links.length) showCopy.links = [initLink];
      setShow(showCopy);
      setDates(
        showCopy.dates.map(() => {
          return Math.floor(Math.random() * 1000000);
        })
      );
      setLinks(
        showCopy.links.map(() => {
          return Math.floor(Math.random() * 1000000);
        })
      );
    }
  }, [showInfos]);

  const handleState = (prop) => (e) => {
    setShow({ ...show, [prop]: e.target.value });
  };

  const onEditorStateChange = (content) => {
    setEditorState(content);
  };

  const handleItem = (prop) => (e) => {
    if (prop.item === "date") {
      let datesState = [...show.dates];

      if (!datesState[prop.i]) {
        datesState[prop.i] = initDate;
      }

      if (prop.type === "startDate" || prop.type === "endDate") {
        let month =
          e.getMonth() + 1 < 10 ? `0${e.getMonth() + 1}` : e.getMonth() + 1;

        datesState[prop.i][
          prop.type
        ] = `${e.getFullYear()}-${month}-${e.getDate()}`;
      } else datesState[prop.i][prop.type] = e.target.value;

      setShow({ ...show, dates: datesState });
    } else {
      let linksState = [...show.links];

      if (!linksState[prop.i]) {
        linksState[prop.i] = initLink;
      }

      linksState[prop.i][prop.type] = e.target.value;

      setShow({ ...show, links: linksState });
    }
  };

  const addItem = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    let showCopy = { ...show };

    if (type === "date") {
      setDates([...dates, Math.floor(Math.random() * 1000000)]);
      showCopy.dates.push(initDate);
      setShow({ ...show, dates: showCopy.dates });
    } else {
      setLinks([...links, Math.floor(Math.random() * 1000000)]);
      showCopy.links.push(initLink);
      setShow({ ...show, links: showCopy.links });
    }

    setShow(showCopy);
  };

  const removeItem = (id, index, type) => {
    let showArray = { ...show };

    if (type === "date") {
      let datesArray = [...dates];
      datesArray = datesArray.filter((date) => date !== id);
      setDates(datesArray);

      showArray.dates.splice(index, 1);
      setShow({ ...show, dates: showArray.dates });
    } else {
      let linksArray = [...links];
      linksArray = linksArray.filter((link) => link !== id);
      setLinks(linksArray);

      showArray.links.splice(index, 1);
      setShow({ ...show, links: showArray.links });
    }

    setShow(showArray);
  };

  const saveShow = async (e) => {
    e.preventDefault();

    let finalShow = { ...show };
    finalShow.description = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );

    if (!finalShow.title || finalShow.description === "<p></p>\n") {
      showAlert(
        "warning",
        'Les champs "Titre" et "Description" sont obligatoires'
      );
    } else {
      setLoading(true);

      if (
        finalShow.dates.length === 1 &&
        JSON.stringify(finalShow.dates[0]) === JSON.stringify(initDate)
      ) {
        finalShow.dates = [];
      }
      if (
        finalShow.links.length === 1 &&
        JSON.stringify(finalShow.links[0]) === JSON.stringify(initLink)
      ) {
        finalShow.links = [];
      }

      axios
        .post(`${url}/dashboard/edit-show`, finalShow)
        .then((res) => {
          setRedirect(true);
          updateShowComp(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          showAlert(
            "error",
            "Erreur lors de la modification du spectacle, veuillez réessayer plus tard"
          );
        });
    }
  };

  const cancelEdit = (e) => {
    e.preventDefault();
    setLoading(false);
    setShow(initialShow);
    setDates(initDates);
    setLinks(initLinks);
  };

  return !redirect ? (
    <div className="inside-app edit-show-main">
      <div className="card">
        <h3>Modifier le spectacle: {show.title}</h3>

        <form className="show-form" onSubmit={saveShow}>
          <TextField
            id="title"
            label="Titre"
            value={show.title}
            onChange={handleState("title")}
            className="input-form full-width"
          />

          <h4>Description</h4>
          <div className="editor-div input-form">
            <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={onEditorStateChange}
              toolbar={{
                options: ["inline", "list", "textAlign", "history"],
                inline: {
                  options: [
                    "bold",
                    "italic",
                    "underline",
                    "superscript",
                    "subscript",
                  ],
                },
                list: {
                  options: ["unordered", "ordered"],
                },
              }}
            />
          </div>

          <div className="dates-div">
            <h4>Dates</h4>

            {dates.map((date, i) => (
              <div key={date} className="dates">
                <div className="date-picker-div input-form ">
                  <MuiPickersUtilsProvider
                    utils={DateFnsUtils}
                    className="date-picker"
                  >
                    <DatePicker
                      autoOk
                      label="Début"
                      inputVariant="outlined"
                      ampm={false}
                      format="dd/MM/yyyy"
                      onChange={handleItem({
                        type: "startDate",
                        i,
                        item: "date",
                      })}
                      value={show.dates[i].startDate}
                    />
                  </MuiPickersUtilsProvider>

                  <MuiPickersUtilsProvider
                    utils={DateFnsUtils}
                    className="date-picker"
                  >
                    <DatePicker
                      autoOk
                      label="Fin"
                      inputVariant="outlined"
                      ampm={false}
                      format="dd/MM/yyyy"
                      onChange={handleItem({
                        type: "endDate",
                        i,
                        item: "date",
                      })}
                      value={show.dates[i].endDate}
                    />
                  </MuiPickersUtilsProvider>
                  <BiMinusCircle
                    title="Supprimer cette date"
                    className="remove-icon pointer"
                    onClick={() => removeItem(date, i, "date")}
                  />
                </div>

                <div className="input-form adress-line">
                  <TextField
                    id="place"
                    name="place"
                    label="Lieu"
                    className="line full-width"
                    onChange={handleItem({ type: "place", i, item: "date" })}
                    value={show.dates[i].place}
                  />
                  <TextField
                    id="city"
                    name="city"
                    label="Ville"
                    className="line full-width"
                    onChange={handleItem({ type: "city", i, item: "date" })}
                    value={show.dates[i].city}
                  />
                </div>
                <div className="input-form">
                  <TextField
                    id="address"
                    name="address"
                    label="Adresse"
                    className="input-form full-width"
                    onChange={handleItem({ type: "address", i, item: "date" })}
                    value={show.dates[i].address}
                  />
                </div>
              </div>
            ))}

            <button
              className="add-date pointer"
              onClick={(e) => addItem(e, "date")}
            >
              {" "}
              <IoIosAdd /> Ajouter une date
            </button>
          </div>

          <div className="div-links">
            <h4>Liens</h4>
            {links.map((link, i) => (
              <div key={link} className="links">
                <div id="name">
                  <TextField
                    name="name"
                    label="Nom"
                    className="input-form full-width"
                    value={show.links[i].name}
                    onChange={handleItem({ type: "name", i, item: "link" })}
                  />
                </div>
                <div id="link">
                  <TextField
                    name="link"
                    label="Lien"
                    className="input-form full-width"
                    value={show.links[i].link}
                    onChange={handleItem({ type: "link", i, item: "link" })}
                  />
                </div>
                <div id="type">
                  <FormControl fullWidth className="input-form full-width">
                    <InputLabel>Type</InputLabel>
                    <Select
                      className="small"
                      name="link"
                      value={show.links[i].type}
                      onChange={handleItem({ type: "type", i, item: "link" })}
                    >
                      <MenuItem value={"pdf"}>Pdf</MenuItem>
                      <MenuItem value={"video"}>Video</MenuItem>
                      <MenuItem value={"url"}>Url</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <BiMinusCircle
                  title="Supprimer ce lien"
                  className="remove-icon pointer"
                  onClick={() => removeItem(link, i, "link")}
                />
              </div>
            ))}
            <button
              className="add-date pointer"
              onClick={(e) => addItem(e, "link")}
            >
              {" "}
              <IoIosAdd /> Ajouter un lien
            </button>
          </div>
          <div className="btn-div btn-div-form">
            <button className="btn-grey-outlined" onClick={cancelEdit}>
              Annuler
            </button>
            {!loading ? (
              <button className="btn">Enregistrer</button>
            ) : (
              <button disabled className="btn-grey">
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
    </div>
  ) : (
    <Navigate replace to="/spectacles" />
  );
};

export default connect(
  (state) => ({
    shows: state.showsReducer,
  }),
  (dispatch) => ({
    updateShowComp: (data) => dispatch(showActions.editShow(data)),
  })
)(EditShow);
