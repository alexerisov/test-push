import React from 'react';
import classes from "./index.module.scss";
import RaitingIcon from "@/components/elements/rating-icon";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from "next/link";
import styled from 'styled-components';
import { CardActionArea } from '@material-ui/core';
import { useRouter } from 'next/router';

const StyledCardContent = styled(CardContent)`
  height: 100%;
`;

const CardPinnedMeals = ({ title, raitingValue, avatar, id }) => {

  const router = useRouter();

  const redirectToRecipeCard = (id) => {
    router.push(`/recipe/${id}`);
  };

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={() => redirectToRecipeCard(props.id)}>
        <StyledCardContent className={classes.card__content}>
          <div className={classes.card__avatarContainer}>
          { !avatar ? <img src="/images/index/default-avatar.png" alt="avatar" className={classes.card__avatar}/>
            : <img src={avatar} alt="avatar" className={classes.card__avatar} />
          }
          </div>
          <div className={classes.card__column}>
            <p>{title}</p>
            <span className={classes.card__raiting}>
              <RaitingIcon value={raitingValue} />
            </span>
            <Link href={`/recipe/${id}`}><a>Watch Live video</a></Link>
          </div>
        </StyledCardContent>
      </CardActionArea>
    </Card>
  );
};
  
export default CardPinnedMeals;