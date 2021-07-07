import React from 'react';
import classes from "./card-ingredient.module.scss";

const CardIngredient = (props) => {
    return (
      <div className={classes.cardIngredients}>
        <h2 className={classes.cardIngredients__title}>Curry leaves</h2>
        <p className={classes.cardIngredients__text}>10 leaves</p>
        <button
          type="button"
          className={classes.cardIngredients__button}
          onClick={()=> console.log('Click')}>
            &#128473;
        </button>
      </div>
    );
  };
  
export default CardIngredient;