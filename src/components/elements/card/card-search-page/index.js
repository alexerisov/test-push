import React, { useEffect, useState } from 'react';
import classes from './index.module.scss';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { styled } from '@material-ui/core/styles';
import { CardActionArea, Button, NoSsr } from '@material-ui/core';
import { useRouter } from 'next/router';
import StopwatchIcon from '~public/icons/Stopwatch/Line.svg';
import HatChefIcon from '~public/icons/Hat Chef/Line.svg';
import CartIcon from '~public/icons/Shopping Cart/Line.svg';
import CommentIcon from '~public/icons/Comment/Line.svg';
import LikeIcon from '~public/icons/Like/Line.svg';

import BurgerIcon from '~public/icons/Burger/Line.svg';
import ServingPlateIcon from '~public/icons/Serving Plate/Line.svg';
import SoupIcon from '~public/icons/Soup/Line.svg';
import IceCreamIcon from '~public/icons/Ice Cream/Line.svg';
import FrenchFriesIcon from '~public/icons/French Fries/Line.svg';
import CarrotIcon from '~public/icons/Carrot/Line.svg';
import DonutIcon from '~public/icons/Donut/Line.svg';

import { PUBLISH_STATUS, APPROVED_STATUS, recipeTypes, cookingSkill as cookingSkills } from '@/utils/datasets';
import logo from '~public/images/index/logo.svg';
import ChefIcon from '@/components/elements/chef-icon';
import { numberWithCommas } from '@/utils/converter';
import { addToCart } from '@/store/cart/actions';
import { modalActions } from '@/store/actions';
import { SavedIcon } from '../..';
import { CounterButton } from '@/components/blocks/cart-page/button-counter';
import { useDispatch, useSelector } from 'react-redux';
import { BasicIcon } from '@/components/basic-elements/basic-icon';
import { useAuth } from '@/utils/Hooks';
import { useTranslation } from 'next-i18next';

const recipeTypesImg = {
  1: BurgerIcon,
  2: ServingPlateIcon,
  3: SoupIcon,
  4: IceCreamIcon,
  5: IceCreamIcon,
  6: FrenchFriesIcon,
  7: CarrotIcon,
  8: DonutIcon
};

const StyledCardMedia = styled(CardMedia)`
  .MuiCardMedia-root {
    background-size: auto;
  }
`;

const StyledCardContent = styled(CardContent)`
  padding: 16px;
  width: 100%;
`;

const StyledCardActionArea = styled(CardActionArea)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'flex-start'
});

const SocialBlock = ({ likes, comments_number }) => (
  <>
    <div className={classes.card__line} />
    <div className={classes.card__socialStat}>
      <div className={classes.card__socialStat__item}>
        <BasicIcon icon={LikeIcon} color="#FF582E" size="16px" />
        {likes ? numberWithCommas(`${likes}`) : 0}
      </div>
      <div className={classes.card__socialStat__item}>
        <BasicIcon icon={CommentIcon} size="16px" />
        {comments_number ? numberWithCommas(`${comments_number}`) : 0}
      </div>
    </div>
  </>
);

const SellingBlock = ({ isRecipeInCart, handleClickBtn, cartItemAmount, cartItemId, price }) => (
  <NoSsr>
    {!isRecipeInCart && (
      <Button
        className={classes.card__uploadButton}
        classes={{ label: classes.card__uploadButton__label }}
        variant="outlined"
        color="primary"
        onClick={handleClickBtn}>
        <BasicIcon icon={CartIcon} color="#FB8C00" size="18px" />${price}
      </Button>
    )}
    {isRecipeInCart && (
      <div onClick={e => e.stopPropagation()} className={classes.card__counterWrap}>
        {`$${price}`}
        <CounterButton count={cartItemAmount} id={cartItemId} />
      </div>
    )}
  </NoSsr>
);

