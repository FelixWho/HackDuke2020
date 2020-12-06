import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./Businesses.css";
import firebase from "../../Firebase/firebase.js"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Business = () => {
    let db = firebase.db;
    let businessRef = db.ref('Stores');
    let [businessData, setBusinessData] = useState({});
    useEffect(() => {
      businessRef.on('value', snapshot => {
        setBusinessData(snapshot.val());
      })
    }, [])
    return (
      <Container className="Business">
        <div>
          You are logged in.
        </div>
      </Container>
    );
  }
  
  export default Business;