import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import mapStyle from './mapstyles';
import CurrentLocation from './FindCurrentLocation';
import Cards from '../Cards/Cards';
import UploadModal from '../components/UploadModal';
import dummyData from '../Cards/dummydata';
import VoteModal from '../components/VoteModal';

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
      userData: dummyData,
    };
    this.setMarkerPosition = this.setMarkerPosition.bind(this);
  }

  setMarkerPosition(coord) {
    this.setState({
      markerPosition: coord,
    });
  }

  render() {
    let markers = [];
    for (let i = 0; i < dummyData.length; i++) {
      markers.push(
        <Marker
          key={i}
          position={{
            lat: dummyData[i].lat,
            lng: dummyData[i].lng,
          }}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 6,
            fillColor: '#FFFFFF',
            strokeColor: '#FFFFFF',
            fillOpacity: 1,
          }}
          onClick={() => {
            this.props.handleRenderVote();
            this.props.handleIssue(dummyData[i]);
          }}
        />
      );
    }

    return (
      <div>
        <div className="haha" style={{ height: '55vh' }}>
          <CurrentLocation
            centerAroundCurrentLocation
            google={this.props.google}
            setMarkerPosition={this.setMarkerPosition}
          >
            {markers}
          </CurrentLocation>
        </div>
        <UploadModal
          location={this.state.markerPosition}
          renderPointsModal={this.props.renderPointsModal}
        />
        <Cards
          handleRenderVote={this.props.handleRenderVote}
          handleIssue={this.props.handleIssue}
          renderPointsModal={this.props.renderPointsModal}
        ></Cards>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDyjc_PSZhBWDvzJSDQVnUMT5RJ84IIrNA',
})(MapContainer);
