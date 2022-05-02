import Actions from "../../pages/Actions";

const initialState = {
  events: []
};

export const SAVE_EVENTS = "SAVE_EVENTS";
export const SAVE_EVENT = "SAVE_EVENT";

export function eventsReducer(state = initialState, action) {
  switch(action.type){
    case SAVE_EVENTS:
      return action.events;
    case SAVE_EVENT:
      
      return action.events
    default: 
      return state 
  };
};