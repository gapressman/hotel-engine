import React from "react";
import { Search } from "./components/Search";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Repository } from "./components/Repository";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/repositories/:owner/:repo" component={Repository} />
        <Route path="/" component={Search} />
      </Switch>
    </Router>
  );
}

export default App;
