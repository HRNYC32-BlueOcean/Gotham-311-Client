import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PointsContainer from "./PointsContainer.jsx";

export default function PointsModalPostIssue({postIssueModal, handleRenderPointsModalPostIssue}) {
  const [open, setOpen] = React.useState(postIssueModal ? true : false);
  const[points, setPoints] = React.useState(10)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false)
    
  };
  const handleChange = (event) => {
    console.log("hello")
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true}
  maxWidth = {'md'}>
      {/* <div style={{ "display":"flex", "justifyContent":"center"}}> 
            <DialogTitle id="simple-dialog-title">
                Issue Title Here
            </DialogTitle>
          </div> */}
          <DialogContent>
     
      <PointsContainer/>
      
          <h3 style={{ "display":"flex", "justifyContent":"center"}}>You just recieved {points} Gotham points!</h3>
          <div className="close-points-button" style={{ "display":"flex", "justifyContent":"center"}}>
          <Button onClick={() => {
            handleClose()
            handleRenderPointsModalPostIssue()
            }} variant="outlined" color="primary">
            Close
          </Button>
        </div>
          </DialogContent>
      </Dialog>
    </div>
  );
}
