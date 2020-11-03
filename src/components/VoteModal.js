import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import SelectDropdown from './SelectDropdown';
import DialogTitle from '@material-ui/core/DialogTitle';
import ImageContainer from './ImageContainer';
import Grid from '@material-ui/core/Grid';

export default function VoteModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    console.log('hello');
  };

  return (
    <div>
     <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open Vote Modal
      </Button>
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
                Issue Title Here
            </DialogTitle>
          </div>
          <Grid item>
            <DialogContent className="content">
              <Grid item>
                <DialogContent>
                  <ImageContainer />
                </DialogContent>
              </Grid>
              <Grid item>
                <DialogContent>
                  <SelectDropdown />
                <div>{}</div>
                </DialogContent>
              </Grid>
              <Grid item>
                <div className="vote-description" style={{ "display":"flex", "justifyContent":"center"}}>
                <TextField
                  variant="outlined"
                  multiline
                  id="outlined-multiline-flexible"
                  label="Description"
                />
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
              upvote
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
