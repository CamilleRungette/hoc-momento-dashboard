import {
  SAVE_EVENTS,
  SAVE_EVENT,
  DELETE_EVENT,
} from "../reducers/events.reducers";

const saveEvents = (data) => ({
  type: SAVE_EVENTS,
  events: data,
});

const saveEvent = (data) => ({
  type: SAVE_EVENT,
  event: data,
});

const deleteEvent = (data) => ({
  type: DELETE_EVENT,
  id: data,
});

const functions = { saveEvents, saveEvent, deleteEvent };
export default functions;
