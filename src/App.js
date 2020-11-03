import React from "react";

import Button from '@material-ui/core/Button';
import Map from './MapContainer/Map'
import Cards from './Cards/Cards'
import VoteModal from './components/VoteModal.js'
import UploadModal from './components/UploadModal.js'
import PointsModal from './components/PointsModal.js'


class App extends React.Component {
  render() {
    return (

      <div className="container">
        <Map/>
        <VoteModal/>
        <PointsModal/>
       </div>
    );
  }
}

export default App;
