import { SAVE_EVENTS, SAVE_EVENT } from "../reducers/events.reducers";

const saveEvents = data =>( {
  type: SAVE_EVENTS,
  events: data
});

const saveEvent = data =>( {
  type: SAVE_EVENT,
  event: data
});

export default {saveEvents,saveEvent};