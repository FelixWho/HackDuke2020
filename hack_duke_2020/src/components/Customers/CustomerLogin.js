import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import firebase from "../../Firebase/firebase.js"
import LoginForm from "./LoginForm"

function CustomerLogin() {
  let db = firebase.db;
  let businessRef = db.ref('Customers');
  let [businessData, setBusinessData] = useState({});
  useEffect(() => {
    businessRef.on('value', snapshot => {
      setBusinessData(snapshot.val());
    })
  }, [])

  return (
    <Container className="CustomerLogin">
      <LoginForm></LoginForm>
    </Container>
  );
}

export default CustomerLogin;
