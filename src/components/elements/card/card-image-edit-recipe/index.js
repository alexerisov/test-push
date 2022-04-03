import React, { memo } from 'react';
import classes from './card-image.module.scss';
import Fade from '@material-ui/core/Fade';
import { Checkbox } from '@material-ui/core';
import CheckboxIcon from '../../checkbox-icon';
import CheckboxIconUnchecked from '../../checkbox-icon/checkbox-icon-unchecked';

const CardImageEditRecipe = props => {
  const { src, id, pk } = props;

  const handleDelete = () => {
    props.delete(pk);
  };

  const handleUpdateCoverImage = e => {
    props.updateCoverImage(e, pk);
  };

  return (
    <Fade in={true}>
      <div className={classes.cardImage}>
        {props.delete && (
          <button type="button" className={classes.cardImage__button_delete} onClick={handleDelete}>
            <div>
              <div className={classes.cardImage__button_delete__line}></div>
              <div className={classes.cardImage__button_delete__line}></div>
            </div>
          </button>
        )}
        <img src={src} className={classes.cardImage__image} />
        <div className={classes.cardImage__inputCover}>
          <Checkbox
            icon={<CheckboxIconUnchecked />}
            checkedIcon={<CheckboxIcon />}
            checked={Boolean(props.main_image === pk)}
            value={id}
            onChange={e => {
              handleUpdateCoverImage(e);
            }}
            name="main_image"
            color="primary"
          />
          <p className={classes.cardImage__inputCoverText}>Cover image</p>
        </div>
      </div>
    </Fade>
  );
};

export default memo(CardImageEditRecipe);
