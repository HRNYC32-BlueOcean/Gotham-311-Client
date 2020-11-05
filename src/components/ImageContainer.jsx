import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
});

export default function ImageContainer(props) {
  const classes = useStyles();

  return (
    <div className="card-Image-container" style={{ "display":"flex", "justifyContent":"center"}}>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="subway-photo"
          height="auto"
          width="auto"
          image={
            props.image ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTc111TqOByv02UVqoDNIgnhzyfPG7Fefd5-w&usqp=CAU'
          }
        />
        <CardContent></CardContent>
      </CardActionArea>
    </Card>
    </div>
  );
}
