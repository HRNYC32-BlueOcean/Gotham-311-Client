import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import metro from "../../metro.jpg"

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function PointsContainer() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="auto"
          image={metro}
          title="Contemplative Reptile"
        />
        <CardContent>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

