import React from "react";
import { Route, Switch } from "react-router-dom";
import PageNotFound from "../PageNotFound";
import ChoresPage from "./chores/ChoresPage";
// eslint-disable-next-line import/no-named-as-default
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ComparePage from "./chores/ComparePage";

function App() {
  return (
    <div className="container-fluid">
      {/* <Header /> */}
      <Switch>
        <Route exact path="/" component={ChoresPage} />
        <Route path="/compare" component={ComparePage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
