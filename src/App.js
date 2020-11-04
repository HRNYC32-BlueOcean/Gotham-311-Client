import React from 'react';
import Map from './MapContainer/Map';
import Cards from './Cards/Cards';
import VoteModal from './components/VoteModal.js';
import UploadModal from './components/UploadModal.js';
import PointsModal from './components/PointsModal.js';
import {
  Toolbar,
  Button,
  AppBar,
  IconButton,
  Typography,
  // Card demos
  Grid,
  Card,
  CardContent,
  createMuiTheme,
  ThemeProvider,
  CssBaseLine,
} from '@material-ui/core';
// Imports for testing new cards:
import dummyData from './Cards/dummydata';

import moment from 'moment'


const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

// import {
//   MenuIcon
// } from '@material-ui/icons';

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
      user: props.name || 'David',
      isOpen: false,
      userPoints: props.points || 500,
    };
    this.handleRenderVote = this.handleRenderVote.bind(this);
    this.renderPointsModal = this.renderPointsModal.bind(this);
    this.handleIssueSelected = this.handleIssueSelected.bind(this);
    this.togglePosition = this.togglePosition.bind(this);
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
  renderPointsModal() {
    console.log('clicked Points');
    this.setState({
      renderPointsModal: true,
    });
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
    const renderVote = this.state.renderVoteModal ? (
      <VoteModal
        handleRenderVote={this.handleRenderVote}
        renderVoteModal={this.state.renderVoteModal}
        handleIssue={this.handleIssueSelected}
        issue={this.state.issueSelected}
      />
    ) : null;
    const renderPoints = this.state.renderPointsModal ? (
      <PointsModal renderPointsModal={this.state.renderPointsModal} />
    ) : null;
    return (
      <ThemeProvider theme={darkTheme}>
        {/* <CssBaseline/> */}
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
          <Grid container direction="column" justify="flex-start" alignItems="center" spacing={2}>
            {dummyData.map((e, i) => (
              <Grid item xs={11} lg={11}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                    {moment(e.create_date).format('MMMM D, YYYY')}
                    </Typography>
                    <Typography variant="h5" component="h2">
                    {e.title}
                    </Typography>
                    <Typography color="textSecondary">
                    {e.resolution_status}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {e.description}
                      <br />
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
        <AppBar
          position="static"
          style={{
            zIndex: '100',
            position: 'absolute',
            backgroundColor: 'black',
          }}
        >
          <Toolbar style={{
            justifyContent: 'space-between'
          }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={this.togglePosition}
            >
              See My Posts
            </IconButton>
            <Typography variant="h6">NYAAN Gotham 311: Welcome {this.state.user}</Typography>
            <Typography variant="h6">You currently have {this.state.userPoints} points</Typography>
            {/* <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
        <div className="container">
          <Map
            style={{ paddingTop: '64px' }}
            handleRenderVote={this.handleRenderVote}
            handleIssue={this.handleIssueSelected}
            renderPointsModal={this.renderPointsModal}
          />
          {renderVote}
          {renderPoints}
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
