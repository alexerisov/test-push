import React from 'react';
import classes from './index.module.scss';
import { Box, Fade, IconButton, Modal } from '@material-ui/core';
import IceCreamIcon from '~public/icons/Ice Cream/Line.svg';
import { COOKING_SKILLS, recipeTypes } from '@/utils/datasets';
import HatChefIcon from '~public/icons/Hat Chef/Line.svg';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@/components/basic-elements/divider';
import { CounterButton } from '@/components/blocks/cart-page/button-counter';
import { useSelector } from 'react-redux';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

export const IngredientsModal = props => {
  const { data, closeModalHandler, isModalOpen } = props;
  const cartItem = useSelector(state => state.cart.products?.find(el => el.pk === data?.cartItemId));
  const recipe = cartItem?.object;

  const title = recipe?.title;
  const image = recipe?.images?.[0]?.url;
  const price = recipe?.price;
  const recipeTypesList = recipe?.types;
  const recipeCookingSkills = recipe?.cooking_skills;
  const ingredients = recipe?.ingredients;

  const cartItemId = cartItem?.pk;
  const cartItemAmount = cartItem?.count;

  const TableHeader = () => (
    <div className={classes.header__container}>
      <span className={classes.table__header}>Name</span>
      <span className={classes.table__header}>Amount</span>
      <span className={classes.table__header}>Seller</span>
      <span className={classes.table__header__price}>Price</span>
    </div>
  );

  const Ingredient = props => {
    const { title, quantity, unit, custom_unit } = props;

    return (
      <div className={classes.ingredient__container}>
        <span className={classes.ingredient__name}>{title}</span>
        <span className={classes.ingredient__amount}>
          {custom_unit?.metric_name ? (
            <abbr
              style={{ cursor: 'help' }}
              title={`${quantity * custom_unit?.metric_value} ${custom_unit?.metric_unit}`}>
              {quantity} {custom_unit?.metric_name}
            </abbr>
          ) : (
            <span>
              {quantity} {unit}
            </span>
          )}
        </span>
        <span className={classes.ingredient__seller}>Unbranded Chicken</span>
        <span className={classes.ingredient__price}>$0.00</span>
      </div>
    );
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={closeModalHandler}
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description">
      <Fade in={isModalOpen}>
        <div className={classes.modal__content}>
          <Box display="flex" alignItems="center" gridColumnGap="24px" padding="32px 32px 24px 32px">
            <img className={classes.image} src={image} alt="image" />
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Typography variant="h6" noWrap className={classes.title} title={title}>
                {title}
              </Typography>
              <div className={classes.categories}>
                <div className={classes.element_container}>
                  <IceCreamIcon style={{ marginRight: 10 }} />

                  <span className={classes.element_text}>
                    {recipeTypesList?.length > 0
                      ? recipeTypesList.map(item => recipeTypes?.[item] + ' ')
                      : 'Not defined'}
                  </span>
                </div>
                <div className={classes.element_container}>
                  <HatChefIcon style={{ marginRight: 10 }} />
                  <div className={classes.element_text}>{COOKING_SKILLS?.[recipeCookingSkills] || 'Not defined'}</div>
                </div>
              </div>
            </Box>
            <IconButton size="small" onClick={closeModalHandler} className={classes.close_icon}>
              <ClearRoundedIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box className={classes.body} display="flex" flexDirection="column" padding="24px 32px">
            <div className={classes.body__title}>Ingredients</div>
            <div>
              <TableHeader />
              {ingredients?.map(ingredient => <Ingredient key={ingredient.pk} {...ingredient} />) ||
                'There are no ingredients'}
            </div>
          </Box>
          <Divider />
          <Box
            className={classes.footer}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding="24px 32px">
            <CounterButton count={cartItemAmount} id={cartItemId} />
            <div className={classes.total}>
              <span className={classes.total__text}>Total (USD)</span>
              <span className={classes.total__number}>${Number.parseFloat(price).toFixed(2) ?? 0}</span>
            </div>
          </Box>
        </div>
      </Fade>
    </Modal>
  );
};
