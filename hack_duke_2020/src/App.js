import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import {
  CustomerLogin,
  Customers,
  Maps,
  Businesses,
  ConfirmPurchase,
  BusinessPage,
} from "./components";
import Navbar from "react-bootstrap/NavBar";
import Nav from "react-bootstrap/Nav";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar expand="lg">
          <Container>
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/customer">Login as Customer</Nav.Link>
              <Nav.Link href="/business">Login as Business</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Switch>
          <Route exact path="/customer" component={CustomerLogin} />
          <Route path="/customer/:name" component={Customers} />
          <Route exact path="/business" component={Businesses} />
          <Route path="/business/:name" component={BusinessPage} />
          <Route path="/confirm/:storeName" component={ConfirmPurchase} />
          <Route path="/maps/:name" component={Maps} />
          <Route path="/" component={Maps} />
        </Switch>
      </div>
    );
  }
}

export default App;
