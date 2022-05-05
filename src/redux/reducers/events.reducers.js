const initialState = [];

export const SAVE_EVENTS = "SAVE_EVENTS";
export const SAVE_EVENT = "SAVE_EVENT";
export const EDIT_EVENT = "EDIT_EVENT";
export const DELETE_EVENT = "DELETE_EVENT";

const findIndex = (events, id) => {
  let index = events.map(event => event._id).indexOf(id);
  return index;
};

export function eventsReducer(state = initialState, action) {
  let eventsArray =  [...state];
  switch(action.type){
    case SAVE_EVENTS:
      return action.events;
    case SAVE_EVENT:
      eventsArray.push(action.event);
      return eventsArray;
    case EDIT_EVENT:
      let indexToEdit = findIndex(eventsArray, action.event._id);
      eventsArray[indexToEdit] = action.event; 
      return eventsArray;
    case DELETE_EVENT:
      let indexToDelete = findIndex(eventsArray, action.id)
      eventsArray.splice(indexToDelete, 1);
      return eventsArray;
    default: 
      return state ;
  };
};