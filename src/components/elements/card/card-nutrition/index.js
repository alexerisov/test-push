import React from 'react';
import classes from './card-nutrition.module.scss';

const CardNutrition = props => {
  const { title, quantity, id } = props;

  const handleDelete = () => {
    props.delete(id);
  };

  return (
    <div className={classes.cardNutrition}>
      <h2 className={classes.cardNutrition__title}>{quantity}</h2>
      <p className={classes.cardNutrition__text}>{title}</p>
      <button type="button" className={classes.cardNutrition__button} onClick={handleDelete}>
        <div>
          <div className={classes.cardNutrition__button__line}></div>
          <div className={classes.cardNutrition__button__line}></div>
        </div>
      </button>
    </div>
  );
};

export default CardNutrition;
