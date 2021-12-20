import React from 'react';
import classes from './index.module.scss';

const ChefIcon = ({ type }) => {
  switch (type) {
    case 'common':
      return (
        <div className={classes.iconWrapCommon}>
          <img className={classes.icon} src="/icons/Logo.svg" alt="chef-hat" />
        </div>
      );

    default:
      return (
        <div className={classes.iconWrap}>
          <img className={classes.icon} src="/images/index/chef-hat2.svg" alt="chef-hat" />
        </div>
      );
  }
};

export default ChefIcon;
