import React from 'react';
import classes from './index.module.scss';

const ChefIcon = () => {
  return (
    <div className={classes.iconWrap}>
      <img className={classes.icon} src="/images/index/chef-hat2.svg" alt="chef-hat" />
    </div>
  );
};

export default ChefIcon;
