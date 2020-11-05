import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PointsContainer from './PointsContainer.jsx';

export default function PointsModal({
  renderPointsModal,
  upVote,
  issueSubmitted,
  handleIssueSubmitted,
}) {
  const [open, setOpen] = React.useState(renderPointsModal ? true : false);
  const [points, setPoints] = React.useState(1);

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
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'md'}>
        {/* <div style={{ "display":"flex", "justifyContent":"center"}}> 
            <DialogTitle id="simple-dialog-title">
                Issue Title Here
            </DialogTitle>
          </div> */}
        <DialogContent>
          <PointsContainer />

          <h3 style={{ display: 'flex', justifyContent: 'center' }}>
            You just recieved {points} Gotham point!
          </h3>
          <div
            className="close-points-button"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Button
              onClick={() => {
                handleClose();
                renderPointsModal();
                handleIssueSubmitted();
              }}
              variant="contained"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
