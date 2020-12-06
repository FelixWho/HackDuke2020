import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  Badge,
  Container,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import Fuse from "fuse.js";
import firebase from "../../Firebase/firebase.js";
import "./Customers.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
      query: "",
      businessData: {},
      cart: [],
      customer: this.props.name,
      redirect: null,
    };
  }

  inside = (point, vs) => {
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html

    var x = point.lng,
      y = point.lat;

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i].lng,
        yi = vs[i].lat;
      var xj = vs[j].lng,
        yj = vs[j].lat;

      var intersect =
        yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }

    return inside;
  };

  componentDidMount = () => {
    /**
     * Get business data in JSON form
     */
    let db = firebase.db;
    let businessRef = db.ref("Stores");
    businessRef.on("value", (snapshot) => {
      this.setState({
        businessData: snapshot.val(),
      });
    });
  };

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
            place: businessData[store]["id"],
            store: store,
            itemName: itemKey,
            ...inventory[item],
          };
          items.push(itemObject);
        } else {
          let itemObject = {
            place: businessData[store]["id"],
            store: store,
            itemName: item,
            ...inventory[item],
          };
          items.push(itemObject);
        }
      }
    }

    console.log(items);

    const options = {
      threshold: 0.5,
      keys: ["itemName"],
    };
    const fuse = new Fuse(items, options);
    const pattern = this.state.query;
    let list = fuse.search(pattern);
    this.setState({
      itemList: list,
    });
  };

  handleSearchChange = (event) => {
    this.setState({ query: event.target.value });
    this.handleSearch();
  };

  WriteUserData() {
    // let ref = firebase.db.ref(`Customers/${this.state.customer}/cart`);
    // this.state.cart.map((x)=>{ref.push({name: x.item.store, id: x.item.place})});
  }

  handleAddToCart = (item) => {
    let cart = this.state.cart;
    cart.push(item);
    let ref = firebase.db.ref(`Customers/${this.state.customer}/cart`);
    ref.push(item.item);
    // this.state.cart.map((x)=>{ref.push({name: x.item.store, id: x.item.place})});
    this.setState({ cart: cart }, () => {
      this.WriteUserData();
    });
    // console.log(item);
    // console.log(this.state.cart);
  };

  handleDoneClick = () => {
    this.setState({ redirect: "/maps/" + this.state.customer });
  };

  render() {
    console.log(this.state.businessData);
    if (this.state.redirect) {
      console.log(this.state.redirect);
      return (
        <Redirect
          to={{
            pathname: this.state.redirect,
          }}
        />
      );
    }

    return (
      <Container className="Customers">
        <div className="searchbar-text">
          <h1>Search</h1>
          <h1>
            Cart{" "}
            <Badge pill size="lg" variant="primary">
              {this.state.cart.length}
            </Badge>
          </h1>
          <form>
            <Button type="button" size="sm" onClick={this.handleDoneClick}>
              <h1>Done</h1>
            </Button>
          </form>
        </div>

        <div className="d-flex">
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-default">
                Search Items
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              value={this.state.query}
              onChange={this.handleSearchChange}
            />
          </InputGroup>
          <br />
        </div>

        <ul className="search-items">
          {this.state.itemList.map((x) => {
            return (
              <li
                className="search-item"
                onClick={() => this.handleAddToCart(x)}
              >
                {x.item.itemName}
                <br />
                <img className="search-item-img" src={x.item.url} />
              </li>
            );
          })}
        </ul>
      </Container>
    );
  }
}

export default SearchBar;
