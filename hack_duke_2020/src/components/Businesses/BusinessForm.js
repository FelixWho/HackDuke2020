import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

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
        <form action={"http://localhost:3000/business/"+this.state.value}>
          <div>
          <label>
            Business:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          </div>
          <div>
          <label>
            Password:
            <input type="password"/>
          </label>
          </div>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }
  