import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function ImageContainer() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="subway-photo"
          height="auto"
          image="https://upload.wikimedia.org/wikipedia/commons/b/b7/North_Yorkshire_UK_relief_location_map.jpg"
        />
        <CardContent>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

