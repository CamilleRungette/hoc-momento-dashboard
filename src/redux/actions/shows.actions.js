import { SAVE_SHOWS, SAVE_SHOW, EDIT_SHOW, DELETE_SHOW } from "../reducers/shows.reducer";

const saveShows = data =>({
  type: SAVE_SHOWS,
  shows: data
});

const saveShow = data =>({
  type: SAVE_SHOW,
  show: data
});

const editShow = data => ({
  type: EDIT_SHOW, 
  show: data
});

const deleteShow = data => ({
  type: DELETE_SHOW, 
  id: data
});

export default {saveShows, saveShow, editShow,deleteShow};