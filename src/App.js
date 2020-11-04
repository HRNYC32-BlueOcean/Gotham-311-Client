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
    this.handleRenderVote =  this.handleRenderVote.bind(this)
    this.renderPointsModal =  this.renderPointsModal.bind(this)
    this.handleIssueSelected =  this.handleIssueSelected.bind(this)
  }
  handleIssueSelected(issue){
    console.log("this is issue", issue)
    this.setState({
      issueSelected: issue,
      
    })
  }
  handleRenderVote(){
    // console.log("this is issue back", issue)
    this.setState({
      // issueSelected: issue,
      renderVoteModal: !this.state.renderVoteModal,
    })
  }
  renderPointsModal(){
    console.log("clicked Points")
    this.setState({
      renderPointsModal: true,
    })
  }
  render() {
    const renderVote = this.state.renderVoteModal ? <VoteModal handleRenderVote={this.handleRenderVote} renderVoteModal={this.state.renderVoteModal} handleIssue={this.handleIssueSelected}issue={this.state.issueSelected}/> : null
    const renderPoints = this.state.renderPointsModal ? <PointsModal renderPointsModal={this.state.renderPointsModal}/> : null
    return (

      <div className="container">
        <Map handleRenderVote={this.handleRenderVote} handleIssue={this.handleIssueSelected} renderPointsModal={this.renderPointsModal}/>
        {renderVote}
        {renderPoints}
       </div>
    );
  }
}

export default App;
