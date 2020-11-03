import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import api from './api';
import mapStyle from './mapstyles';
import CurrentLocation from './FindCurrentLocation';
import Cards from '../Cards/Cards';
import UploadModal from '../components/UploadModal';

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
      markerPosition: null,
    };
    this.setMarkerPosition = this.setMarkerPosition.bind(this);
  }

  setMarkerPosition(coord) {
    this.setState({
      markerPosition: coord,
    });
  }

  render() {
    return (
      <div>
        <div className="haha" style={{ height: '55vh' }}>
          <CurrentLocation
            centerAroundCurrentLocation
            google={this.props.google}
            setMarkerPosition={this.setMarkerPosition}
          ></CurrentLocation>
        </div>
        <UploadModal props={this.state.markerPosition}  renderPointsModal={this.props.renderPointsModal}/>
        <Cards renderVoteModal={this.props.renderVoteModal} renderPointsModal={this.props.renderPointsModal}></Cards>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: api,
})(MapContainer);
