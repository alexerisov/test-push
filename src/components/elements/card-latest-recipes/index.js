import React, { useState } from 'react';
import classes from './index.module.scss';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import LikeIcon from '@/components/elements/like-icon';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { modalActions } from '@/store/actions';
import Recipe from '@/api/Recipe.js';
import { useRouter } from 'next/router';
import { CardActionArea } from '@material-ui/core';
import logo from '../../../../public/images/index/logo.svg';
import Link from 'next/link';
import { CardControlPlay, ChefIcon } from '../card-control-play';

const StyledCardMedia = styled(CardMedia)`
  .MuiCardMedia-root {
    background-size: auto;
  }
`;

const StyledCardActionArea = styled(CardActionArea)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-start;
`;

const CardLatestRecipes = props => {
  const router = useRouter();

  const [saveRecipeId, setSaveRecipeId] = useState(props.savedId);

  const openRegisterPopup = name => {
    return () => {
      props.dispatch(modalActions.open(name)).then(result => {
        // result when modal return promise and close
      });
    };
  };

  const onClickSave = e => {
    e.stopPropagation();
    Recipe.postSavedRecipe(props.id)
      .then(res => {
        setSaveRecipeId(res.data.pk);
      })
      .catch(err => console.log(err));
  };

  const onClickDelete = e => {
    e.stopPropagation();
    Recipe.deleteSavedRecipe(saveRecipeId)
      .then(res => {
        setSaveRecipeId(false);
      })
      .catch(err => console.log(err));
  };

  return (
    <Card className={classes.card}>
      <Link href={`/recipe/${props.id}`}>
        <a>
          <StyledCardMedia className={classes.card__media} image={props.image ?? logo} title="" />
          {!saveRecipeId ? (
            <button
              className={classes.card__buttonSaveRecipe}
              onClick={!props.account.hasToken ? openRegisterPopup('register') : onClickSave}
            />
          ) : (
            <button
              className={classes.card__buttonDeleteRecipe}
              onClick={!props.account.hasToken ? openRegisterPopup('register') : onClickDelete}
            />
          )}
          <CardContent className={classes.card__content}>
            <div>
              <p className={classes.card__name} title={props.title}>
                {props.title}
              </p>
              <p className={classes.card__author}>{`by Chef ${props.name}`}</p>
              <p className={classes.card__location}>{props.city}</p>
              <div className={classes.card__likeIcon}>
                <LikeIcon value={props.likes} />
              </div>

              {props.hasVideo && <CardControlPlay />}

              {props.isParced && props.publishStatus === 2 ? <ChefIcon /> : null}
            </div>
          </CardContent>
        </a>
      </Link>
    </Card>
  );
};

export default connect(state => ({
  account: state.account
}))(CardLatestRecipes);
