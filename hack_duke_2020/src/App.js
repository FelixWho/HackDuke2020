import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Customers, Businesses } from "./components";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/customers" component={Customers} />
          <Route path="/businesses" component={Businesses} />
          <Route path="/" component={() => <div>Landing Page</div>} />
        </Switch>
      </div>
    );
  }
}

export default App;
