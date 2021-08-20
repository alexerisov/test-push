import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useMediaQuery } from '@material-ui/core';

// Components
import { Carousel } from 'react-responsive-carousel';
import DialogCarousel from '@/components/blocks/video-image-carousel/Dialog/dialog';

// Handlers
import { recipePhotoSlider } from '@/store/actions';

// Icons
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import FullscreenOutlinedIcon from '@material-ui/icons/FullscreenOutlined';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';

// Styles
import classes from './index.module.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const StyledCarousel = styled(Carousel)`
  .carousel-slider,
  .slider-wrapper,
  .slider {
    height: 100%;
  }

  .carousel-status {
    top: unset;
    bottom: 16px;
    right: 16px;
  }
`;

const VideoImageCarousel = ({ children }) => {
  const tabletBreakpoint = useMediaQuery('(max-width: 768px)');
  const dispatch = useDispatch();
  const activeSlide = useSelector(state => state.recipePhotoSlider.currentItemIndex);
  const recipe = useSelector(state => state.recipePhotoSlider.items);

  // Dialog state
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeCurrentSlideIndex = index => {
    dispatch(recipePhotoSlider.setCurrentItemIndex(index));
  };

  const isVideoExist = () => {
    return !!recipe?.preview_mp4_url;
  };

  const handleCounterButtons = buttonName => {
    if (buttonName === 'video') {
      dispatch(recipePhotoSlider.setCurrentItemIndex(0));
      return;
    }

    const targetIndex = isVideoExist() ? 1 : 0;
    dispatch(recipePhotoSlider.setCurrentItemIndex(targetIndex));
  };

  const hideFullScreenIconOnVideoSlide = () => {
    if (isVideoExist() && !activeSlide) {
      return null;
    }

    return (
      <div className={classes.carousel__fullscreen} onClick={handleClickOpen}>
        <FullscreenOutlinedIcon />
      </div>
    );
  };

  return (
    <div className={classes.carousel__wrapper}>
      <div className={classes.carousel__back}></div>

      {hideFullScreenIconOnVideoSlide()}

      {!tabletBreakpoint && (
        <div className={classes.carousel__info}>
          {recipe?.preview_thumbnail_url && (
            <button type={'button'} className={classes.carousel__counter} onClick={() => handleCounterButtons('video')}>
              <PlayArrowOutlinedIcon />
              Video
            </button>
          )}

          {recipe?.images?.length !== 0 && (
            <button
              type={'button'}
              className={classes.carousel__counter}
              onClick={() => handleCounterButtons('images')}>
              <PhotoCameraOutlinedIcon />
              {`${recipe?.images?.length ? recipe?.images?.length : 0} Images`}
            </button>
          )}
        </div>
      )}

      <StyledCarousel
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        swipeable={false}
        axis={'horizontal'}
        selectedItem={activeSlide}
        className={classes.carousel}
        autoPlay={false}
        onChange={index => changeCurrentSlideIndex(index)}
        // Buttons
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button type="button" onClick={onClickHandler} title={label} className={classes.carousel__prev}>
              <NavigateBeforeIcon />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button type="button" onClick={onClickHandler} title={label} className={classes.carousel__next}>
              <NavigateNextIcon />
            </button>
          )
        }
        // Current Slide Counter
        statusFormatter={(current, total) => {
          return <span className={classes.carousel__statusCounter}>{`${current}/${total}`}</span>;
        }}
        renderItem={(item, options) => {
          if (item.type === 'div') {
            return <div className={classes.carousel__item}>{item}</div>;
          }

          return (
            <div className={classes.carousel__item} onClick={setOpen}>
              {item}
            </div>
          );
        }}>
        {children}
      </StyledCarousel>

      <DialogCarousel open={open} setOpen={setOpen} />
    </div>
  );
};

export default VideoImageCarousel;
