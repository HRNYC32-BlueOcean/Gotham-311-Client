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
      let upperLat = this.state.markerPosition.lat.toFixed(2);
      let upperLng = this.state.markerPosition.lng.toFixed(2);
      let underLat = this.state.markerPosition.lat.toFixed(2);
      let underLng = this.state.markerPosition.lng.toFixed(2);

      upperLat = parseFloat(upperLat) + 0.04;
      upperLng = parseFloat(upperLng) + 0.04;
      underLat = parseFloat(underLat) - 0.04;
      underLng = parseFloat(underLng) - 0.04;

      this.getAllIssues(upperLat, upperLng, underLat, underLng);
    }
  }

  getAllIssues(upperLat, upperLng, underLat, underLng) {
    axios({
      url: api_url,
      method: 'post',
      data: {
        query: `{
              getIssuesByCoordinates(upperLat:${upperLat}, underLat:${underLat},
                upperLng:${upperLng}, underLng:${underLng}) {
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
          passDownData: res.data.data.getIssuesByCoordinates,
        },
        () => {
          return;
        }
      );
    });
  }

  render() {
    let markers = [];
    if (this.state.passDownData.length > 0) {
      for (let i = 0; i < 10; i++) {
        if (this.state.passDownData[i] !== undefined) {
          let position = this.state.passDownData[i].coordinates
          markers.push(
            <Marker
              key={i}
              position={position}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 15,
                fillColor: '#FFFFFF',
                strokeColor: '#9932CC',
                fillOpacity: 1,
              }}
              onClick={() => {
                this.props.handleIssue(this.state.passDownData[i]);
                this.props.handleRenderVote();
              }}
            />
          );
        }
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
          props={this.state.markerPosition}
          handleIssueSubmitted={this.props.handleIssueSubmitted}
          handleRenderPointsModalPostIssue={this.props.handleRenderPointsModalPostIssue}
          location={this.state.markerPosition}
          userId={this.props.userId}
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
