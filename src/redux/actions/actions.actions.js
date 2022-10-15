import {
  SAVE_ACTIONS,
  SAVE_ACTION,
  EDIT_ACTION,
  DELETE_ACTION,
} from "../reducers/actions.reducer";

const saveActions = (data) => ({
  type: SAVE_ACTIONS,
  actions: data,
});

const saveAction = (data) => ({
  type: SAVE_ACTION,
  action: data,
});

const editAction = (data) => ({
  type: EDIT_ACTION,
  action: data,
});

const deleteAction = (data) => ({
  type: DELETE_ACTION,
  id: data,
});

const functions = { saveActions, saveAction, editAction, deleteAction };
export default functions;
