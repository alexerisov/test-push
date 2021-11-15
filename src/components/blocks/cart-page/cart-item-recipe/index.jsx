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

export const CartItemRecipe = props => {
  const { id } = props;
  const price = 100;
  const router = useRouter();

  const { data, isLoading } = useFetch({
    request: Recipe.getUploadRecipes,
    query: { page: 1, page_size: 1 }
  });

  const author = data[0].user.full_name;
  const title = data[0].title;
  const image = data[0].images[0]?.url;

  const redirectToRecipeCard = id => {
    router.push(`/recipe/${id}`);
  };

  return (
    !isLoading && (
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
              onClick={() => redirectToRecipeCard(props.id)}
              title={title}>
              {title}
            </Typography>
            <p className={classes.card__author}>{`by Chef ${author}`}</p>
            <Typography className={classes.card__delete}>Delete</Typography>
          </div>
        </CardContent>
        <CardContent className={classes.card__content2}>
          <span className={classes.card__price}>
            <span className={classes.card__dollar_symbol}>$</span>
            {price}
          </span>
          <CounterButton />
        </CardContent>
      </Card>
    )
  );
};
