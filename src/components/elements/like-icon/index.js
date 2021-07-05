import React from 'react';
import classes from "./index.module.scss";

const LikeIcon = () => {
    return (
      <div className={classes.icon}>
        <span>&#9829;</span>
        <span className={classes.icon__text}>1,000 votes</span>
      </div>
    );
  };
  
export default LikeIcon;