import React from 'react';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import logo from '../../../../../public/images/index/logo.svg';
import { useRouter } from 'next/router';
import classes from './index.module.scss';
import { CounterButton } from '@/components/blocks/cart-page/button-counter';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '@/store/cart/actions';

const StyledCardMedia = styled(CardMedia)`
  .MuiCardMedia-root {
    background-size: auto;
  }
`;

export const CartItemRecipe = props => {
  const { cartItemId, cartItemAmount, recipeId, author, title, image, price } = props;

  const router = useRouter();
  const dispatch = useDispatch();

  const onDeleteHandler = () => {
    dispatch(removeFromCart(cartItemId));
  };

  const redirectToRecipeCard = id => {
    router.push(`/recipe/${id}`);
  };

  return (
    <Card className={classes.card}>
      <StyledCardMedia
        className={classes.card__media}
        onClick={() => redirectToRecipeCard(recipeId)}
        image={image ?? logo}
        title="img"
      />
      <CardContent className={classes.card__content}>
        <div>
          <Typography
            variant="h6"
            noWrap
            className={classes.card__title}
            onClick={() => redirectToRecipeCard(recipeId)}
            title={title}>
            {title}
          </Typography>
          <p className={classes.card__author}>{`by Chef ${author}`}</p>
          <Typography onClick={onDeleteHandler} className={classes.card__delete}>
            Delete
          </Typography>
        </div>
      </CardContent>
      <CardContent className={classes.card__content2}>
        <span className={classes.card__price}>
          <span className={classes.card__dollar_symbol}>$</span>
          {price}
        </span>
        <CounterButton count={cartItemAmount} id={cartItemId} />
      </CardContent>
    </Card>
  );
};
