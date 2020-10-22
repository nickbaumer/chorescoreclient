import { combineReducers } from "redux";
import chores from "./choreReducer";
import users from "./userReducer";
import currentUser from "./currentUserReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  chores: chores,
  users: users,
  currentUser: currentUser,
  apiCallsInProgress: apiCallsInProgress,
});

export default rootReducer;
