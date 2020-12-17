import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CartModal } from '../components';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
  media: {
    height: 200,
  },
});

export default function ProductCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} style={{ width: "200px"}}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Rp. {props.price.toLocaleString()}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <CartModal id={props.id} buttonLabel="Add to Cart"/>
      </CardActions>
    </Card>
  );
}