import React, { Component } from "react";
import { Container } from "react-bootstrap";
import GoogleMap from "./GoogleMap";
import "./Maps.css";

class Customers extends Component {
  constructor(props) {
    super(props);

    /*place ids, current person*/
    console.log("IN CUSTOMERS")
    console.log(props)
    this.state = {
     
      name: props.match.params.name
    };
  }
  render() {
    return (
      <div>
         <GoogleMap name={this.state.name}></GoogleMap>
         <Container className="Customers">
          <h1>Customers Page</h1>
        </Container>
      </div>
      
      
    );
  }
}

export default Customers;
