import React from 'react';
import classes from './card-ingredient.module.scss';

const CardIngredient = props => {
  const { title, quantity, unit, id } = props;
  const handleDelete = () => {
    props.delete(id);
  };

  return (
    <div className={classes.cardIngredients}>
      <h2 className={classes.cardIngredients__title}>{title}</h2>
      <p className={classes.cardIngredients__text}>
        {quantity} {unit}
      </p>
      <button type="button" className={classes.cardIngredients__button} onClick={handleDelete}>
        <div>
          <div className={classes.cardIngredients__button__line}></div>
          <div className={classes.cardIngredients__button__line}></div>
        </div>
      </button>
    </div>
  );
};

export default CardIngredient;
