import React, { useState } from 'react';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import logo from '../../../../../public/images/index/logo.svg';
import { CardActions } from '@material-ui/core';
import { useRouter } from 'next/router';
import classes from './index.module.scss';
import Typography from '@material-ui/core/Typography';
import { ButtonOrderNow } from '@/components/blocks/cart-page/button-order-now';
import { PortionsInput } from '@/components/blocks/cart-page/portions-input';

const StyledCardMedia = styled(CardMedia)`
  .MuiCardMedia-root {
    background-size: auto;
  }
`;

export const CartItemIngredients = props => {
  const { cartItemId, recipeId, title, image, ingredients } = props;
  const [isOrderButtonDisabled, setIsOrderButtonDisabled] = useState(true);
  const [portionsInputValue, setPortionsInputValue] = useState('');

  const price = 100;
  const router = useRouter();

  const redirectToRecipeCard = id => {
    router.push(`/recipe/${id}`);
  };

  const Ingredient = props => {
    const { pk, title, quantity, unit } = props;

    return (
      <div className={classes.card__ingredient}>
        <div className={classes.card__ingredient_title}>{title}</div>
        <div className={classes.card__ingredient_amount}>{`${quantity} ${unit}`}</div>
      </div>
    );
  };

  const handleOrderButtonClick = () => {
    console.log('OrderButton clicked');
  };

  const handlePortionsInputChange = event => {
    const newValue = event.target.value;
    console.log(portionsInputValue);
    if (newValue?.length === 0) {
      setIsOrderButtonDisabled(true);
    } else {
      setIsOrderButtonDisabled(false);
    }
    setPortionsInputValue(newValue);
  };

  const portionsInputProps = {
    value: portionsInputValue,
    onChangeHandler: handlePortionsInputChange
  };

  const orderButtonProps = {
    price,
    isDisabled: isOrderButtonDisabled,
    onClickHandler: handleOrderButtonClick
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
            className={classes.card__title}
            onClick={() => redirectToRecipeCard(recipeId)}
            title={title}>
            {title}
          </Typography>
          {ingredients && ingredients.map(ingredient => <Ingredient key={ingredient.pk} {...ingredient} />)}
        </div>
      </CardContent>
      <CardActions disableSpacing className={classes.card__actions}>
        <PortionsInput {...portionsInputProps} />
        <ButtonOrderNow {...orderButtonProps} />
      </CardActions>
    </Card>
  );
};
