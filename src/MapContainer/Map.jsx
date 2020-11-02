import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import api from './api';
import mapStyle from './mapstyles';
import CurrentLocation from './FindCurrentLocation'


const mapStyles = {
  width: '100%',
  height: '65%',
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: {
        lat: 40.7128,
        lng: -74.006,
      },
    };
  }


  render() {
    return (
      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
      >
      </CurrentLocation>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: api,
})(MapContainer);
