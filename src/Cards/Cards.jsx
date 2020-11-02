import React from 'react';
import ReactDOM from 'react-dom';
import generator from './dummydata';
import IndividualCards from './individualCards';

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  render() {
    return (
      <div className='cards-container'>
        {this.state.items.map((data, i) => {
          return <IndividualCards info={data}></IndividualCards>;
        })}
      </div>
    );
  }
}

export default Cards;
