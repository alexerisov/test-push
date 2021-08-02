import React, { useState } from 'react';
import { useDispatch } from "react-redux";
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
import savedRecipesActions from '@/store/savedRecipes/actions';

import savedStatus from './saved.svg';

const StyledCardMedia = styled(CardMedia)`
  .MuiCardMedia-root {
    background-size: auto;
  }
`;

const CardHighestMeals = (props) => {
  const dispatch = useDispatch();
  const [saved, setSaved] = useState(props.isSavedByUser);

  const router = useRouter();

  const redirectToRecipeCard = (id) => {
    router.push(`/recipe/${id}`);
  };

  const handlerSavingRecipe = (e) => {
    e.stopPropagation();
    dispatch(savedRecipesActions.startSavedRecipesRequests());

    if (!saved) {
      dispatch(savedRecipesActions.saveRecipe({ recipeId: props.id }));
      setSaved(true);
      return;
    }

    dispatch(savedRecipesActions.deleteFromSaved({ recipeId: props.id }));
    setSaved(false);
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
      <CardActionArea onClick={() => redirectToRecipeCard(props.id)}>
        <StyledCardMedia
          className={classes.card__media}
          image={props.image}
          title=""
        />
        <CardContent className={classes.card__content}>
          <div>
            <p className={classes.card__name} title={props.title}>{props.title}</p>
            <p className={classes.card__author}>{`by Chef ${props.name}`}</p>
            <p className={classes.card__location}>{props.city}</p>
            <Link href={`/recipe/${props.id}`}><a>View recipe</a></Link>
            <div className={classes.card__likeIcon}><LikeIcon value={props.likes} /></div>
            {props.publishStatus &&
            <div className={classes.card__status}>{getStatusOfCard()}</div>}
          </div>

          {!props.publishStatus &&
          <div
            className={saved ? classes.card__savedStatus : classes.card__savedStatus_enabled }
            onClick={(e) => handlerSavingRecipe(e)}
          >
            <img src={savedStatus} alt="saved status of recipe"/>
          </div>}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
  
export default CardHighestMeals;