import React from 'react';
import classes from './index.module.scss';

const SavedIcon = () => {
  return (
    <div className={classes.iconWrap}>
      <img className={classes.icon} src="/icons/Star.svg" alt="star" />
    </div>
  );
};

export default SavedIcon;