const CardSearch = props => {
  const { recipe, disableBorder } = props;
  const title = recipe.title;
  const image = recipe.images?.[0]?.url;
  const name = recipe.user?.full_name;
  const city = recipe.user?.city;
  const likes = recipe.likes_number;
  const isParsed = recipe.is_parsed;
  const publishStatus = recipe.publish_status;
  const hasVideo = recipe.video;
  const cookingTime = recipe.cooking_time;
  const cookingSkill = recipe.cooking_skills;
  const cookingTypes = recipe.types;
  const user_saved_recipe = recipe.user_saved_recipe;
  const price = recipe.price;
  const comments_number = recipe.comments_number;
  const id = recipe.pk;
  const unsalable = recipe.sale_status !== 5;

  const { session, status: loading } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation('recipeClassifications');
  const [showCounter, setShowCounter] = useState(false);
  const [counter, setCounter] = useState(1);
  const redirectToRecipeCard = id => {
    router.push(`/recipe/${id}`, undefined, { locale: router.locale });
  };

  const getStatusOfCard = () => {
    if (publishStatus === PUBLISH_STATUS.notPublished) {
      return 'Saved';
    }

    if (reviewStatus) {
      switch (reviewStatus) {
        case 1:
          return APPROVED_STATUS[1];
        case 2:
          return APPROVED_STATUS[2];
        case 3:
          return APPROVED_STATUS[3];
      }
    }
  };

  //Cart
  const cartItem = useSelector(state => state.cart.products?.find(el => el.object.pk === id));
  const isRecipeInCart = useSelector(state => state.cart.products?.some(el => el.object_id == id));
  const cartItemId = cartItem?.pk;
  const cartItemAmount = cartItem?.count;

  useEffect(() => {
    setShowCounter(isRecipeInCart);
  }, [isRecipeInCart]);

  const handleClickBtn = e => {
    e.stopPropagation();
    if (!session) {
      return dispatch(modalActions.open('register'));
    }

    dispatch(addToCart(id));
  };

  const SocialBlockProps = {
    likes: likes,
    comments_number: comments_number
  };

  const SellingBlockProps = {
    isRecipeInCart,
    handleClickBtn,
    cartItemAmount,
    cartItemId,
    price: price
  };

  return (
    <Card
      className={`${classes.card} ${disableBorder ? classes.card_disableBorder : ''}`}
      variant="elevation"
      style={{ border: '1px red !important' }}>
      <StyledCardActionArea onClick={() => redirectToRecipeCard(id)}>
        <StyledCardMedia className={classes.card__media} image={image ?? logo} title="" />

        {user_saved_recipe ? (
          <SavedIcon />
        ) : isParsed && publishStatus === PUBLISH_STATUS.published ? (
          <ChefIcon type="common" />
        ) : null}
        <StyledCardContent className={classes.card__content}>
          <div className={classes.card__wrap}>
            <p className={classes.card__name} title={title}>
              {title}
            </p>
            <div className={classes.card__labels}>
              <div className={classes.card__label_left}>
                <div className={classes.card__label}>
                  <BasicIcon icon={IceCreamIcon} size="16px" />
                  <p>
                    {cookingTypes?.length > 0
                      ? cookingTypes
                          .map(el => {
                            const typeName = t(`types.${recipeTypes[el]?.toLowerCase()}`);
                            return typeName || '一一';
                          })
                          .join(', ')
                      : '一一'}
                  </p>
                </div>
              </div>
              <div className={classes.card__label_right}>
                <BasicIcon icon={HatChefIcon} size="16px" />
                {cookingSkill ? t(`cookingSkill.${cookingSkills[cookingSkill]?.toLowerCase()}`) : '一一'}
              </div>
            </div>

            {unsalable ? <SocialBlock {...SocialBlockProps} /> : <SellingBlock {...SellingBlockProps} />}

            <div className={classes.card__timeWrap}>
              <BasicIcon icon={StopwatchIcon} size="12px" />
              {cookingTime || '—:—'}
            </div>
          </div>
        </StyledCardContent>
      </StyledCardActionArea>
    </Card>
  );
};

export default CardSearch;
