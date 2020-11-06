import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PointsContainer from './PointsContainer.jsx';

export default function RewardsModal() {
  const [open, setOpen] = React.useState(postIssueModal ? true : false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'md'}>
        <DialogContent>
          <p>You will recieve email instructions on how to claim your reward</p>
          <div
            className="close-points-button"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Button
              onClick={() => {
                handleClose();
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
