import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <Form className="LoginForm">
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
        <Link to={"/" + this.state.value}>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Link>
      </Form>
    );
  }
}
