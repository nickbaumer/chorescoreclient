import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function choreReducer(state = initialState.chores, action) {
  switch (action.type) {
    case types.LOAD_CHORES_SUCCESS:
      return action.chores;
    case types.CREATE_CHORE_SUCCESS:
      return [...state, { ...action.chore }];
    default:
      return state;
  }
}
