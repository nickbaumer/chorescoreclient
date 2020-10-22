import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";

export default function configureStore(initalState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redex dev tools
  return createStore(
    rootReducer,
    initalState,
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant())) // this warns us if we mutate any state
  );
}
