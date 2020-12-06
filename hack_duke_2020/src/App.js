import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { CustomerLogin, Customers, Maps, Businesses, BusinessPage } from "./components";
import Navbar from "react-bootstrap/NavBar";
import Nav from "react-bootstrap/Nav";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar bg="dark" expand="lg" variant="dark">
          <Navbar.Brand href="/home"></Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
          </Nav>
        </Navbar>
        <Switch>
          <Route path="/maps" component={Maps} />
          <Route path="/customers" component={CustomerLogin} />
          <Route path="/businesses" component={Businesses} />
          <Route path="/business/:name" component={BusinessPage} />
          <Route path="/customer/:name" component={Customers} />
          <Route path="/" component={Maps} />
        </Switch>
      </div>
    );
  }
}

export default App;
