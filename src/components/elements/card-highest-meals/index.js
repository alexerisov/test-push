import React from 'react';
import classes from "./index.module.scss";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import RaitingIcon from "@/components/elements/rating-icon";
import LikeIcon from "@/components/elements/like-icon";
import Link from "next/link";
import styled from 'styled-components';

const StyledCardMedia = styled(CardMedia)`
  .MuiCardMedia-root {
    background-size: auto;
  }
`;

const CardHighestMeals = (props) => {
    return (
      <Card className={classes.card}>
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
          </div>
          <RaitingIcon />
        </CardContent>
      </Card>
    );
  };
  
export default CardHighestMeals;