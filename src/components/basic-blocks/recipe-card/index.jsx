import React from 'react';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import logo from '../../../../public/images/index/logo.svg';
import { useRouter } from 'next/router';
import classes from './index.module.scss';
import { CounterButton } from '@/components/blocks/cart-page/button-counter';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '@/store/cart/actions';
import { Divider } from '@/components/basic-elements/divider';
import { ReactComponent as CartIcon } from '../../../../public/icons/Shopping Cart/Line.svg';
import { Button } from '@material-ui/core';

const StyledCardMedia = styled(CardMedia)`
  .MuiCardMedia-root {
    background-size: auto;
  }
`;

export const RecipeCard = props => {
  const { recipe } = props;

  const title = recipe.title;
  const image = recipe.images?.[0]?.url;
  const price = recipe.price;
  const author = recipe.user.full_name;

  const router = useRouter();
  const dispatch = useDispatch();

  const redirectToRecipeCard = id => {
    router.push(`/recipe/${id}`);
  };

  return (
    <Card variant="outlined" className={classes.card}>
      <StyledCardMedia
        className={classes.card__media}
        onClick={() => redirectToRecipeCard(recipe.pk)}
        image={image ?? logo}
        title="img"
      />
      <CardContent className={classes.card__content}>
        <div>
          <div className={classes.card__title} onClick={() => redirectToRecipeCard(recipe.pk)}>
            {title}
          </div>
          <Divider m="8px 0" color="#FFAA00" width="33%" />
          <p className={classes.card__author}>{`by Chef ${author}`}</p>
        </div>
      </CardContent>
      <Button className={classes.card_button} startIcon={<CartIcon />}>
        ${price}
      </Button>
    </Card>
  );
};
