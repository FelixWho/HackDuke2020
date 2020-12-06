import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import firebase from "../../Firebase/firebase.js"
import { BrowserRouter as Router, Route, Link, useParams } from "react-router-dom";

const Business = () => {
    let db = firebase.db;
    let { storeName } = useParams()
    return (
      <Container className="Business">
        <div>
          You have confirmed a purchase with {storeName.replaceAll("-", " ")}!
        </div>
      </Container>
    );
  }
  
  export default Business;