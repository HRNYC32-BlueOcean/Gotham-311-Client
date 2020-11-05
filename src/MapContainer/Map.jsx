import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import mapStyle from './mapstyles';
import CurrentLocation from './FindCurrentLocation';
import Cards from '../Cards/Cards';
import UploadModal from '../components/UploadModal';
import dummyData from '../Cards/dummydata';
import VoteModal from '../components/VoteModal';
import axios from 'axios';
const api_url = 'https://nameless-mountain-18450.herokuapp.com/';

const mapStyles = {
  width: '100%',
  height: '65%',
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markerPosition: null,
      passDownData: [],
    };
    this.setMarkerPosition = this.setMarkerPosition.bind(this);
  }

  setMarkerPosition(coord) {
    this.setState({
      markerPosition: coord,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.markerPosition !== this.state.markerPosition) {
      let upperLat = this.state.markerPosition.lat + 0.04;
      let upperLng = this.state.markerPosition.lat - 0.04;
      let underLat = this.state.markerPosition.lng + 0.04;
      let underLng = this.state.markerPosition.lng - 0.04;
      console.log(upperLat, upperLng, underLat, underLng)
      this.getAllIssues();
    }
  }

  getAllIssues(upperLat, underLat, upperLng, underLng) {
    axios({
      url: api_url,
      method: 'post',
      data: {
        query: `{
              getIssues {
                id
                title
                description
                photo_url
                create_date
                borough{
                    name
                  }
                coordinates{
                  lat
                  lng
                }
              }
            }`,
      },
    }).then((res) => {
      this.setState(
        {
          passDownData: res.data.data.getIssues,
        },
        () => {
          return
        }
      );
    });
  }

  render() {
    let markers = [];
    if (this.props.passDownData.length > 0) {
      for (let i = 0; i < 10; i++) {
        markers.push(
          <Marker
            key={i}
            position={this.props.passDownData[i].coordinates}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 6,
              fillColor: '#FFFFFF',
              strokeColor: '#FFFFFF',
              fillOpacity: 1,
            }}
            onClick={() => {
              this.props.handleRenderVote();
              this.props.handleIssue(this.props.passDownData[i]);
            }}
          />
        );
      }
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
          data={this.state.passDownData}
        ></Cards>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDyjc_PSZhBWDvzJSDQVnUMT5RJ84IIrNA',
})(MapContainer);
