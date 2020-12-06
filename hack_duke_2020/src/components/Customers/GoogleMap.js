import React, { Component } from "react";
import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  Polygon,
} from "google-maps-react";
import { geocodeByPlaceId } from "react-places-autocomplete";
import firebase from "../../Firebase/firebase.js";
import "./GoogleMap.css";

export class GoogleMap extends Component {
  constructor(props) {
    super(props);

    /*place ids, current person*/
    console.log("IN GOOGLEMAP");
    console.log(this.props);
    this.state = {
      lat: 35.994,
      lng: -78.8986,
      places: [],
      placeCoords: [],
      territories: [],
      selectedPlace: "",
      name: this.props.name,
    };
  }

  componentDidMount = () => {
    let db = firebase.db;

    db.ref("Territories").on("value", (snapshot) => {
      this.setState({ territories: snapshot.val() });
    });

    console.log(this.state.name);

    if (this.state.name) {
      db.ref(`Customers/${this.state.name}/cart`).on("value", (snapshot) => {
        // Call getPlaceCoords() as a callback function so it's only executed after setState
        let cartContents = Object.values(snapshot.val());

        let tempPlaces = [];
        let placeSet = new Set();
        for (let i = 0; i < cartContents.length; i++) {
          if (!placeSet.has(cartContents[i]["place"])) {
            tempPlaces.push(cartContents[i]);
            placeSet.add(cartContents[i]["place"]);
          }
        }

        console.log("TEMPLACES");
        console.log(tempPlaces);
        this.setState({ places: tempPlaces }, () => {
          this.getPlaceCoords();
        });
      });
    }
  };

  getPlaceCoords = async () => {
    let coords = [];
    let results;
    for (let i = 0; i < this.state.places.length; i++) {
      let place_id = this.state.places[i]["place"];
      console.log("PLACEID");
      console.log(place_id);
      try {
        results = await geocodeByPlaceId(place_id);
      } catch (e) {
        console.error(e);
      }
      results.map((res) => {
        coords.push([res.geometry.location.lat(), res.geometry.location.lng()]);
      });
    }
    this.setState({ placeCoords: coords });
  };

  handleLocationClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  render() {
    console.log("territories");
    console.log(this.state.territories);
    return (
      <Map
        google={this.props.google}
        initialCenter={{ lat: this.state.lat, lng: this.state.lng }}
        zoom={13}
        className="Map"
      >
        {/* Location markers */}
        {this.state.placeCoords.map((coord, key) => {
          let placeName = this.state.places[key]["store"];
          return (
            <Marker
              key={key}
              name={placeName}
              position={{ lat: coord[0], lng: coord[1] }}
              onClick={this.handleLocationClick}
            />
          );
        })}

        {/* Location marker info popups */}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <h6>{this.state.selectedPlace.name}</h6>
        </InfoWindow>

        {this.state.territories.map((t, key) => {
          let points = t.coordinates;
          console.log(points[0]);
          //https://stackoverflow.com/questions/45660743/sort-points-in-counter-clockwise-in-javascript
          points.sort((a, b) => a.y - b.y);

          // Get center y
          const cy = (points[0].lat + points[points.length - 1].lat) / 2;

          // Sort from right to left
          points.sort((a, b) => b.lng - a.lng);

          // Get center x
          const cx = (points[0].lng + points[points.length - 1].lng) / 2;

          // Center point
          const center = { lng: cx, lat: cy };
          var startAng;
          points.forEach((point) => {
            var ang = Math.atan2(
              point.lat - center.lat,
              point.lng - center.lng
            );
            if (!startAng) {
              startAng = ang;
            } else {
              if (ang < startAng) {
                // ensure that all points are clockwise of the start point
                ang += Math.PI * 2;
              }
            }
            point.angle = ang; // add the angle to the point
          });

          points.sort((a, b) => a.angle - b.angle);
          const ccwPoints = points.reverse();
          ccwPoints.unshift(ccwPoints.pop());

          console.log(points[0].lng);
          return (
            <Polygon
              key={key}
              paths={Object.values(points)}
              strokeColor={t.color}
              strokeOpacity={0.8}
              strokeWeight={2}
              fillColor={t.color}
              fillOpacity={0.35}
              name={t.leader}
              position={{ lng: cx, lat: cy }}
              onClick={this.handleLocationClick}
            />
          );
        })}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <h6>{this.state.selectedPlace.name}</h6>
        </InfoWindow>

        {/* Render polygons around each location marker */}
        {/* {this.state.placeCoords.map((coord, key) => {
          return (
            <Polygon
              key={key}
              paths={[
                {
                  lat: coord[0] - 0.01,
                  lng: coord[1] - 0.01,
                },
                {
                  lat: coord[0] + 0.01,
                  lng: coord[1] - 0.01,
                },
                {
                  lat: coord[0] + 0.01,
                  lng: coord[1] + 0.01,
                },
                {
                  lat: coord[0] - 0.01,
                  lng: coord[1] + 0.01,
                },
              ]}
              strokeColor="#00FF00"
              strokeOpacity={0.8}
              strokeWeight={2}
              fillColor="#00FF00"
              fillOpacity={0.35}
            />
          );
        })} */}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB8KvFSaeRKoX-MOPVWzg1pbjYa0TSP0rE",
})(GoogleMap);
