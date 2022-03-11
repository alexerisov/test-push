import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { CardActionArea } from '@material-ui/core';
import { useRouter } from 'next/router';

import classes from './index.module.scss';

const CardFavouriteDishes = ({ image, title, recipeId }) => {
  const router = useRouter();

  const redirectToRecipeCard = id => {
    router.push(`/recipe/${id}`, undefined, { locale: router.locale });
  };

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={() => redirectToRecipeCard(recipeId)}>
        <CardMedia className={classes.card__media} title="" image={image} />
        <CardContent className={classes.card__content}>
          <div>
            <p className={classes.card__title}>{title}</p>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardFavouriteDishes;
