import React from 'react';
import ReactDOM from 'react-dom';
import Geocode from 'react-geocode';
import apiKey from '../MapContainer/api';
import moment from 'moment';
import {
  // Card demos
  Grid,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';

class IndividualCards extends React.Component {
  constructor(props) {
    super(props);
    Geocode.setApiKey(apiKey);
    this.state = {
      address: '',
    };
  }
  componentDidUpdate(prevProps, prevState) {
      let address;
      Geocode.fromLatLng(this.props.info.coordinates.lat, this.props.info.coordinates.lng).then(
        (response) => {
          address = response.results[0].formatted_address;
          this.setState({
            address: address,
          });
        }
      );
  }

  componentDidMount() {
    let address;
    Geocode.fromLatLng(this.props.info.coordinates.lat, this.props.info.coordinates.lng).then(
      (response) => {
        address = response.results[0].formatted_address;
        this.setState({
          address: address,
        });
      }
    );
  }

  render() {
    let date = this.props.info.create_date / 1000;
    return (
      <div
        onClick={() => {
          this.props.handleRenderVote();
          this.props.handleIssue(this.props.info);
        }}
        className="individual-cards"
      >
        <Grid item xs={11} lg={11}>
          <Card
            style={{
              width: '80vw',
            }}
          >
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {moment.unix(date).format('MMMM DD, YYYY')}
              </Typography>
              <Typography variant="h5" component="h2">
                {this.props.info.title}
              </Typography>
              <Typography color="textSecondary">
                Resolution Status: {this.props.info.resolution_status.name}
              </Typography>
              <Typography color="textSecondary">{this.state.address}</Typography>
              <Typography variant="body2" component="p">
                {this.props.info.description}
                <br />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </div>
    );
  }
}

export default IndividualCards;
