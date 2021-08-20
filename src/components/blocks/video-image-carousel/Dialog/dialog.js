import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Transition } from 'react-transition-group';

// Components
import { Toolbar, useMediaQuery } from '@material-ui/core';
import { Carousel } from 'react-responsive-carousel';

// Handlers
import { recipePhotoSlider } from '@/store/actions';

// Icons
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CloseIcon from '@material-ui/icons/Close';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

// Styles
import classes from './index.module.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Dialog from '@material-ui/core/Dialog';

const useAppbarStyles = makeStyles({
  root: {
    boxShadow: 'none !important',
    background: 'rgba(0,0,0,.5)'
  }
});

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    display: flex;
    background: rgba(0, 0, 0, 0.5);
  }

  .MuiIconButton-label {
    padding: 5px;
    border-radius: 50%;

    &:hover {
      background-color: hsla(0, 0%, 100%, 0.3);
    }
  }
`;

const StyledCarousel = styled(Carousel)`
  .carousel-slider {
    height: calc(100vh - 64px - 178px);
    @media (max-width: 768px) {
      height: 100%;
    }
  }

  .slider-wrapper {
    height: 100% !important;
  }

  .slider-wrapper .slider {
    height: 100% !important;
  }

  .thumbs-wrapper {
    margin: 24px 64px 68px;
  }

  .thumb {
    width: 80px;
    height: 80px;
    margin-right: 16px;
    overflow: hidden;
    outline: none;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .thumb:last-child {
    margin-right: 0;
  }

  & .thumb.selected,
  & .thumb:hover {
    border: 3px solid #ffaa00;
  }
`;

const DialogCarousel = ({ setOpen, open }) => {
  const dispatch = useDispatch();
  const activeSlide = useSelector(state => state.recipePhotoSlider.currentItemIndex);
  const recipe = useSelector(state => state.recipePhotoSlider.items);
  const tabletBreakpoint = useMediaQuery('(max-width: 768px)');

  const handleClose = () => {
    setOpen(false);
  };

  const changeCurrentSlideIndex = useCallback(index => {
    dispatch(recipePhotoSlider.setCurrentItemIndex(index));
  }, []);

  const getTotalOfSlides = () => {
    const countVideos = recipe?.preview_mp4_url ? 1 : 0;
    const countImages = recipe?.images?.length;

    return countVideos + countImages;
  };

  const getThumbImages = () => {
    const videoThumb = recipe?.preview_thumbnail_url ? [{ video: recipe?.preview_thumbnail_url }] : [];
    const photoThumbs = recipe?.images.map(item => ({ image: item.url }));

    return [...videoThumb, ...photoThumbs];
  };

  const getVideoMarkupForCarousel = () => {
    if (!recipe?.preview_mp4_url) {
      return [];
    }

    return (
      <div className={classes.carousel__videoWatermark}>
        <video controls controlsList="nodownload" className={classes.carousel__video}>
          <source src={recipe.preview_mp4_url} type="video/mp4" />
        </video>
        <div className={classes.carousel__watermarkIcon} />
      </div>
    );
  };

  return (
    <StyledDialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      classname={classes.dialog}>
      <Toolbar className={classes.dialog__toolbar}>
        <div onClick={handleClose} className={classes.dialog__close}>
          <CloseIcon fontSize={'small'} />
        </div>

        <span className={classes.carousel__statusCounter}>{`${activeSlide + 1} / ${getTotalOfSlides()}`}</span>
      </Toolbar>

      <StyledCarousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        axis={'horizontal'}
        selectedItem={activeSlide}
        className={classes.carousel}
        swipeable={false}
        onSwipeMove={e => console.log(e)}
        onChange={index => changeCurrentSlideIndex(index)}
        // Buttons
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button type="button" onClick={onClickHandler} title={label} className={classes.carousel__prev}>
              <NavigateBeforeIcon fontSize={'large'} />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button type="button" onClick={onClickHandler} title={label} className={classes.carousel__next}>
              <NavigateNextIcon fontSize={'large'} />
            </button>
          )
        }
        renderItem={item => {
          return <div className={classes.carousel__item}>{item}</div>;
        }}
        renderThumbs={children => {
          return getThumbImages().map(item => {
            if (item?.video) {
              return (
                <div className={classes.carousel__thumbWrapper}>
                  <PlayCircleFilledIcon className={classes.carousel__thumbIcon} fontSize={'large'} />
                  <img className={classes.carousel__thumbImage} src={item.video} alt="preview" />
                </div>
              );
            }

            return (
              <div className={classes.carousel__thumbWrapper}>
                <img className={classes.carousel__thumbImage} src={item?.image} alt="preview" />
              </div>
            );
          });
        }}>
        {getVideoMarkupForCarousel()}

        {recipe?.images.map(item => (
          <img className={classes.recipe__carouselItem} key={item?.pk} src={item?.url}></img>
        ))}
      </StyledCarousel>
    </StyledDialog>
  );
};

export default DialogCarousel;
