import React, { Component, useEffect, useState } from "react";
import { Badge, Container, InputGroup, FormControl } from "react-bootstrap";
import Fuse from "fuse.js";
import firebase from "../../Firebase/firebase.js";
import "./Customers.css";
import SearchBar from "./SearchBar"
import { useParams } from "react-router-dom"

function Customers() {
  let db = firebase.db;
  let customerRef = db.ref('Customers');
  let [customerData, setCustomerData] = useState({});
  useEffect(() => {
    customerRef.on('value', snapshot => {
      setCustomerData(snapshot.val());
    })
  }, [])

  let { name } = useParams();
  
  let customerName = name.replaceAll("-", " ");

  return (
    <Container className="Customers">
      
      <SearchBar name={customerName}></SearchBar>
    </Container>
  );
}

export default Customers;