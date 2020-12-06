import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./Businesses.css";
import firebase from "../../Firebase/firebase.js"
import BusinessForm from "./BusinessForm"

function Businesses() {
  let db = firebase.db;
  let businessRef = db.ref('Stores');
  let [businessData, setBusinessData] = useState({});
  useEffect(() => {
    businessRef.on('value', snapshot => {
      setBusinessData(snapshot.val());
    })
  }, [])

  return (
    <Container className="Businesses">
      <BusinessForm></BusinessForm>
    </Container>
  );
}

export default Businesses;
