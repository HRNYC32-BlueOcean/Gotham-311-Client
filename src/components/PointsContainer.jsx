import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';


const useStyles = makeStyles({
  root: {
    maxWidth: '60vw',
    maxHeight: '30vh',
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
          image="https://images.squarespace-cdn.com/content/v1/586655993e00be8358539c69/1545319688152-NPMHLJBWYB55DC76Z8G5/ke17ZwdGBToddI8pDm48kCBx5CzVFwPRnpdXnThS_2AUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcx0ocC39n7YhXo83-EdL3jJZo9njt1UK3A_nObMmtt_Ajj6Lxfmk2Apsead943iay/ItsforGotham_logo_v008.2-01.jpg?format=1500w"
          title="Contemplative Reptile"
        />
        <CardContent>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

