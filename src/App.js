
import React from "react";
import VoteModal from './components/VoteModal.js'
import UploadModal from './components/UploadModal.js'
import PointsModal from './components/PointsModal.js'

class App extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <>
        <VoteModal/>
        <PointsModal/>
        <UploadModal/>
      </>
    );
  }
}

export default App;
