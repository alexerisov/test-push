import React from 'react';
import classes from "./card-image.module.scss";

const CardRoleModels = (props) => {
  const {src, id, title} = props;
  
  const handleDelete = () => {
    props.delete(id);
  };

  return (
    <div className={classes.card}>
      <div className={classes.card__image} style={{backgroundImage: `url(${URL.createObjectURL(src)})`}}>
        <button
          type="button"
          className={classes.card__button}
          onClick={handleDelete}>
            &#128473;
        </button>
      </div>
      <p className={classes.card__title}>{title}</p>
    </div>
  );
};
  
export default CardRoleModels;