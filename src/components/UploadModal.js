import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import SelectDropdown from './SelectDropdown';
import DialogTitle from '@material-ui/core/DialogTitle';
import ImageContainer from './ImageContainer';
import SelectTypeDropdown from './SelectTypeDropdown';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';


export default function UploadModal({
  renderPointsModal,
  handleIssueSubmitted,
  handleRenderPointsModalPostIssue, location, userId
}) {
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImage(null);
  };

  const handleChange = (event) => {
    console.log('hello');
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{ width: '100%', height: '4vh' }}
        color="primary"
        onClick={handleClickOpen}
      >
        Post an Issue
      </Button>
      <Grid container direction="row" justify="center" alignItems="center">
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth={true}
          maxWidth={'md'}
        >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <DialogTitle id="simple-dialog-title">
              <TextField id="standard-search" label="Issue Title" type="search" margin="normal" />
            </DialogTitle>
          </div>
          <Grid item>
            <DialogContent className="content">
              <input
                id="image-file"
                type="file"
                name="photo"
                accept="image/*;capture=camera"
                onChange={(e) => {
                  var imagefile = document.getElementById('image-file').files[0];
                  var reader = new FileReader();
                  reader.addEventListener(
                    'load',
                    function () {
                      setImage(this.result)
                      axios.post('/postImage', {
                        image: this.result,
                      }).then((result) => {
                        let url = result.data
                        setImage(url)
                      })
                    },
                    false
                  );
                  reader.readAsDataURL(imagefile);
                }}
              ></input>
              <Grid item>
                <DialogContent>
                  <ImageContainer image={image} />
                </DialogContent>
              </Grid>
              <Grid item>
                <DialogContent>
                  <SelectDropdown />
                  <SelectTypeDropdown />
                </DialogContent>
              </Grid>
              <Grid item>
                <div
                  className="vote-description"
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
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
            <Button
              onClick={() => {
                let item = `mutation{
                  createIssue(
                  title: ${null}
                  description: ${null}
                  photo_url: ${image}
                  user_id: ${userId}
                  issue_type_id: ${null}
                  borough_id: ${null}
                  lat: ${location.lat}
                  lng: ${location.lng}
                  )
                }{
                  id
                  title
                }
                `
                handleRenderPointsModalPostIssue();
                handleClose();
              }}
              variant="contained"
              color="primary"
            >
              Submit Issue
            </Button>
          </section>
        </Dialog>
      </Grid>
    </div>
  );
}
