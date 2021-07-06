import React from 'react';
import classes from "./index.module.scss";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { Rating as MaterialRating } from '@material-ui/lab';

const CardFavoriteCuisines = () => {
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.card__media}
          image="/images/index/food.png"
          title=""
        />
        <CardContent className={classes.card__content}>
          <div className={classes.card__title}>Beef Stroganoff</div>
          <MaterialRating
            value={5}
            name="rating"
            size="medium"
          />
        </CardContent>
      </Card>
    );
  };
  
export default CardFavoriteCuisines;