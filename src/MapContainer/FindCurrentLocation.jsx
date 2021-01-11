import React from 'react';
import ReactDOM from 'react-dom';
import mapStyle from './mapstyles';
import Geocode from 'react-geocode';

const mapStyles = {
  map: {
    position: 'absolute',
    width: '100%',
    height: '55vh',
  },
};

export class CurrentLocation extends React.Component {
  constructor(props) {
    super(props);
    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng,
      },
      hasMarker: 0,
      marker: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
      new google.maps.Marker({
        position: this.state.currentLocation,
        map: this.map,
        icon: {
          path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          scale: 4,
          fillColor: '#c4c769',
          strokeColor: '#FFFFFF',
          fillOpacity: 1,
        },
      });
      this.props.setMarkerPosition(this.state.currentLocation);
    }
  }

  placeMarkerAndPanTo(latLng, map, originalDistance) {
    if (this.state.hasMarker === 1) {
      this.state.marker.setMap(null);
      this.props.setMarkerPosition(originalDistance);
      this.setState({
        hasMarker: 0,
      });
    } else {
      let latLong = latLng.toJSON();
      this.setState({
        hasMarker: 1,
      });
      this.setState({
        marker: new google.maps.Marker({
          position: latLng,
          map: map,
        }),
      });
      this.props.setMarkerPosition(latLong);
      map.panTo(latLng);
    }
  }

  recenterMap() {
    const map = this.map;
    const current = this.state.currentLocation;
    const google = this.props.google;
    const maps = google.maps;
    if (map) {
      let center = new maps.LatLng(current.lat, current.lng);
      map.panTo(center);
    }
  }

  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude,
            },
          });
        });
      }
    }
    this.loadMap();
  }

  loadMap() {
    if (this.props && this.props.google) {
      const { google } = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
      let { zoom } = this.props;
      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom,
        }
      );
      this.map = new maps.Map(node, mapConfig);
      this.map.setOptions({
        styles: mapStyle,
      });
      this.map.addListener('click', (e) => {
        this.placeMarkerAndPanTo(e.latLng, this.map, this.state.currentLocation);
        let latLong = e.latLng.toJSON();
      });
    }
  }

  renderChildren() {
    const { children } = this.props;
    if (!children) return;
    return React.Children.map(children, (c) => {
      if (!c) return;
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation,
      });
    });
  }

  render() {
    const style = Object.assign({}, mapStyles.map);
    return (
      <div>
        <div style={style} ref="map">
          Loading map...
        </div>
        {this.renderChildren()}
      </div>
    );
  }
}

CurrentLocation.defaultProps = {
  zoom: 17,
  initialCenter: {
    lat: 40.7128,
    lng: -74.006,
  },
  centerAroundCurrentLocation: false,
  visible: true,
};

export default CurrentLocation;
