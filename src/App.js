import React from "react";
import Button from '@material-ui/core/Button';
import Map from './MapContainer/Map'

class App extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <>
        <Map></Map>
      </>
    );
  }
}

export default App;
