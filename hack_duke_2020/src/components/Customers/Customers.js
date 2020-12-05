import React, { Component } from "react";
import { Container } from "react-bootstrap";
import GoogleMap from "./GoogleMap";
import "./Customers.css";

class Customers extends Component {
  render() {
    return (
      <div>
         <GoogleMap></GoogleMap>
         <Container className="Customers">
          <h1>Customers Page</h1>

       
        
        </Container>
      </div>
      
      
    );
  }
}

export default Customers;
