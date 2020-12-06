import React, { Component } from "react";
import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  Polygon,
} from "google-maps-react";
import { geocodeByPlaceId } from "react-places-autocomplete";
import firebase from '../../Firebase/firebase.js';
import "./GoogleMap.css";

export class GoogleMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 35.994,
      longitude: -78.8986,
      place_ids: [
        "ChIJ74cKbp_nrIkR-d-zE9lgt88",
        "ChIJoY7M-G3krIkRHcQ5pHpWHOs",
        "ChIJ53W3QQfkrIkRb5gP_Ms5YeQ",
      ],
      place_coords: [],
      territories: []
    };
  }

  

  componentDidMount = () => {
    let db = firebase.db;
    let temp_places = [];

    db.ref('Territories').on('value', (snapshot) => {
        //console.log(snapshot.val());
        this.setState({territories: snapshot.val()});
    })

    db.ref('Stores').on('value', (snapshot) => {
        //console.log(snapshot.val());
        let places = Object.entries(snapshot.val())
        console.log(places)
        for (let i = 0; i < places.length; i++) {
            temp_places.push(places[i][1]['id']);
        }
        this.setState({place_ids: temp_places});
    })
    this.getBusinessCoords();
  };

  onMarkerClick = () => {
    console.log("Marker Clicked");
  };

  getBusinessCoords = async () => {
    let coords = [];
    let results
    for (let i = 0; i < this.state.place_ids.length; i++) {
     
      let place_id = this.state.place_ids[i];
      try {
        results = await geocodeByPlaceId(place_id);

      }
      catch (e) {
          console.log(e)
      }
      

      results.map((res) => {
        coords.push([res.geometry.location.lat(), res.geometry.location.lng()]);
      });
    }
    this.setState({ place_coords: coords });
  };

  render() {
    let init_coords = { lat: this.state.latitude, lng: this.state.longitude };
    console.log("territories");
    console.log(this.state.territories)
    return (
      <Map
        google={this.props.google}
        initialCenter={init_coords}
        zoom={15}
        onClick={this.onMapClicked}
        className="Map"
      >
        {/* <Marker onClick={this.onMarkerClick}
                  name={'Current location'} /> */}

        {/* Render location markers */}
        {this.state.place_coords.map((coord, key) => {
          return (
            <Marker
              key={key}
              name={"Place"}
              position={{ lat: coord[0], lng: coord[1] }}
            />
          );
        })}

        {/* Render polygons around each location marker */}
        {/* {this.state.place_coords.map((coord, key) => {
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

        {this.state.territories.map((t, key) => {
            
            let coord = t.coordinates;
            console.log(coord[0]);
            return <Polygon
            key={key}
            paths={Object.values(coord)}
            strokeColor={t.color}
            strokeOpacity={0.8}
            strokeWeight={2}
            fillColor={t.color}
            fillOpacity={0.35}
          />
        })}
        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h1>{"Info"}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB8KvFSaeRKoX-MOPVWzg1pbjYa0TSP0rE",
})(GoogleMap);
