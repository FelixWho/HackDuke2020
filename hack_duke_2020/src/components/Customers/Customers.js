import React, { Component } from "react";
import { Container, Nav, Button, InputGroup, FormControl } from "react-bootstrap";
import "./Customers.css";

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  handleSearch = () => {
    
  }

  render() {
    return (
      <Container className="Customers">
        <h1>Customers Page</h1>
        <div className="d-flex">
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-default">Search Items</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
            <InputGroup.Append>
              <Button onClick={this.handleSearch}> 
                Search 
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </Container>
    );
  }
}

export default Customers;
