import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Button, Form } from "react-bootstrap";

export default class BusinessForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <Form className="LoginForm">
        <h1>Login as Business</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            size="lg"
            type="email"
            placeholder="Username"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control size="lg" type="password" placeholder="Password" />
        </Form.Group>
        <Link to={"/business/" + this.state.value}>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Link>
      </Form>
      );
    }
  }
  