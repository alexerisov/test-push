import React, { useState } from 'react';
import classes from './index.module.scss';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { styled } from '@material-ui/core/styles';
import { CardActionArea, Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import { ReactComponent as StopwatchIcon } from '../../../../../public/icons/Stopwatch/Line.svg';
import { ReactComponent as HatChefIcon } from '../../../../../public/icons/Hat Chef/Line.svg';
import { ReactComponent as CartIcon } from '../../../../../public/icons/Shopping Cart/Line.svg';
import { ReactComponent as CommentIcon } from '../../../../../public/icons/Comment/Line.svg';
import { ReactComponent as LikeIcon } from '../../../../../public/icons/Like/Line.svg';

import { ReactComponent as BurgerIcon } from '../../../../../public/icons/Burger/Line.svg';
import { ReactComponent as ServingPlateIcon } from '../../../../../public/icons/Serving Plate/Line.svg';
import { ReactComponent as SoupIcon } from '../../../../../public/icons/Soup/Line.svg';
import { ReactComponent as IceCreamIcon } from '../../../../../public/icons/Ice Cream/Line.svg';
import { ReactComponent as FrenchFriesIcon } from '../../../../../public/icons/French Fries/Line.svg';
import { ReactComponent as CarrotIcon } from '../../../../../public/icons/Carrot/Line.svg';
import { ReactComponent as DonutIcon } from '../../../../../public/icons/Donut/Line.svg';

import { PUBLISH_STATUS, APPROVED_STATUS, recipeTypes, cookingSkill } from '@/utils/datasets';
import logo from '/public/images/index/logo.svg';
import CardControlPlay from '@/components/elements/card-control-play';
import ChefIcon from '@/components/elements/chef-icon';
import { numberWithCommas } from '@/utils/converter';
import { addToCart } from '@/store/cart/actions';
import { modalActions } from '@/store/actions';
import { SavedIcon } from '../..';
import { CounterButton } from '@/components/blocks/cart-page/button-counter';
import { useDispatch, useSelector } from 'react-redux';
import { BasicIcon } from '@/components/basic-elements/basic-icon';

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
                {props.cookingTypes?.length > 0 ? (
                  props.cookingTypes.map((el, ind) => (
                    <div className={classes.card__label} key={`${el}-${ind}`}>
                      <BasicIcon icon={recipeTypesImg?.[el] || IceCreamIcon} size="16px" />
                      {recipeTypes?.[el] || 'Not defined'}
                    </div>
                  ))
                ) : (
                  <div className={classes.card__label}>
                    <BasicIcon icon={IceCreamIcon} size="16px" />
                    {'Not defined'}
                  </div>
                )}
              </div>
              <div className={classes.card__label_right}>
                <BasicIcon icon={HatChefIcon} size="16px" />
                {props.cookingSkill ? cookingSkill[props.cookingSkill] : 'Not defined'}
              </div>
            </div>
            {props.unsalable === true ? (
              <>
                <div className={classes.card__line} />
                <div className={classes.card__socialStat}>
                  <div className={classes.card__socialStat__item}>
                    <BasicIcon icon={LikeIcon} color="#FF582E" size="16px" />
                    {props.likes ? numberWithCommas(`${props.likes}`) : 0}
                  </div>
                  <div className={classes.card__socialStat__item}>
                    <BasicIcon icon={CommentIcon} size="16px" />
                    {props.comments_number ? numberWithCommas(`${props.comments_number}`) : 0}
                  </div>
                </div>
              </>
            ) : props.price > 0 && !showCounter ? (
              <Button
                className={classes.card__uploadButton}
                classes={{ label: classes.card__uploadButton__label }}
                variant="outlined"
                color="primary"
                onClick={handleClickBtn}>
                <BasicIcon icon={CartIcon} color="#FB8C00" size="18px" />
                {props.price}
              </Button>
            ) : showCounter === true ? (
              <div onClick={e => e.stopPropagation()} className={classes.card__counterWrap}>
                {`$${props.price}`}
                <CounterButton count={cartItemAmount} id={cartItemId} />
              </div>
            ) : null}
            <div className={classes.card__timeWrap}>
              <BasicIcon icon={StopwatchIcon} size="12px" />
              {props.cookingTime || '—:—'}
            </div>

            {/* {props.publishStatus && <div className={classes.card__status}>{getStatusOfCard()}</div>} */}
          </div>
        </StyledCardContent>
      </StyledCardActionArea>
    </Card>
  );
};

export default CardSearch;
