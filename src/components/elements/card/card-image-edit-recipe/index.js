import React from 'react';
import classes from "./card-image.module.scss";

const CardImageEditRecipe = (props) => {
  const {src, id, pk} = props;
  
  const handleDelete = () => {
    props.delete(id, pk);
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
  
export default CardImageEditRecipe;