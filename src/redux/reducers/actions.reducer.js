const initialState = [];

export const SAVE_ACTIONS = "SAVE_ACTIONS";
export const SAVE_ACTION = "SAVE_ACTION";
export const EDIT_ACTION = "EDIT_ACTION";
export const DELETE_ACTION = "DELETE_ACTION";

const findIndex = (actions, id) => {
  let index = actions.map((action) => action._id).indexOf(id);
  return index;
};

export function actionsReducer(state = initialState, action) {
  let actionsArray = [...state];
  switch (action.type) {
    case SAVE_ACTIONS:
      return action.actions;
    case SAVE_ACTION:
      actionsArray.push(action.action);
      return actionsArray;
    case EDIT_ACTION:
      let indexToEdit = findIndex(actionsArray, action.action._id);
      actionsArray[indexToEdit] = action.action;
      return actionsArray;
    case DELETE_ACTION:
      let indexToDelete = findIndex(actionsArray, action.id);
      actionsArray.splice(indexToDelete, 1);
      return actionsArray;
    default:
      return state;
  }
}
