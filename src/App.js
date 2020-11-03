import React from "react";

import Button from '@material-ui/core/Button';
import Map from './MapContainer/Map'
import Cards from './Cards/Cards'
import VoteModal from './components/VoteModal.js'
import UploadModal from './components/UploadModal.js'
import PointsModal from './components/PointsModal.js'


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        renderVoteModal: false,
        renderPointsModal: false,
        issueSelected: {}
    }
    this.renderVoteModal =  this.renderVoteModal.bind(this)
    this.renderPointsModal =  this.renderPointsModal.bind(this)
  }
  renderVoteModal(issue){
    console.log("this is issue back", issue)
    this.setState({
      issueSelected: issue,
      renderVoteModal: true,
    })
  }
  renderPointsModal(){
    console.log("clicked Points")
    this.setState({
      renderPointsModal: true,
    })
  }
  render() {
    const renderVote = this.state.renderVoteModal ? <VoteModal renderVoteModal={this.state.renderVoteModal} issue={this.state.issueSelected}/> : null
    const renderPoints = this.state.renderPointsModal ? <PointsModal renderPointsModal={this.state.renderPointsModal}/> : null
    return (

      <div className="container">
        <Map renderVoteModal={this.renderVoteModal} renderPointsModal={this.renderPointsModal}/>
        {renderVote}
        {renderPoints}
       </div>
    );
  }
}

export default App;
