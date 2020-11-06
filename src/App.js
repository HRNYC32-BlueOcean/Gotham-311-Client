import React from 'react';
import Map from './MapContainer/Map';
import Cards from './Cards/Cards';
import VoteModal from './components/VoteModal.js';
import UploadModal from './components/UploadModal.js';
import PointsModal from './components/PointsModal.js';
import moment from 'moment';
import {
  Box,
  Toolbar,
  Button,
  AppBar,
  IconButton,
  Typography,
  Grid,
  Card,
  CardContent,
  createMuiTheme,
  ThemeProvider,
  CssBaseLine,
} from '@material-ui/core';
import axios from 'axios';
import PointsModalPostIssue from './components/PointsModalPostIssue'

// Imports for testing new cards:
import dummyData from './Cards/dummydata';
const api_url = 'https://nameless-mountain-18450.herokuapp.com/';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});


class App extends React.Component {
  constructor(props) {
    super(props);
    // Slide-out menu refrence:
    this.menuRef = React.createRef();
    // State:
    this.state = {
      renderVoteModal: false,
      renderPointsModal: false,
      issueSelected: {},
      isOpen: false,
      userData: [this.props.userData],
      upVote: false,
      user: this.props.userData.id,
      issueSubmitted: false,
      postIssueModal: false,
    };

    this.handleRenderVote = this.handleRenderVote.bind(this);
    this.renderPointsModal = this.renderPointsModal.bind(this);
    this.handleIssueSelected = this.handleIssueSelected.bind(this);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleIssueSubmitted = this.handleIssueSubmitted.bind(this);
    this.handleRenderPointsModalPostIssue = this.handleRenderPointsModalPostIssue.bind(this);
    this.togglePosition = this.togglePosition.bind(this);
  }

  handleIssueSelected(issue) {
    this.setState({
      issueSelected: issue,
    });
  }


  handleIssueSelected(issue) {
    this.setState({
      issueSelected: issue,
    });
  }

  handleRenderVote() {
    this.setState({
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
    this.setState({
      renderPointsModal: !this.state.renderPointsModal,
      upVote: !this.state.upVote,
    });
  }

  handleRenderPointsModalPostIssue() {
    this.setState({
      postIssueModal: !this.state.postIssueModal,
    })
  }

  // toggles the position of the list-view menu
  togglePosition() {
    const { isOpen } = this.state;
    if (isOpen) {
      this.menuRef.current.style.left = '-100vw';
    } else {
      this.menuRef.current.style.left = '0vw';
    }
    this.setState({ isOpen: !isOpen });
  }

  render() {
      let name = this.state.userData[0] ? this.state.userData[0].first_name : null;
      let points = this.state.userData[0] ? this.state.userData[0].points : null;

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

    //renders the cards of self posts
    let personalData = this.state.userData[0]
      ? this.state.userData[0].issues.map((e, i) => (
          <Grid item xs={11} lg={11}>
            <Card
              style={{
                width: '80vw',
                overflowY: 'scroll',
                padding: '8px',
              }}
            >
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {moment.unix(e.create_date / 1000).format('MMMM D, YYYY')}
                </Typography>
                <Typography variant="h3" component="h2">
                  {e.title}
                </Typography>
                <Typography color="textSecondary">Resolution Status: {e.resolution_status.name}</Typography>
                <Typography variant="h4" component="h4">
                  {e.description}
                  <br />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      : null;

    return (
      <ThemeProvider theme={darkTheme}>
        <div
          ref={this.menuRef}
          style={{
            position: 'absolute',
            left: '-100vw',
            transition: 'left 0.3s ease-in-out',
            width: '100vw',
            height: '100vh',
            backgroundColor: '#212121',
            zIndex: '99',
            paddingTop: '74px',
          }}
        >
          <Box style={{ maxHeight: '94vh', overflow: 'auto' }}>
            <Grid container direction="column" justify="flex-start" alignItems="center" spacing={2}>
              {personalData}
            </Grid>
          </Box>
        </div>
        <AppBar
          position="static"
          style={{
            zIndex: '100',
            position: 'absolute',
            backgroundColor: 'black',
          }}
        >
          <Toolbar
            style={{
              justifyContent: 'space-between',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={this.togglePosition}
            >
              See My Posts
            </IconButton>
            <Typography variant="h6">NYAAN Gotham 311: Welcome {name}</Typography>
            <Typography variant="h6">You currently have {points} points</Typography>
          </Toolbar>
        </AppBar>
        <div className="container">
          <Map
            style={{ paddingTop: '64px' }}
            handleRenderVote={this.handleRenderVote}
            handleIssue={this.handleIssueSelected}
            renderPointsModal={this.renderPointsModal}
            userId={this.state.user}
            handleIssueSubmitted={this.handleIssueSubmitted}
            handleRenderPointsModalPostIssue={this.handleRenderPointsModalPostIssue}
          />
          {renderVote}
          {renderPoints}
          {renderPointsModalPostIssue}
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
