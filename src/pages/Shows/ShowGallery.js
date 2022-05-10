import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { initialShowState, IoIosArrowBack, BsTrash, IoIosAdd } from './_index';
import { Link } from 'react-router-dom';

const ShowGallery = ({shows}) => {

  const params = useParams();
  const [show, setShow] = useState(initialShowState.initialShow);

  useEffect(() => {
    if (shows.length) setShow(shows.filter(item => item._id === params.id)[0]);
  }, [shows]);

  const deletePicture = (photo) => {
    let galleryCopy = [...show.gallery];
    galleryCopy = galleryCopy.filter(item => item !== photo);
    setShow({...show, gallery: galleryCopy})
  };

  return (
    <div className='inside-app'>
      <div className='card card-main photo-gallery'>
        <h2>{show.title} - Gallerie photo </h2>
        <div className='div-buttons'>
          <div className="go-back-div"><Link to="/spectacles" ><button className='btn-grey-outlined go-back'> <IoIosArrowBack/> Retour</button> </Link></div>
          
          <button className='btn-grey-outlined save'> Enregistrer </button>
          
          <div className="upload-multiple-pictures">
            <input type="file" name="file" id="file" className="inputfile" multiple />
            <label htmlFor="file" className='label'>
            <IoIosAdd className='plus-icon' />
              Ajouter des photos</label>
          </div>        
        </div>

        <ul className='no-list-style'>
          {show.gallery.map(photo => (
            <li key={Math.floor(Math.random() * 1000000)}> <BsTrash className='delete-picture' onClick={() => deletePicture(photo)} /> <img src={photo} alt={show.title} /></li>
          ))}
        </ul>
      </div>
    </div>
  )
};


export default connect(
  (state) => ({
    shows: state.showsReducer
  })
) (ShowGallery)
