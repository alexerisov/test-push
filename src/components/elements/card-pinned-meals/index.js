import React from 'react';
import classes from './index.module.scss';
import Card from '@material-ui/core/Card';
import Link from 'next/link';
import styled from 'styled-components';
import { CardActionArea } from '@material-ui/core';
import { useRouter } from 'next/router';

const StyledCardActionArea = styled(CardActionArea)`
  flex: 1;
`;

const CardPinnedMeals = ({ title, raitingValue, avatar, id }) => {
  const router = useRouter();

  const redirectToRecipeCard = id => {
    router.push(`/recipe/${id}?autoplayVideo=true`);
  };

  return (
    <Card className={classes.card} onClick={() => redirectToRecipeCard(id)}>
      <StyledCardActionArea onClick={() => redirectToRecipeCard(id)}>
        <div className={classes.card__content}>
          <div className={classes.card__avatarContainer}>
            {!avatar ? (
              <img src="/images/index/default-avatar.png" alt="avatar" className={classes.card__avatar} />
            ) : (
              <img src={avatar} alt="avatar" className={classes.card__avatar} />
            )}
          </div>
          <div className={classes.card__column}>
            <p>{title}</p>
            <Link href={`/recipe/${id}`}>
              <a>Watch video!</a>
            </Link>
          </div>
        </div>
      </StyledCardActionArea>
    </Card>
  );
};

export default CardPinnedMeals;
