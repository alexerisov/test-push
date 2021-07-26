import React from 'react';
import classes from "./index.module.scss";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import RaitingIcon from "@/components/elements/rating-icon";
import LikeIcon from "@/components/elements/like-icon";
import Link from "next/link";
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { CardActionArea } from '@material-ui/core';
import { connect } from 'react-redux';
import { modalActions } from '@/store/actions';
import Recipe from '@/api/Recipe.js';

const StyledCardMedia = styled(CardMedia)`
  .MuiCardMedia-root {
    background-size: auto;
  }
`;

const CardLatestRecipes = (props) => {

  const router = useRouter();

  const redirectToRecipeCard = (id) => {
    router.push(`/recipe/${id}`);
  };

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
      console.log(res)
    })
    .catch((err) => console.log(err));
  };

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={() => redirectToRecipeCard(props.id)}>
        <StyledCardMedia
          className={classes.card__media}
          image={props.image}
          title=""
        />
        <button
          className={classes.card__buttonSaveRecipe}
          onClick={!props.account.hasToken ? openRegisterPopup('register') : onClickSave}
        />
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
      </CardActionArea>
    </Card>
  );
};
  
export default connect((state) => ({
  account: state.account,
}))(CardLatestRecipes);