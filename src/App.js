
import React from "react";
import Button from '@material-ui/core/Button';
import VoteModal from './components/VoteModal.js'
import PointsModal from './components/PointsModal.js'

class App extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <>
        <h1>
          Hello {name}
        </h1>
        <Button variant="contained">this is a material UI button</Button>
        <VoteModal/>
        <PointsModal/>
      </>
    );
  }
}

export default App;
