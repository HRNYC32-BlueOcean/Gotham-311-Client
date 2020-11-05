import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import SelectDropdown from './SelectDropdown';
import DialogTitle from '@material-ui/core/DialogTitle';
import ImageContainer from './ImageContainer';
import Grid from '@material-ui/core/Grid';
const api_url = 'https://nameless-mountain-18450.herokuapp.com/';


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
            <div className="vote-title" style={{ display: 'flex', justifyContent: 'center', height: '8vh'}}>
              <p className="title">{issue.title}</p>
            </div>
          </Grid>
          <Grid item>
            <DialogContent className="content">
              <Grid item>
                <DialogContent>
                  <ImageContainer image={issue.image} />
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
            <Button variant="contained" color="primary"
              onClick={(e) => {
                let id = parseInt(issue.id);
                // axios({
                //   url: api_url,
                //   method: 'post',
                //   data: {
                //     query: `{
                //       updateIssue {
                //         id: ${id}
                //         upvotes_count: 1
                //       }
                //     }
                //   }`,
                //   },
                // });
                console.log(id);
                handleVoted()
              }}
            >
              Upvote
            </Button>
            <Button variant="contained" color="secondary"
              onClick={() => {
                let id = parseInt(issue.id);
                console.log(id);
                // axios({
                //   url: api_url,
                //   method: 'post',
                //   data: {
                //     query: `{
                //       updateIssue {
                //         id: ${id}
                //         reported_count: 1
                //       }
                //     }
                //   }`,
                //   },
                // });
                handleClose()
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
