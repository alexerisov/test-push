import React from 'react';
import classes from "./index.module.scss";

const LikeIcon = ({value}) => {
    return (
      <div className={classes.icon}>
        <img src="/images/index/Icon awesome-heart.svg" className={classes.icon__like}/>
        <span className={classes.icon__text}>{value ?? 0} votes</span>
      </div>
    );
  };
  
export default LikeIcon;