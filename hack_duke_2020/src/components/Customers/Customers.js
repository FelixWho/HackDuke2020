import React, { Component } from "react";
import { Container, Nav, Button, InputGroup, FormControl } from "react-bootstrap";
import Fuse from 'fuse.js';
import firebase from "../../Firebase/firebase.js";

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
      query: "",
      businessData: {}
    };
  }
  
  componentDidMount = () => {
    /**
     * Get business data in JSON form
     */
    let db = firebase.db;
    let businessRef = db.ref('Stores');
    businessRef.on('value', snapshot => {
      this.setState({
        businessData: snapshot.val()
      });
    })
  }
  handleSearch = () => {
    let items = [];
    let businessData = this.state.businessData;
    for (const store in businessData) {
      let inventory = businessData[store]["Inventory"];
      for (const item in inventory) {
        if (item in items) {
          /**
           * Generates unique item key in cases where different
           * stores have items with the same name
           */
          let i = 1;
          let itemKey = item + i;
          while (itemKey in items) {
            i++;
            itemKey = item + i;
          }
          /**
           * Parsing the data to work with fuse.js
           */
          let itemObject = {
            "itemName" : itemKey,
            ...inventory[item]
          }
          items.push(itemObject);
        } else {
          let itemObject = {
            "itemName" : item,
            ...inventory[item]
          }
          items.push(itemObject);
        }
      }
    }

    console.log(items);



    const options = {
      threshold: 0.5,
      keys: [
        "itemName"
      ]
    }
    const fuse = new Fuse(items, options);
    const pattern = this.state.query;
    let list = fuse.search(pattern);
    console.log(list);
    this.setState({
      itemList: list
    })
    
  }
  
  handleSearchChange = (event) => {
    this.setState({query: event.target.value});
    this.handleSearch();
  }

  render() {
    console.log(this.state.businessData);
    return (
      <Container className="Customers">
        <h1>Customers Page</h1>
        <div className="d-flex">
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-default">Search Items</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              value={this.state.query}
              onChange={this.handleSearchChange}
            />
          </InputGroup>
          <br/>
        </div>
        <div>
        <ul>
          {this.state.itemList.map((x)=>{
            return <li>{x.item.itemName}</li>
          })}
          </ul>
        </div>
      </Container>
    );
  }
}

export default Customers;
