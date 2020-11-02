import React from "react";
import { Route, Switch } from "react-router-dom";
import PageNotFound from "../PageNotFound";
import ChoresPage from "./chores/ChoresPage";
import ComparePage from "./chores/ComparePage";

function App() {
  return (
    <div className="container-fluid">
      <Switch>
        <Route exact path="/" component={ChoresPage} />
        <Route path="/compare" component={ComparePage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
