import React from 'react';
import ReactDOM from 'react-dom';
import Geocode from 'react-geocode';
import apiKey from '../MapContainer/api';
import moment from 'moment';

class IndividualCards extends React.Component {
  constructor(props) {
    super(props);
    Geocode.setApiKey(apiKey);
    this.state = {
      address: '',
    };
  }

  componentDidMount() {
    let address;
    Geocode.fromLatLng(this.props.info.lat, this.props.info.lng).then((response) => {
      address = response.results[0].formatted_address;
      this.setState({
        address: address,
      });
    });
  }

  render() {
    return (
      <div onClick={() => this.props.renderVoteModal(this.props.info)} className="individual-cards">
        <div className="Date">
          <p>{moment(this.props.info.createdAt).format('MMMM D, YYYY')}</p>
        </div>
        <div className="Address">
          <p>{this.state.address}</p>
        </div>
        <div className="Title">
          <p>{this.props.info.title}</p>
        </div>
        <div className="Description">
          <p>{this.props.info.description}</p>
        </div>
      </div>
    );
  }
}

export default IndividualCards;
