import React, { useEffect, useRef } from 'react';
import $clamp from 'clamp-js';
import { styled } from '@material-ui/core';
import { useRouter } from 'next/router';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { CardActionArea } from '@material-ui/core';

import logo from '../../../../../public/images/index/logo.svg';
import classes from './index.module.scss';
import Avatar from '@material-ui/core/Avatar';

const StyledCardActionArea = styled(CardActionArea)({
  display: 'flex',
  justifyContent: 'flex-start',
  borderRadius: '5px',
  '@media (max-width: 992px)': {
    flexDirection: 'column',
    maxWidth: '285px',
    paddingBottom: '30px'
  }
});

const StyledCardContent = styled(CardContent)({
  padding: 0,
  height: '100%'
});

const CardChefPencil = ({ image, title, chefName, id, description }) => {
  const router = useRouter();
  const pencilDescription = useRef();

  useEffect(() => {
    $clamp(pencilDescription.current, { clamp: 4 });
  });

  const redirectToTargetPencil = id => {
    router.push(`/chef-pencil/${id}`, undefined, { locale: router.locale });
  };

  return (
    <Card className={classes.card}>
      <StyledCardActionArea onClick={() => redirectToTargetPencil(id)}>
        <CardMedia className={classes.card__media} image={image ?? logo} title="" style={{ backgroundSize: 'cover' }} />
        <StyledCardContent className={classes.card__content}>
          <p className={classes.card__name} title={title}>
            {title}
          </p>

          <p className={classes.card__url}>{`https://eatchefs.com/chef-pencil/${id}`}</p>

          <p ref={pencilDescription} className={classes.card__description} title={description}>
            {description}
          </p>

          <div className={classes.card__author}>
            <Avatar />
            <span>{`by Chef ${chefName}`}</span>
          </div>
        </StyledCardContent>
      </StyledCardActionArea>
    </Card>
  );
};

export default CardChefPencil;
