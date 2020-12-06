import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import firebase from "../../Firebase/firebase.js";
import LoginForm from "./LoginForm";
import "./CustomerLogin.css";

function CustomerLogin() {
  let db = firebase.db;
  let businessRef = db.ref("Customers");
  let [businessData, setBusinessData] = useState({});
  useEffect(() => {
    businessRef.on("value", (snapshot) => {
      setBusinessData(snapshot.val());
    });
  }, []);

  return (
    <Container className="CustomerLogin">
      <div class="box">
        <h1>Login</h1>
        <LoginForm />
      </div>
    </Container>
  );
}

export default CustomerLogin;
