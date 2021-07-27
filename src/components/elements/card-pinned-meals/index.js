import React from 'react';
import classes from "./index.module.scss";
import RaitingIcon from "@/components/elements/rating-icon";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from "next/link";
import styled from 'styled-components';

const StyledCardContent = styled(CardContent)`
  height: 100%;
`;

const CardPinnedMeals = ({ title, raitingValue, avatar, id }) => {
    return (
      <Card className={classes.card}>
        <StyledCardContent className={classes.card__content}>
          <div className={classes.card__avatarContainer}>
          { !avatar ? <img src="/images/index/default-avatar.png" alt="avatar" className={classes.card__avatar}/>
            : <img src={avatar} alt="avatar" className={classes.card__avatar} />
          }
          </div>
          <div className={classes.card__column}>
            <p>{title}</p>
            <Link href={`/recipe/${id}`}><a>Watch Live video</a></Link>
          </div>
        </StyledCardContent>
      </Card>
    );
  };
  
export default CardPinnedMeals;