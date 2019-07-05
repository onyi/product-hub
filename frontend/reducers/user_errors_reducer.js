import {
  RECEIVE_USER_ERRORS,
  REMOVE_USER_ERRORS
} from '../actions/user_action';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER_ERRORS:
      return [...action.errors];
    case REMOVE_USER_ERRORS:
      return [];
    default:
      return state;
  }
};
