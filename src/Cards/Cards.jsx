import React from 'react';
import ReactDOM from 'react-dom';
import generator from './dummydata';
import IndividualCards from './individualCards';
import dummydata from './dummydata'

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: dummydata,
    };
  }

  render() {
    return (
      <div className='cards-container' style={{
        overflowY: 'scroll',
        height: '42vh',
        }}>
        {this.state.items.map((data, i) => {
          return <IndividualCards info={data} keys={i} handleRenderVote={this.props.handleRenderVote} handleIssue={this.props.handleIssue} renderPointsModal={this.props.renderPointsModal}></IndividualCards>;
        })}
      </div>
    );
  }
}

export default Cards;
