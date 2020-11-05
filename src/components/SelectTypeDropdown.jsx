import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectTypeDropdown() {
  const classes = useStyles();
  const handleChange = (event) => {

  };

  return (
    <div className="select-list" style={{ "display":"flex", "justifyContent":"center"}}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Issue Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={handleChange}
        >
          <MenuItem value={1}>Open Manhole</MenuItem>
          <MenuItem value={2}>Pothole</MenuItem>
          <MenuItem value={3}>Open Hydrant</MenuItem>
          <MenuItem value={4}>Assholes</MenuItem>
          <MenuItem value={5}>Social Conglomeration</MenuItem>
          <MenuItem value={6}>Drunk People</MenuItem>
          <MenuItem value={7}>Traffic Disturbance</MenuItem>
          <MenuItem value={8}>Power Outage</MenuItem>
          <MenuItem value={9}>Loud Music</MenuItem>
          <MenuItem value={10}>Hackers Hacking</MenuItem>
        </Select>
      </FormControl>
      </div>
  )
}