import React, { Component } from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper, Polygon} from 'google-maps-react';
import { geocodeByAddress, getLatLng, geocodeByPlaceId } from "react-places-autocomplete";
import './GoogleMap.css'



export class GoogleMap extends Component {

    constructor(props) {
        super(props);

        this.state = {
            latitude: 35.9940,
            longitude: -78.8986,
            place_ids: ['ChIJ74cKbp_nrIkR-d-zE9lgt88', 'ChIJoY7M-G3krIkRHcQ5pHpWHOs', 'ChIJ53W3QQfkrIkRb5gP_Ms5YeQ'],
            markers: [],
            territories: [
                {
                    coordinates: [
                        { lat: 35.9940, lng: -78.8986 },
                        { lat: 36.0000, lng: -78.9000 },
                        { lat: 36.0021, lng: -78.9020 },
                        { lat: 35.9940, lng: -78.9020 },
                    ],
                    fillColor: "#0000FF",
                    id: 0
                },
                {
                    coordinates: [
                        { lat: 35.98, lng: -78.8786 },
                        { lat: 35.97, lng: -78.83 },
                        { lat: 35.99, lng: -78.81 },
                        { lat: 35.9940, lng: -78.75 },
                    ],
                    fillColor: "#5550FF",
                    id: 1
                },
              
            ],


        };
        
    }

    onMarkerClick = () => {
        console.log("Marker Clicked")
    }

    componentDidMount = () => {
        this.markMap();
    }

    markMap = async () => {
        let temp_markers = [];
        
        for (let i = 0; i < this.state.place_ids.length; i++) {
            let place_id = this.state.place_ids[i];
            let results = await geocodeByPlaceId(place_id) 
            
            results.map(res => {
                
                temp_markers.push(<Marker name={"Place"} position={{lat: res.geometry.location.lat(), lng: res.geometry.location.lng()}}/>)
            })
            console.log(temp_markers)
        }
        
        this.setState({markers: temp_markers})
        
    }
    
    render() {
        const style = {
            width: '100%',
            height: '100%'
        }

        let coords = { lat: this.state.latitude, lng: this.state.longitude };
        
        
        
      return (
        <Map
          google={this.props.google}
          style={style}
          initialCenter={coords}
          
          zoom={15}
          onClick={this.onMapClicked}>
  
          {/* <Marker onClick={this.onMarkerClick}
                  name={'Current location'} /> */}
            
            {this.state.markers.map(m => {
                return m;
            })}
          <InfoWindow onClose={this.onInfoWindowClose}>
              <div>
                <h1>{"Info"}</h1>
              </div>
          </InfoWindow>
            
            {this.state.territories.map(t => {
                return <Polygon onClick={console.log(t.id)}
                paths={t.coordinates}
                strokeColor={t.fillColor}
                strokeOpacity={0.8}
                strokeWeight={2}
                fillColor={t.fillColor}
                fillOpacity={0.35}
                id={t.id} />
                
            })}
          
        </Map>
      );
    }
  }


export default GoogleApiWrapper({
    apiKey: "AIzaSyB8KvFSaeRKoX-MOPVWzg1pbjYa0TSP0rE"
})(GoogleMap)

