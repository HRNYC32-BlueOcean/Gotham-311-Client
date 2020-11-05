import React from 'react';

import Button from '@material-ui/core/Button';
import Map from './MapContainer/Map';
import Cards from './Cards/Cards';
import VoteModal from './components/VoteModal.js';
import UploadModal from './components/UploadModal.js';
import PointsModal from './components/PointsModal.js';
import PointsModalPostIssue from './components/PointsModalPostIssue.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderVoteModal: false,
      renderPointsModal: false,
      upVote: false,
      issueSubmitted: false,
      issueSelected: {},
      postIssueModal: false,
    };
    this.handleRenderVote = this.handleRenderVote.bind(this);
    this.renderPointsModal = this.renderPointsModal.bind(this);
    this.handleIssueSelected = this.handleIssueSelected.bind(this);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleIssueSubmitted = this.handleIssueSubmitted.bind(this);
    this.handleRenderPointsModalPostIssue = this.handleRenderPointsModalPostIssue.bind(this);
  }
  handleIssueSelected(issue) {
    console.log('this is issue', issue);
    this.setState({
      issueSelected: issue,
    });
  }
  handleRenderVote() {
    // console.log("this is issue back", issue)
    this.setState({
      // issueSelected: issue,
      renderVoteModal: !this.state.renderVoteModal,
    });
  }
  handleIssueSubmitted() {
    this.setState({
      issueSubmitted: !this.state.issueSubmitted,
    });
  }
  handleUpvote() {
    this.setState({
      renderPointsModal: !this.state.renderPointsModal,
      upVote: !this.state.upVote,
    });
  }
  renderPointsModal() {
    console.log('clicked Points');
    this.setState({
      renderPointsModal: !this.state.renderPointsModal,
      upVote: !this.state.upVote,
    });
  }
  handleRenderPointsModalPostIssue() {
    console.log('clicked Points');
    this.setState({
      postIssueModal: !this.state.postIssueModal,
    });
  }
  render() {
    const renderVote = this.state.renderVoteModal ? (
      <VoteModal
        upVote={this.state.upVote}
        handleRenderVote={this.handleRenderVote}
        renderVoteModal={this.state.renderVoteModal}
        handleUpvote={this.handleUpvote}
        handleIssue={this.handleIssueSelected}
        issue={this.state.issueSelected}
      />
    ) : null;
    const renderPoints = this.state.renderPointsModal ? (
      <PointsModal
        upVote={this.state.upVote}
        handleIssueSubmitted={this.handleIssueSubmitted}
        renderPointsModal={this.renderPointsModal}
        issueSubmitted={this.state.issueSubmitted}
      />
    ) : null;
    const renderPointsModalPostIssue = this.state.postIssueModal ? (
      <PointsModalPostIssue
        postIssueModal={this.state.postIssueModal}
        upVote={this.state.upVote}
        handleIssueSubmitted={this.handleIssueSubmitted}
        handleRenderPointsModalPostIssue={this.handleRenderPointsModalPostIssue}
        issueSubmitted={this.state.issueSubmitted}
      />
    ) : null;
    return (
      <div className="container">
        <Map
          handleRenderVote={this.handleRenderVote}
          handleIssue={this.handleIssueSelected}
          renderPointsModal={this.renderPointsModal}
          handleIssueSubmitted={this.handleIssueSubmitted}
          handleRenderPointsModalPostIssue={this.handleRenderPointsModalPostIssue}
        />
        {renderVote}
        {renderPoints}
        {renderPointsModalPostIssue}
      </div>
    );
  }
}

export default App;
