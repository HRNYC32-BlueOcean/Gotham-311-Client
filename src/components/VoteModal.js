import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import SelectDropdown from './SelectDropdown';
import DialogTitle from '@material-ui/core/DialogTitle';
import ImageContainer from './ImageContainer';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
const api_url = process.env.API_URL;

export default function VoteModal({
  renderVoteModal,
  issue,
  handleIssue,
  handleRenderVote,
  handleUpvote,
}) {
  const [open, setOpen] = React.useState(renderVoteModal ? true : false);
  const [selectedIssue, setSelectedIssue] = React.useState(issue);
  const [renderTitle, setRenderTitle] = React.useState(issue.title ? issue.title : null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleVoted = () => {
    setOpen(false);
    handleRenderVote();
    handleUpvote();
  };

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth={true}
          maxWidth={'md'}
          style={{
            display: 'grid',
            justifyContent: 'center',
          }}
        >
          <Grid item>
            <div
              className="vote-title"
              style={{ display: 'flex', justifyContent: 'center', height: '8vh' }}
            >
              <p className="title">{issue.title}</p>
            </div>
          </Grid>
          <Grid item>
            <DialogContent className="content">
              <Grid item>
                <DialogContent>
                  <ImageContainer image={issue.photo_url} />
                </DialogContent>
              </Grid>
              <Grid item>
                <div
                  className="vote-description"
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <p className="borough">{issue.borough.name}</p>
                </div>
              </Grid>
              <Grid item>
                <div
                  className="vote-description"
                  style={{ display: 'flex', justifyContent: 'center', padding: '0' }}
                >
                  <p className="description">{issue.description}</p>
                </div>
              </Grid>
            </DialogContent>
          </Grid>
          <section
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 'inherit',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => {
                let id = parseInt(issue.id);
                axios({
                  url: api_url,
                  method: 'post',
                  data: {
                    query: `mutation {
                      updateIssue(
                        id: ${id}
                        upvotes_count: ${issue.upvotes_count + 1}
                         )
                      }
                  `,
                  },
                }).then((res) => {
                  handleVoted();
                });
              }}
            >
              Upvote
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                let id = parseInt(issue.id);
                axios({
                  url: api_url,
                  method: 'post',
                  data: {
                    query: `mutation {
                      updateIssue(
                        id: ${id}
                        reported_count: ${issue.upvotes_count + 1}
                         )
                      }
                  `,
                  },
                }).then((res) => {
                  handleClose();
                });
              }}
            >
              Report
            </Button>
          </section>
        </Dialog>
      </Grid>
    </div>
  );
}
