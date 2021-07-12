import React from 'react';
import classes from "./index.module.scss";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { Rating as MaterialRating } from '@material-ui/lab';

const CardFavoriteCuisines = (props) => {
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.card__media}
          image={props.image}
          title=""
        />
        <CardContent className={classes.card__content}>
          <div className={classes.card__title}>{props.title}</div>
          <MaterialRating
            value={props.rating ? props.rating : 0}
            name="rating"
            size="medium"
          />
        </CardContent>
      </Card>
    );
  };
  
export default CardFavoriteCuisines;