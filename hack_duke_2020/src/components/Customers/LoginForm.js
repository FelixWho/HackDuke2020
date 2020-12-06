import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ username: event.target.value });
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
        <Link to={"/customer/" + this.state.username}>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Link>
      </Form>
    );
  }
}
