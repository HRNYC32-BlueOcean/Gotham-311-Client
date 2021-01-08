import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PointsContainer from './PointsContainer.jsx';
import axios from 'axios';
const api_url = process.env.API_URL;

export default function PointsModal({
  renderPointsModal,
  upVote,
  issueSubmitted,
  handleIssueSubmitted,
  id,
  points,
  triggerChange,
}) {
  const [open, setOpen] = React.useState(renderPointsModal ? true : false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    triggerChange(1);
    axios({
      url: api_url,
      method: 'post',
      data: {
        query: `mutation {
          updateUser(
            id: ${parseInt(id)}
            points: ${points + 1}
             )
          }
      `,
      },
    });
    setOpen(false);
  };
  const handleChange = (event) => {
    console.log('hello');
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <PointsContainer />
          <h3 style={{ display: 'flex', justifyContent: 'center' }}>
            You just recieved 1 Gotham points!
          </h3>
          <div
            className="close-points-button"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Button onClick={handleClose} variant="outlined" color="primary">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
