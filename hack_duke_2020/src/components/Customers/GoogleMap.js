import React, { Component } from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper, Polygon} from 'google-maps-react';
import './GoogleMap.css'



export class GoogleMap extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
        };
        
    }
    
    render() {
        const style = {
            width: '100%',
            height: '100%'
        }

        const triangleCoords = [
            {lat: 25.774, lng: -80.190},
            {lat: 18.466, lng: -66.118},
            {lat: 32.321, lng: -64.757},
            {lat: 25.774, lng: -80.190}
        ];
        
      return (
        <Map
          google={this.props.google}
          style={style}
          center={{
            lat: 25.774,
            lng: -80.190
          }}
          zoom={15}
          onClick={this.onMapClicked}
        >
  
          <Marker onClick={this.onMarkerClick}
                  name={'Current location'} />
  
          <InfoWindow onClose={this.onInfoWindowClose}>
              <div>
                <h1>{"Info"}</h1>
              </div>
          </InfoWindow>

          <Polygon
            paths={triangleCoords}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2}
            fillColor="#0000FF"
            fillOpacity={0.35} />
        </Map>
      );
    }
  }


export default GoogleApiWrapper({
    apiKey: "AIzaSyB8KvFSaeRKoX-MOPVWzg1pbjYa0TSP0rE"
})(GoogleMap)

