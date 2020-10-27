import * as types from "../actions/actionTypes";
import initialState from "./initialState";

function updateUserStats(users, chores) {
  if (chores.length > 0 && users.length > 0) {
    return users.map((u) => {
      return {
        ...u,
        totalChores: chores.filter((c) => c.userId === u.id).length,
      };
    });
  } else {
    return users;
  }
}

export default function userReducer(state = initialState.users, action) {
  switch (action.type) {
    case types.LOAD_USERS_SUCCESS:
      return action.users;
    case types.UPDATE_USER_STATS:
      return updateUserStats(state, action.chores);
    default:
      return state;
  }
}
