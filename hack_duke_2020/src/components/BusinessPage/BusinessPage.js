import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import firebase from "../../Firebase/firebase.js"
import { useParams } from "react-router-dom"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

function BusinessPage() {
  let db = firebase.db;
  let { name } = useParams();
  let businessName = name.replaceAll("-", " ");
  let businessRef = db.ref(`Stores/${businessName}`);
  let [businessData, setBusinessData] = useState(null);

  useEffect(() => {
    businessRef.on('value', snapshot => {
      setBusinessData(snapshot.val());
    })
  }, [])
  console.log(businessData);
  if (businessData != null) {
    return (
      <Container fluid>
        {Object.entries(businessData.Inventory).map(business => (
          <Row md={3} lg={3} style={{height: "30vh"}}>
            <Col className="my-auto" style={{fontSize: "2.5em"}}><div>{business[0]}</div></Col>
            <Col className="my-auto" style={{fontSize: "2.5em"}}><div>${business[1].Price.toFixed(2)}</div></Col>
            <Col className="my-auto"><img src={business[1].url} style={{maxWidth: "80vw", maxHeight: "25vh", borderRadius: "20px"}}/></Col>
          </Row>
        ))
        }
      </Container>
    );
  } else {
    return (
      <Container>
        Loading...
      </Container>
    )
  }
}

export default BusinessPage;
