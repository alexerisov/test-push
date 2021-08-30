import React, { memo } from 'react';
import classes from './card-image.module.scss';
import AddIcon from '@material-ui/icons/Add';
import ReplayIcon from '@material-ui/icons/Replay';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';

const useIconStyles = makeStyles({
  root: {
    fontSize: '1.15rem'
  }
});

const CardImageEditRecipe = props => {
  const reloadIconStyles = useIconStyles();
  const { src, id, pk } = props;

  const handleDelete = () => {
    props.delete(id, pk);
  };

  const handleUpdate = e => {
    props.update(e, id);
  };

  return (
    <Fade in={true}>
      <div className={classes.cardImage}>
        <button type="button" className={classes.cardImage__button_delete} onClick={handleDelete}>
          <AddIcon fontSize="small" className={classes.cardImage__button__deleteIcon} />
        </button>
        <label htmlFor={`update-images${id}`} className={classes.cardImage__reuploadWrapper}>
          <div className={classes.cardImage__button_reload}>
            <ReplayIcon className={classes.cardImage__button__reloadIcon} classes={{ root: reloadIconStyles.root }} />
          </div>
        </label>
        <input
          type="file"
          id={`update-images${id}`}
          name={`update-images${id}`}
          accept="image/*"
          onChange={handleUpdate}
          className={classes.cardImage__reupload}
        />
        <img src={src} className={classes.cardImage__image} />
      </div>
    </Fade>
  );
};

export default memo(CardImageEditRecipe);
