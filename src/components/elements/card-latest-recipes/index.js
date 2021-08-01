import React, { useState } from 'react';
import classes from "./index.module.scss";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import RaitingIcon from "@/components/elements/rating-icon";
import LikeIcon from "@/components/elements/like-icon";
import Link from "next/link";
import styled from 'styled-components';
import { connect } from 'react-redux';
import { modalActions } from '@/store/actions';
import Recipe from '@/api/Recipe.js';

const StyledCardMedia = styled(CardMedia)`
  .MuiCardMedia-root {
    background-size: auto;
  }
`;

const CardLatestRecipes = (props) => {

  const [saveRecipeId, setSaveRecipeId] = useState(props.savedId);

  const openRegisterPopup = (name) => {
    return () => {
      props.dispatch(
        modalActions.open(name),
      ).then(result => {
        // result when modal return promise and close
      });
    };
  };

  const onClickSave = (e) => {
    e.preventDefault();
    Recipe.postSavedRecipe(props.id)
    .then((res) => {
      setSaveRecipeId(res.data.pk);
    })
    .catch((err) => console.log(err));
  };

  const onClickDelete = (e) => {
    e.preventDefault();
    Recipe.deleteSavedRecipe(saveRecipeId)
    .then((res) => {
      setSaveRecipeId(false);
    })
    .catch((err) => console.log(err));
  };

  return (
    <Card className={classes.card}>
        <StyledCardMedia
          className={classes.card__media}
          image={props.image}
          title=""
        />
        {!saveRecipeId
        ? <button
          className={classes.card__buttonSaveRecipe}
          onClick={!props.account.hasToken ? openRegisterPopup('register') : onClickSave}
        />
        : <button
          className={classes.card__buttonDeleteRecipe}
          onClick={!props.account.hasToken ? openRegisterPopup('register') : onClickDelete}
        />
        }
        <CardContent className={classes.card__content}>
          <div>
            <p className={classes.card__name} title={props.title}>{props.title}</p>
            <p className={classes.card__author}>{`by Chef ${props.name}`}</p>
            <p className={classes.card__location}>{props.city}</p>
            <Link href={`/recipe/${props.id}`}><a>View recipe</a></Link>
            <div className={classes.card__likeIcon}><LikeIcon value={props.likes} /></div>
          </div>
          <RaitingIcon />
        </CardContent>
    </Card>
  );
};
  
export default connect((state) => ({
  account: state.account,
}))(CardLatestRecipes);