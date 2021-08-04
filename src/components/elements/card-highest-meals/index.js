import React from 'react';
import classes from "./index.module.scss";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import RaitingIcon from "@/components/elements/rating-icon";
import LikeIcon from "@/components/elements/like-icon";
import Link from "next/link";
import styled from 'styled-components';
import { CardActionArea } from '@material-ui/core';
import { useRouter } from 'next/router';

import { PUBLISH_STATUS, APPROVED_STATUS } from "@/utils/datasets";

const StyledCardMedia = styled(CardMedia)`
  .MuiCardMedia-root {
    background-size: auto;
  }
`;

const StyledCardContent = styled(CardContent)`
  padding: 16px;
`;

const StyledCardActionArea = styled(CardActionArea)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-start;
`;

const CardHighestMeals = (props) => {
  const router = useRouter();

  const redirectToRecipeCard = (id) => {
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

  return (
    <Card className={classes.card}>
      <StyledCardActionArea onClick={() => redirectToRecipeCard(props.id)}>
        <StyledCardMedia
          className={classes.card__media}
          image={props.image}
          title=""
        />
        <StyledCardContent className={classes.card__content}>
          <div>
            <p className={classes.card__name} title={props.title}>{props.title}</p>
            <p className={classes.card__author}>{`by Chef ${props.name}`}</p>
            <p className={classes.card__location}>{props.city}</p>
            <div className={classes.card__likeIcon}><LikeIcon value={props.likes} /></div>
            {props.publishStatus &&
            <div className={classes.card__status}>{getStatusOfCard()}</div>}
          </div>
        </StyledCardContent>
      </StyledCardActionArea>
    </Card>
  );
};
  
export default CardHighestMeals;