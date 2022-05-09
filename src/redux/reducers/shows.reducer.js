const initialState = [];

export const SAVE_SHOWS = "SAVE_SHOWS";
export const SAVE_SHOW = "SAVE_SHOW";
export const EDIT_SHOW = "EDIT_SHOW";
export const DELETE_SHOW = "DELETE_SHOW";

const findIndex = (shows, id) => {
  let index = shows.map(show => show._id).indexOf(id);
  return index;
};

export function showsReducer(state = initialState, action) {
  let showsArray =  [...state];
  switch(action.type){
    case SAVE_SHOWS:
      return action.shows;
    case SAVE_SHOW:
      showsArray.push(action.show);
      console.log(showsArray);
      return showsArray;
    case EDIT_SHOW:
      let indexToEdit = findIndex(showsArray, action.show._id);
      showsArray[indexToEdit] = action.show; 
      return showsArray;
    case DELETE_SHOW:
      let indexToDelete = findIndex(showsArray, action.id)
      showsArray.splice(indexToDelete, 1);
      return showsArray;
    default: 
      return state ;
  };
};