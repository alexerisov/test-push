import React, { useState } from 'react';
import classes from './index.module.scss';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import LikeIcon from '@/components/elements/like-icon';
import { styled } from '@material-ui/core/styles';
import { CardActionArea, Button } from '@material-ui/core';
import { useRouter } from 'next/router';

import { PUBLISH_STATUS, APPROVED_STATUS, recipeTypes, recipeTypesImg, cookingSkill } from '@/utils/datasets';
import logo from '/public/images/index/logo.svg';
import CardControlPlay from '@/components/elements/card-control-play';
import ChefIcon from '@/components/elements/chef-icon';
import { numberWithCommas } from '@/utils/converter';
import { addToCart } from '@/store/cart/actions';
import { modalActions } from '@/store/actions';
import { SavedIcon } from '../..';
import { CounterButton } from '@/components/blocks/cart-page/button-counter';
import { useDispatch, useSelector } from 'react-redux';

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

const CardSearch = props => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showCounter, setShowCounter] = useState(false);
  const [counter, setCounter] = useState(1);
  const redirectToRecipeCard = id => {
    router.push(`/recipe/${id}`);
  };

  const getStatusOfCard = () => {
    if (props.publishStatus === PUBLISH_STATUS.notPublished) {
      return 'Saved';
    }

    if (props.reviewStatus) {
      switch (props.reviewStatus) {
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
  const cartItem = useSelector(state => state.cart.products?.find(el => el.object.pk === props.id));
  const isRecipeInCart = useSelector(state => state.cart.products?.some(el => el.object_id == props.id));
  const cartItemId = cartItem?.pk;
  const cartItemAmount = cartItem?.count;

  const handleClickBtn = e => {
    if (props.token === true) {
      e.stopPropagation();
      setShowCounter(true);
      if (!isRecipeInCart) dispatch(addToCart(props.id));
    } else {
      e.stopPropagation();
      dispatch(modalActions.open('register'));
    }
  };

  return (
    <Card className={classes.card}>
      <StyledCardActionArea onClick={() => redirectToRecipeCard(props.id)}>
        <StyledCardMedia className={classes.card__media} image={props.image ?? logo} title="" />

        {props.user_saved_recipe === 1 ? (
          <SavedIcon />
        ) : props.isParsed && props.publishStatus === PUBLISH_STATUS.published ? (
          <ChefIcon type="common" />
        ) : null}
        <StyledCardContent className={classes.card__content}>
          <div className={classes.card__wrap}>
            <p className={classes.card__name} title={props.title}>
              {props.title}
            </p>
            {/* <p className={classes.card__author}>{`by Chef ${props.name}`}</p> */}
            {/* <p className={classes.card__location}>{props.city}</p> */}
            {/* <div className={classes.card__likeIcon}>
              <LikeIcon value={props.likes} />
            </div> */}
            {/* {props.hasVideo && <CardControlPlay />} */}
            <div className={classes.card__labels}>
              <div className={classes.card__label_left}>
                {props.cookingTypes.map((el, ind) => (
                  <div className={classes.card__label} key={`${el}-${ind}`}>
                    <img src={recipeTypesImg[el]} alt="type-icon" />
                    {recipeTypes[el]}
                  </div>
                ))}
              </div>
              <div className={classes.card__label_right}>
                {props.cookingSkill && <img className={classes.icon} src="icons/Hat Chef/Line.svg" alt="chef-hat" />}
                {cookingSkill[props.cookingSkill]}
              </div>
            </div>
            {props.unsalable === true ? (
              <>
                <div className={classes.card__line} />
                <div className={classes.card__socialStat}>
                  <div className={classes.card__socialStat__item}>
                    <img src="icons/Like.svg" alt="likes" />
                    {numberWithCommas(`${props.likes}`)}
                  </div>
                  <div className={classes.card__socialStat__item}>
                    <img src="icons/Comment/Line.svg" alt="comment" />
                    {numberWithCommas(`${props.comments_number}`)}
                  </div>
                </div>
              </>
            ) : props.price > 0 && !showCounter ? (
              <Button
                className={classes.card__uploadButton}
                variant="outlined"
                color="primary"
                onClick={handleClickBtn}>
                <img src="icons/Shopping Cart/Line.svg" alt="cart" /> {`$${props.price}`}
              </Button>
            ) : showCounter === true ? (
              <div onClick={e => e.stopPropagation()} className={classes.card__counterWrap}>
                {`$${props.price}`}
                <CounterButton count={cartItemAmount} id={cartItemId} />
              </div>
            ) : null}
            {props.cookingTime && (
              <div className={classes.card__timeWrap}>
                <img src="icons/Stopwatch/Line.svg" alt="stopwatch" />
                {props.cookingTime}
              </div>
            )}
            {/* {props.publishStatus && <div className={classes.card__status}>{getStatusOfCard()}</div>} */}
          </div>
        </StyledCardContent>
      </StyledCardActionArea>
    </Card>
  );
};

export default CardSearch;
