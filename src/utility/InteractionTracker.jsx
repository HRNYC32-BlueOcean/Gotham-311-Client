import React from 'react';
import axios from 'axios';

class InteractionTracker extends React.Component {
  constructor(props) {
    super(props);
    this.postInteraction = this.postInteraction.bind(this);
  }

  postInteraction() {
    axios.post('https://nameless-mountain-18450.herokuapp.com/', {
      action: this.props.action,
      userLat: this.props.userLat,
      userLng: this.props.userLng
    })
    .then((response) => {
      console.log('success posting interaction', response);
    })
    .catch((error) => {
      console.log('error posting interaction', error);
    })
  }

  render() {
    return this.props.render({
      postInteraction: this.postInteraction
   })
  }
}

export default InteractionTracker;