import * as types from "./actionTypes";

export function getCurrentUser() {
  return { type: types.GET_CURRENT_USER_SUCCESS };
}
