import React from 'react';
import classes from "./card-image.module.scss";

const CardImage = (props) => {
  const {src, id} = props;
  
  const handleDelete = () => {
    props.delete(id);
  };

  return (
    <div className={classes.cardImage} style={{backgroundImage: `url(${src})`}}>
      <button
        type="button"
        className={classes.cardImage__button}
        onClick={handleDelete}>
      </button>
    </div>
  );
};
  
export default CardImage;