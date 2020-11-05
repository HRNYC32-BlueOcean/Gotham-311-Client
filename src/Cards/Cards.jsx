import React from 'react';
import ReactDOM from 'react-dom';
import generator from './dummydata';
import IndividualCards from './individualCards';
import dummydata from './dummydata'

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.data || dummydata,
    };
  }

  render() {
    return (
      <div className='cards-container' style={{
        overflowY: 'scroll',
        height: '42vh',
        }}>
        {this.props.data.map((data, i) => {
          if (i < 15) {
            return <IndividualCards info={data} keys={i} handleRenderVote={this.props.handleRenderVote} handleIssue={this.props.handleIssue} renderPointsModal={this.props.renderPointsModal}></IndividualCards>;
          }
        })}
      </div>
    );
  }
}

export default Cards;
