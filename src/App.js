import React from "react";
import Button from '@material-ui/core/Button';
import Map from './MapContainer/Map'
import Cards from './Cards/Cards'

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Map></Map>
      </div>
    );
  }
}

export default App;
