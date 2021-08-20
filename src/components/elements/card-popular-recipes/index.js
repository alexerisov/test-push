import React from 'react';
import classes from './index.module.scss';
import RaitingIcon from '@/components/elements/rating-icon';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from 'next/link';
import styled from 'styled-components';
import CardMedia from '@material-ui/core/CardMedia';
import { CardActionArea } from '@material-ui/core';
import { useRouter } from 'next/router';
import logo from '/public/images/index/logo.svg';

const StyledCardMedia = styled(CardMedia)`
  .MuiCardMedia-root {
    background-size: cover;
  }
`;

const CardPopularRecipes = ({ title, image, id }) => {
  const router = useRouter();

  const redirectToRecipeCard = id => {
    router.replace(`/recipe/${id}`);
  };

  const emptyPhoto = (
    <div className={classes.card__background}>
      <img className={classes.card__logo} src={logo} alt="logo"/>
    </div>
  );

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={() => redirectToRecipeCard(id)}>
        <div className={classes.card__content}>
          {image
            ? <div className={classes.card__images} style={{ backgroundImage: `url(${image})` }}></div>
            : emptyPhoto
          }
          <p className={classes.card__title}>{title}</p>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default CardPopularRecipes;
