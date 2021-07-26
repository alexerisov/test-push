import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import classes from "./index.module.scss";

const CardFavouriteDishes = ({image, title}) => {
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.card__media}
        image={image}
        title=""
      />
      <CardContent className={classes.card__content}>
        <div>
          <p className={classes.card__title} title={title}>{title}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardFavouriteDishes;
