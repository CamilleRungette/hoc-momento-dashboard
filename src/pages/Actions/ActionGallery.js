import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { actionActions } from "./_index";
import {
  IoIosArrowBack,
  BsTrash,
  IoIosAdd,
  VscClose,
  url,
  Alert,
  showActions,
  Navigate,
  Link,
} from "./_index";

const ActionGallery = ({ actions, editActionComp }) => {
  const initialAction = {
    title: "",
    description: "",
    dates: [],
    gallery: [],
    links: [],
  };

  const { id } = useParams();
  const alertRef = useRef();
  const [action, setAction] = useState(initialAction);
  const [pictures, setPictures] = useState([]);
  const [pictureNames, setPictureNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [alert, setAlert] = useState({
    type: "info",
    message: "",
  });

  useEffect(() => {
    if (actions.length) setAction(actions.filter((item) => item._id === id)[0]);
  }, [actions, id]);

  const deletePicture = (photo, type) => {
    if (type === "old") {
      let btn = document.getElementById("save");
      if (btn.style.display === "" || btn.style.display === "none") {
        btn.style.display = "flex";
        btn.style.justifyContent = "center";
      }

      let galleryCopy = [...action.gallery];
      galleryCopy = galleryCopy.filter((item) => item !== photo);
      setAction({ ...action, gallery: galleryCopy });
    } else if (type === "new") {
      let picturesCopy = [...pictures];
      picturesCopy.splice(photo, 1);
      setPictures(picturesCopy);

      let pictureNamesCopy = [...pictureNames];
      pictureNamesCopy.splice(photo, 1);
      setPictureNames(pictureNamesCopy);
    }
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    alertRef.current.showAlert();
  };

  const fileSelectedHandler = (e) => {
    let formDatas = [...pictures];
    let picturesNamesArray = [...pictureNames];

    Object.values(e.target.files).map((value) => {
      const formData = new FormData();
      formData.append("file", value);
      formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
      formData.append("folder", "hoc-momento");

      formDatas.push(formData);
      picturesNamesArray.push(value.name);
    });
    setPictures(formDatas);
    setPictureNames(picturesNamesArray);

    let btn = document.getElementById("save");
    if (btn.style.display === "" || btn.style.display === "none") {
      btn.style.display = "flex";
      btn.style.justifyContent = "center";
    }
  };

  const savePictures = () => {
    setLoading(true);

    if (pictures.length) {
      let galleryCopy = [...action.gallery];
      let promises = pictures.map(async (picture) => {
        let result = await axios.post(
          process.env.REACT_APP_CLOUDINARY,
          picture
        );
        return result.data.secure_url;
      });

      Promise.all(promises).then((values) => {
        values.forEach((value) => galleryCopy.push(value));

        axios
          .post(`${url}/dashboard/edit-gallery`, {
            type: "action",
            _id: action._id,
            gallery: galleryCopy,
          })
          .then((res) => {
            editActionComp(res.data);
            showAlert("success", "La gallerie photo a bien été mise à jour");
            setLoading(false);
            setTimeout(function () {
              setRedirect(true);
            }, 1000);
          })
          .catch((error) => {
            console.log(error);
            showAlert(
              "error",
              "Erreur lors de la mise à jour de la gallerie photo, veuillez réessayer plus tard"
            );
          });
      });
    } else {
      axios
        .post(`${url}/dashboard/edit-gallery`, {
          type: "action",
          _id: action._id,
          gallery: action.gallery,
        })
        .then((res) => {
          editActionComp(res.data);
          showAlert("success", "La gallerie photo a bien été mise à jour");
          setLoading(false);
          setTimeout(function () {
            setRedirect(true);
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
          showAlert(
            "error",
            "Erreur lors de la mise à jour de la gallerie photo, veuillez réessayer plus tard"
          );
        });
    }
  };

  return !redirect ? (
    <div className="inside-app">
      <div className="card card-main photo-gallery">
        <h2>{action.place} - Gallerie photos </h2>
        <div className="div-buttons">
          <div className="go-back-div">
            <Link to="/actions-culturelles">
              <button className="btn-grey-outlined go-back">
                <IoIosArrowBack /> Retour
              </button>
            </Link>
          </div>

          <div className="upload-multiple-pictures">
            <input
              type="file"
              name="file"
              id="file"
              className="inputfile"
              onChange={fileSelectedHandler}
              multiple
            />
            <label htmlFor="file" className="label">
              {loading ? (
                <img
                  src="/images/loading-btn.gif"
                  alt="Modification en cours..."
                  className="loading-gif"
                />
              ) : (
                <IoIosAdd className="plus-icon" />
              )}
              Ajouter des photos
            </label>
          </div>

          <div className="save-div loading-div">
            {!loading ? (
              <button
                id="save"
                className="btn-outlined save"
                onClick={savePictures}
                disabled={loading}
              >
                {" "}
                Enregistrer{" "}
              </button>
            ) : (
              <button className="btn-grey loading-btn save" disabled>
                Enregistrer
              </button>
            )}
          </div>
        </div>

        <ul className="no-list-style new-photos-list">
          {pictureNames.map((name, i) => (
            <li key={Math.floor(Math.random() * 1000000)}>
              {name}{" "}
              <VscClose
                className="pointer"
                onClick={() => deletePicture(i, "new")}
              />{" "}
            </li>
          ))}
        </ul>

        <ul className="no-list-style photos-list">
          {action.gallery.map((photo) => (
            <li key={Math.floor(Math.random() * 1000000)}>
              {" "}
              <BsTrash
                className="delete-picture"
                onClick={() => deletePicture(photo, "old")}
              />{" "}
              <img src={photo} alt={action.place} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <Navigate replace to="/actions" />
  );
};

export default connect(
  (state) => ({
    actions: state.actionsReducer,
  }),
  (dispatch) => ({
    editActionComp: (data) => dispatch(actionActions.editAction(data)),
  })
)(ActionGallery);
