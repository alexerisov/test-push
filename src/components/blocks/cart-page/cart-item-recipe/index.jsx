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

const StyledCardMedia = styled(CardMedia)`
  .MuiCardMedia-root {
    background-size: auto;
  }
`;

export const CartItemRecipe = props => {
  const { id, author, title, image } = props;
  console.log(props.products);

  const price = 100;

  const router = useRouter();

  const redirectToRecipeCard = id => {
    router.push(`/recipe/${id}`);
  };

  return (
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
  );
};
