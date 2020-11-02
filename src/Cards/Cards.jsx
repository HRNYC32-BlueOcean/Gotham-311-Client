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
        height: '40vh',
        textAlign: 'center'
        }}>
        {this.state.items.map((data, i) => {
          return <IndividualCards info={data}></IndividualCards>;
        })}
      </div>
    );
  }
}

export default Cards;
