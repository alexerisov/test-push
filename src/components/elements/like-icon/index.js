import React from 'react';
import classes from "./index.module.scss";

const LikeIcon = () => {
    return (
      <div className={classes.icon}>
        <img src="/images/index/Icon awesome-heart.svg" className={classes.icon__like}/>
        <span className={classes.icon__text}>1,000 votes</span>
      </div>
    );
  };
  
export default LikeIcon;