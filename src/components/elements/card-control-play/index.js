import React from 'react';
import classes from './index.module.scss';

const CardControlPlay = () => {
  return (
    <div className={classes.iconWrap}>
      <img className={classes.icon} src="/images/index/play.svg" alt="control-play" />
    </div>
  );
};

export default CardControlPlay;
