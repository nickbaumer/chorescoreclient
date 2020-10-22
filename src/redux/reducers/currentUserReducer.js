import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function getCurrentUser(
  state = initialState.currentUser,
  action
) {
  if (action.type === types.GET_CURRENT_USER_SUCCESS) {
    return state;
  }
  return state;
}
