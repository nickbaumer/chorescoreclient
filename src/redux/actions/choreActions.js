import * as types from "./actionTypes";
import * as choreApi from "../../api/choreApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadChoresSuccess(chores) {
  return { type: types.LOAD_CHORES_SUCCESS, chores };
}

export function createChoreSuccess(chore) {
  return { type: types.CREATE_CHORE_SUCCESS, chore };
}

export function loadChores() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return choreApi
      .getChores()
      .then((chores) => {
        dispatch(loadChoresSuccess(chores));
      })
      .catch((error) => {
        dispatch(apiCallError());
        throw error;
      });
  };
}

export function saveChore(chore) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return choreApi
      .saveChore(chore)
      .then((savedChore) => {
        dispatch(createChoreSuccess(savedChore));
      })
      .catch((error) => {
        dispatch(apiCallError());
        throw error;
      });
  };
}
