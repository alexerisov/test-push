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

const StyledCardActionArea = styled(CardActionArea)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'flex-start',
  height: '100%'
});

const StyledCardContent = styled(CardContent)({
  padding: '17px 26px 0 !important'
});

const CardChefPencil = ({ image, title, chefName, id }) => {
  const router = useRouter();
  const pencilTitle = useRef();

  useEffect(() => {
    $clamp(pencilTitle.current, { clamp: 3 });
  });

  const redirectToTargetPencil = id => {
    router.push(`/chef-pencil/${id}`);
  };

  return (
    <Card className={classes.card}>
      <StyledCardActionArea onClick={() => redirectToTargetPencil(id)}>
        <CardMedia className={classes.card__media} image={image ?? logo} title="" style={{ backgroundSize: 'cover' }} />
        <StyledCardContent className={classes.card__content}>
          <p ref={pencilTitle} className={classes.card__name} title={title}>
            {title}
          </p>
          <p className={classes.card__author}>{`by Chef ${chefName}`}</p>
        </StyledCardContent>
      </StyledCardActionArea>
    </Card>
  );
};

export default CardChefPencil;
