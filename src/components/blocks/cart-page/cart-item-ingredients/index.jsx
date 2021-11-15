import React from 'react';
import { styled, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import logo from '../../../../../public/images/index/logo.svg';
import { Button, CardActionArea, CardActions } from '@material-ui/core';
import { useRouter } from 'next/router';
import ChefIcon from '@/components/elements/chef-icon';
import classes from './index.module.scss';
import { CounterButton } from '@/components/blocks/cart-page/button-counter';
import Typography from '@material-ui/core/Typography';
import { useFetch } from '@/customHooks/useFetch';
import Recipe from '@/api/Recipe';

const StyledCardMedia = styled(CardMedia)`
  .MuiCardMedia-root {
    background-size: auto;
  }
`;

export const CardItemIngredients = props => {
  const { id } = props;

  const price = 100;
  const router = useRouter();

  const redirectToRecipeCard = id => {
    router.push(`/recipe/${id}`);
  };

  const { data, isLoading } = useFetch({
    request: Recipe.getPopularRecipes
  });

  const title = data[0].title;
  const image = data[0].images[0]?.url;
  const ingredients = data[0].ingredients;

  const Ingredient = props => {
    const { pk, title, quantity, unit } = props;

    return (
      <div className={classes.card__ingredient_wrapper}>
        <Typography className={classes.card__ingredient_title}>{title}</Typography>
        <Typography className={classes.card__ingredient_amount}>
          {quantity}
          {unit}
        </Typography>
      </div>
    );
  };

  return (
    isLoading && (
      <Card className={classes.card}>
        <StyledCardMedia
          className={classes.card__media}
          onClick={() => redirectToRecipeCard(id)}
          image={image ?? logo}
          title="img"
        />
        <CardContent className={classes.card__content}>
          <div>
            <Typography
              variant="h6"
              noWrap
              className={classes.card__title}
              onClick={() => redirectToRecipeCard(id)}
              title={title}>
              {title}
            </Typography>
            {console.log(ingredients)}
            {ingredients && ingredients.map(ingredient => <Ingredient key={ingredient.pk} {...ingredient} />)}
          </div>
        </CardContent>
      </Card>
    )
  );
};
