import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import SelectDropdown from './SelectDropdown';
import DialogTitle from '@material-ui/core/DialogTitle';
import ImageContainer from './ImageContainer';
import Grid from '@material-ui/core/Grid';

export default function VoteModal({renderVoteModal, issue, handleIssue, handleRenderVote}) {
  const [open, setOpen] = React.useState(renderVoteModal ? true : false);
  const [selectedIssue, setSelectedIssue] = React.useState(issue);
  const [renderTitle, setRenderTitle] = React.useState(issue.title ? issue.title : null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false)
    handleRenderVote()
  };
  const handleChange = (event) => {
    console.log('hello');
  };

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          style={{
            display: 'grid',
            justifyContent: 'center',
          }}
        >
          <div style={{ "display":"flex", "justifyContent":"center"}}>
            <DialogTitle id="simple-dialog-title">
                {renderTitle}
            </DialogTitle>
          </div>
          <Grid item>
            <DialogContent className="content">
              <Grid item>
                <DialogContent>
                  <ImageContainer image={issue.image}/>
                </DialogContent>
              </Grid>
              <Grid item>
                <DialogContent>
                  {/* <SelectDropdown /> */}
                  <div className="vote-description" style={{ "display":"flex", "justifyContent":"center"}}>
                  <h3>{selectedIssue.borough}</h3>
                  </div>
                </DialogContent>
              </Grid>
              <Grid item>
                <div className="vote-description" style={{ "display":"flex", "justifyContent":"center"}}>
                <p>{issue.description}</p>
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
            <Button onClick={handleClose} variant="outlined" color="primary">
              Upvote
            </Button>
            <Button
              onClick={handleClose}
              variant="outlined"
              color="primary"
            >
              Report
            </Button>
          </section>
        </Dialog>
      </Grid>
    </div>
  );
}
