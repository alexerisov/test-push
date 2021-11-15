import React, { useState } from 'react';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import logo from '../../../../../public/images/index/logo.svg';
import { Accordion, AccordionDetails, CardActions } from '@material-ui/core';
import { useRouter } from 'next/router';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classes from './index.module.scss';
import Typography from '@material-ui/core/Typography';
import { ButtonOrderNow } from '@/components/blocks/cart-page/button-order-now';
import { PortionsInput } from '@/components/blocks/cart-page/portions-input';
import AccordionSummary from '@material-ui/core/AccordionSummary';

const StyledCardMedia = styled(CardMedia)`
  .MuiCardMedia-root {
    background-size: auto;
  }
`;

export const CartItemIngredients = props => {
  const { id, title, image, ingredients } = props;
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
        onClick={() => redirectToRecipeCard(id)}
        image={image ?? logo}
        title="img"
      />
      <CardContent className={classes.card__content}>
        <div>
          <Typography
            variant="h6"
            className={classes.card__title}
            onClick={() => redirectToRecipeCard(id)}
            title={title}>
            {title}
          </Typography>
          {/*<Accordion elevation="0" className={classes.card__accordion}>*/}
          {/*  <AccordionSummary*/}
          {/*    classes={{ root: classes.card__accordion_summary }}*/}
          {/*    expandIcon={<ExpandMoreIcon />}*/}
          {/*    aria-controls="panel1a-content"*/}
          {/*    id="panel1a-header">*/}
          {/*    <div className={classes.card__accordion_header}>Show ingredients</div>*/}
          {/*  </AccordionSummary>*/}
          {/*  <AccordionDetails className={classes.card__accordion_details}>*/}
          {/*    <div>*/}
          {/*      {ingredients && ingredients.map(ingredient => <Ingredient key={ingredient.pk} {...ingredient} />)}*/}
          {/*    </div>*/}
          {/*  </AccordionDetails>*/}
          {/*</Accordion>*/}
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
