import React from 'react';
import classes from "./card-image.module.scss";

const CardRoleModels = (props) => {
  const {src, id, title, pk} = props;
  
  const handleDelete = () => {
    props.delete(id, pk);
  };

  return (
    <div className={classes.card}>
      <div className={classes.card__image}
      style={{backgroundImage: `url(${(typeof src === "string") ? src : URL.createObjectURL(src)})`}}>
        <button
          type="button"
          className={classes.card__button}
          onClick={handleDelete}>
        </button>
      </div>
      <p className={classes.card__title}>{title}</p>
    </div>
  );
};
  
export default CardRoleModels;