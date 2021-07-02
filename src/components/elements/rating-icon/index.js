import React from 'react';
import classes from "./index.module.scss";

const RaitingIcon = () => {
    return (
      <div className={classes.raiting}>
        <span className={classes.raitingStar}>&#9733;</span>
        <span>4.8</span>
      </div>
    );
  };
  
export default RaitingIcon;