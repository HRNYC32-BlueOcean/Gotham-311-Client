import React from 'react';
import axios from 'axios';

class InteractionTracker extends React.Component {
  constructor(props) {
    super(props);
    this.postInteraction = this.postInteraction.bind(this);
  }

  postInteraction(lat, lng, id=null) {
    var issueId = this.props.issueId;
    if (id !== null) {
      issueId = id;
    }
    axios.post('https://nameless-mountain-18450.herokuapp.com/', {
      query: `mutation {
        postInteraction(
      user_id: ${this.props.userId},
      issue_id: ${issueId},
      interaction_type_id: ${this.props.actionType},
      lat: ${lat},
      lng: ${lng},
      ) {
        id
        create_date
        user_id
        coordinates_id
      }
    }
      `
    })
    .then((response) => {
      console.log('success posting interaction', response.data);
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