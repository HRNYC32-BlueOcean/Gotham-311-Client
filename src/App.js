import React from 'react';
import Map from './MapContainer/Map';
import Cards from './Cards/Cards';
import VoteModal from './components/VoteModal.js';
import UploadModal from './components/UploadModal.js';
import PointsModal from './components/PointsModal.js';
import moment from 'moment';
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
import axios from 'axios';

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
      userData: [],
      passDownData: [],
      user: 16,
    };
    this.handleRenderVote = this.handleRenderVote.bind(this);
    this.renderPointsModal = this.renderPointsModal.bind(this);
    this.handleIssueSelected = this.handleIssueSelected.bind(this);
    this.togglePosition = this.togglePosition.bind(this);
  }
  // get all issues cus no range yet :)
  componentDidMount() {
    this.getAllIssues();
    this.getUserIssues(this.props.id);
  }

  getAllIssues() {
    axios({
      url: api_url,
      method: 'post',
      data: {
        query: `{
              getIssues {
                id
                title
                description
                photo_url
                create_date
                borough{
                    name
                  }
                coordinates{
                  lat
                  lng
                }
              }
            }`,
      },
    }).then((res) => {
      this.setState(
        {
          passDownData: res.data.data.getIssues,
        },
        () => {
          return;
        }
      );
    });
  }

  getUserIssues(id) {
    axios({
      url: api_url,
      method: 'post',
      data: {
        query: `{
              getUser(id:${this.state.user}) {
                id
                first_name
                points
                issues {
                  id
                  title
                  description
                  create_date
                  photo_url
                  borough{
                    name
                  }
                  resolution_status{
                    name
                  }
                }
              }
            }`
      },
    }).then((res) => {
      this.setState(
        {
          userData: res.data.data.getUser,
        },
        () => {
          console.log(res.data.data)
        }
      )
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

  renderPointsModal() {
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
    let name = this.state.userData[0] ? this.state.userData[0].first_name : null
    let points = this.state.userData[0] ? this.state.userData[0].points : null
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
                  {moment(e.create_date).format('MMMM D, YYYY')}
                </Typography>
                <Typography variant="h3" component="h2">
                  {e.title}
                </Typography>
                <Typography color="textSecondary">{e.resolution_status.name}</Typography>
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
            {personalData}
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
            <Typography variant="h6">
              NYAAN Gotham 311: Welcome {name}
            </Typography>
            <Typography variant="h6">You currently have {points} points</Typography>
          </Toolbar>
        </AppBar>
        <div className="container">
          <Map
            style={{ paddingTop: '64px' }}
            handleRenderVote={this.handleRenderVote}
            handleIssue={this.handleIssueSelected}
            renderPointsModal={this.renderPointsModal}
            passDownData={this.state.passDownData}
          />
          {renderVote}
          {renderPoints}
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
