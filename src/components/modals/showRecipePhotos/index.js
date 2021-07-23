import React, { useState } from 'react';
import { connect } from "react-redux";

import { LayoutModal } from "@/components/layouts";
import { modalActions } from "@/store/actions";

import classes from "./showRecipePhotos.module.scss";

const ShowRecipePhoto = ({ recipePhotoSlider, dispatch }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(recipePhotoSlider.currentPhotoIndex);

  const onCancel = () => {
    dispatch(modalActions.close());
  };

  const sliderCounterUp = () => {
    let counter = currentPhotoIndex;
    if (counter + 1 > recipePhotoSlider.photos.length - 1) {
      setCurrentPhotoIndex(0);
      return;
    }

    setCurrentPhotoIndex(++counter);
  };

  const sliderCounterDown = () => {
    let counter = currentPhotoIndex;
    if (counter - 1 < 0) {
      setCurrentPhotoIndex(recipePhotoSlider.photos.length - 1);
      return;
    }

    setCurrentPhotoIndex(--counter);
  };

  return (
    <LayoutModal
    onClose={onCancel}
    themeName="white_slider"
    >
      <div className={classes.slider__container}>
        {recipePhotoSlider.photos &&
            <div className={classes.slider__photo}>
              <img src={recipePhotoSlider.photos[currentPhotoIndex]?.url} />
            </div>
        }

        <div className={classes.slider__counter}>{`${currentPhotoIndex + 1} / ${recipePhotoSlider.photos?.length}`}</div>

        {/*Next and previous buttons*/}
        <a className={classes.slider__prev} onClick={sliderCounterDown}>
          <span className={classes.slider__arrow}>&#10094;</span>
        </a>
        <a className={classes.slider__next} onClick={sliderCounterUp}>
          <span className={classes.slider__arrow}>&#10095;</span>
        </a>
      </div>
    </LayoutModal>
  );
};

export default connect(state => ({
  recipePhotoSlider: state.recipePhotoSlider
}))(ShowRecipePhoto);
