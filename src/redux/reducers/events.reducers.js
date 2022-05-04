const initialState = [];

export const SAVE_EVENTS = "SAVE_EVENTS";
export const SAVE_EVENT = "SAVE_EVENT";
export const EDIT_EVENT = "EDIT_EVENT";
export const DELETE_EVENT = "DELETE_EVENT";

export function eventsReducer(state = initialState, action) {
  let eventsArray = [...state];
  switch(action.type){
    case SAVE_EVENTS:
      return action.events;
    case SAVE_EVENT:
      let array = [...state];
      array.push(action.event)
      return array;
    case EDIT_EVENT:
      const indexToEdit = eventsArray.findIndex(item => {
        return item._id === action.event._id;
      });
      eventsArray[indexToEdit] = action.event;
      return eventsArray;
    case DELETE_EVENT:
      const indexToDelete = eventsArray.findIndex(item => {
        return item._id === action.id;
      });
      eventsArray.splice(indexToDelete, 1);
      return eventsArray;
    default: 
      return state ;
  };
};