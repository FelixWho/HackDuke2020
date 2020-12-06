import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import firebase from "../../Firebase/firebase.js"

export default class ChangeDiscount extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: this.props.discount, store: this.props.store};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.WriteUserData = this.WriteUserData.bind(this);
    }
  
    WriteUserData() {
        firebase.db.ref(`Stores/${this.state.store}`).update({
          discount: this.state.value
        });
    }

    handleChange(event) {
      this.setState({value: event.target.value}, () => {this.WriteUserData()});
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
          <label>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
            <div style={{fontSize: "2.5em"}}>% off for customers supporting your territory</div>
          </label>
      );
    }
  }
  