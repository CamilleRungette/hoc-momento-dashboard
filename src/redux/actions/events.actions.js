import { SAVE_EVENTS } from "../reducers/events.reducers";

const saveEvents = data =>( {
  type: SAVE_EVENTS,
  events: data
});

export default {saveEvents};