import React from 'react';
import axios from 'axios';

const api_url = process.env.API_URL;

class InteractionTracker extends React.Component {
  constructor(props) {
    super(props);
    this.postInteraction = this.postInteraction.bind(this);
  }

  postInteraction() {
    axios
      .post(api_url, {
        action: this.props.action,
        userLat: this.props.userLat,
        userLng: this.props.userLng,
      })
      .then((response) => {
        console.log('success posting interaction', response);
      })
      .catch((error) => {
        console.log('error posting interaction', error);
      });
  }

  render() {
    return this.props.render({
      postInteraction: this.postInteraction,
    });
  }
}

export default InteractionTracker;
