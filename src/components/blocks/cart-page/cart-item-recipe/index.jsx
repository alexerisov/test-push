import React from 'react';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import logo from '~public/images/index/logo.svg';
import classes from './index.module.scss';
import { CounterButton } from '@/components/blocks/cart-page/button-counter';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '@/store/cart/actions';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import IceCreamIcon from '~public/icons/Ice Cream/Line.svg';
import HatChefIcon from '~public/icons/Hat Chef/Line.svg';
import { Divider } from '@/components/basic-elements/divider';
import { Button, IconButton } from '@material-ui/core';
import { COOKING_SKILLS, recipeTypes } from '@/utils/datasets';
import Link from 'next/link';
import { CartContext } from '@/components/pages/cart/CartPage';
import { useTranslation } from 'next-i18next';

const StyledCardMedia = styled(CardMedia)`
  .MuiCardMedia-root {
    background-size: auto;
  }
`;

export const CartItemRecipe = props => {
  const { t } = useTranslation('cart_item_recipe');
  const { cartItemId, cartItemAmount, recipe } = props;
  const title = recipe.title;
  const image = recipe.images?.[0]?.url;
  const price = recipe.price;

  const dispatch = useDispatch();
  const context = React.useContext(CartContext);
  const onDeleteHandler = () => {
    dispatch(removeFromCart(cartItemId, router.locale));
  };

  const viewAllHandler = () => {
    context.setIngredientsModalData({ cartItemId });
    context.openModalHandler();
  };

  return (
    <Card className={classes.card} variant="outlined">
      <Link href={`/recipe/${recipe.pk}`}>
        <a>
          <StyledCardMedia className={classes.card__media} image={image ?? logo} title={title} />
        </a>
      </Link>
      <CardContent className={classes.card__content_root}>
        <IconButton size="small" onClick={onDeleteHandler} className={classes.card__delete}>
          <ClearRoundedIcon />
        </IconButton>
        <div className={classes.card__content}>
          <div className={classes.card__title} title={title}>
            <a>{title}</a>
          </div>

          <div className={classes.categories}>
            <div className={classes.element_container}>
              <IceCreamIcon style={{ marginRight: 10 }} />

              <span className={classes.element_text}>
                {recipe.types.length > 0 ? recipe.types.map(item => recipeTypes?.[item] + ' ') : 'Not defined'}
              </span>
            </div>
            <div className={classes.element_container}>
              <HatChefIcon style={{ marginRight: 10 }} />
              <div className={classes.element_text}>{COOKING_SKILLS?.[recipe.cooking_skills] || 'Not defined'}</div>
            </div>
          </div>
        </div>
        <Divider m="20px 0" />
        <div className={classes.card__content2}>
          <div className={classes.card__ingredients}>
            <div className={classes.card__ingredients__title}>Ingredients:</div>
            <div className={classes.card__ingredients__items}>
              {recipe.ingredients?.map(ingredient => ingredient.title)?.join(', ') || 'Not defined'}
            </div>
            <Button onClick={viewAllHandler} className={classes.card__ingredients__button} variant="text">
              {t('view_all')}
            </Button>
          </div>
          <div className={classes.card__price_container}>
            <span className={classes.card__price}>
              <span className={classes.card__dollar_symbol}>$</span>
              {Number.parseFloat(price).toFixed(2)}
            </span>
            <CounterButton count={cartItemAmount} id={cartItemId} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
