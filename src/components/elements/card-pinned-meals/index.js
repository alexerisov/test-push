import React, { useEffect, useRef } from 'react';
import classes from './index.module.scss';
import Card from '@material-ui/core/Card';
import Link from 'next/link';
import { styled } from '@material-ui/core/styles';
import { CardActionArea } from '@material-ui/core';
import { useRouter } from 'next/router';
import $clamp from "clamp-js";
import logo from "/public/images/index/logo.svg";

const StyledCardActionArea = styled(CardActionArea)({
  position: 'relative',
  flex: '1',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start'
});

const CardPinnedMeals = ({ title, avatar, id }) => {
  const router = useRouter();
  const recipeTitle = useRef();

  useEffect(() => {
    $clamp(recipeTitle.current, {clamp: 2});
  });

  const redirectToRecipeCard = id => {
    router.push(`/recipe/${id}?autoplayVideo=true`);
  };

  const emptyPhoto = (
    <div className={classes.card__background}>
      <img className={classes.card__logo} src={logo} alt="logo"/>
    </div>
  );

  return (
    <Card className={classes.card} onClick={() => redirectToRecipeCard(id)}>
      <StyledCardActionArea onClick={() => redirectToRecipeCard(id)}>
        <div className={classes.card__content}>
          <div className={classes.card__avatarContainer}>
            {!avatar ? (
              emptyPhoto
            ) : (
              <img src={avatar} alt="avatar" className={classes.card__avatar} />
            )}
          </div>
          <div className={classes.card__column}>
            <p ref={recipeTitle}>{title}</p>
            <Link href={`/recipe/${id}`}>
              <a className={classes.card__cta}>Watch video!</a>
            </Link>
          </div>
        </div>
      </StyledCardActionArea>
    </Card>
  );
};

export default CardPinnedMeals;
