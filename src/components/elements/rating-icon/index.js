import React from 'react';
import classes from "./index.module.scss";

const RaitingIcon = ({value}) => {
    return (
      <div className={classes.raiting}>
        <span className={classes.raitingStar}>&#9733;</span>
        <span>{value ? value : "0"}</span>
      </div>
    );
  };
  
export default RaitingIcon;