import * as types from "./actionTypes";
import * as choreApi from "../../api/choreApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadChoresSuccess(chores) {
  return { type: types.LOAD_CHORES_SUCCESS, chores };
}

export function createChoreSuccess(chore) {
  return { type: types.CREATE_CHORE_SUCCESS, chore };
}

export function updateStats(chores) {
  return { type: types.UPDATE_USER_STATS, chores };
}

export function loadChores() {
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return choreApi
      .getChores()
      .then((chores) => {
        dispatch(loadChoresSuccess(chores));
      })
      .catch((error) => {
        dispatch(apiCallError());
        throw error;
      })
      .then(() => {
        dispatch(updateStats(getState().chores));
      });
  };
}

export function saveChore(chore) {
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return choreApi
      .saveChore(chore)
      .then((savedChore) => {
        dispatch(createChoreSuccess(savedChore));
      })
      .catch((error) => {
        dispatch(apiCallError());
        throw error;
      })
      .then(() => {
        dispatch(updateStats(getState().chores));
      });
  };
}
