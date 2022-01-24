import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { IconButton, Slider, useMediaQuery } from '@material-ui/core';
import { Carousel } from 'react-responsive-carousel';
import classes from './index.module.scss';
import { ReactComponent as ArrowLeftIcon } from '@/../public/icons/Arrow Left 2/Line.svg';
import { ReactComponent as ArrowRightIcon } from '@/../public/icons/Arrow Right 2/Line.svg';
import { ReactComponent as ShareIcon } from '@/../public/icons/Share Square/Line.svg';
import { ReactComponent as CloseIcon } from '@/../public/icons/Close/grey.svg';
import { ReactComponent as VolumeIcon } from '@/../public/icons/Volume/Line.svg';
import { ReactComponent as SubtitlesIcon } from '@/../public/icons/Subtitles/Line.svg';
import { ReactComponent as BackwardIcon } from '@/../public/icons/Backward 15 sec/Line.svg';
import { ReactComponent as ForwardIcon } from '@/../public/icons/Forward 15 sec/Line.svg';
import { ReactComponent as PlayIcon } from '@/../public/icons/Play/Filled.svg';
import { ReactComponent as PauseIcon } from '@/../public/icons/Pause/Filled.svg';
import { ReactComponent as FullscreenIcon } from '@/../public/icons/Full Screen/Line.svg';
import { BasicIcon } from '@/components/basic-elements/basic-icon';

import useVideoPlayer from '@/customHooks/useVideoPlayer';
import dayjs from 'dayjs';
import { convertToHours } from '@/utils/converter';
import { ButtonShare } from '@/components/elements/button';

const Balls = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .ball {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #1b5299;
    margin: 0 6px 0 0;
    animation: oscillate 0.7s ease-in forwards infinite;
  }

  .one {
    animation-delay: 0.5s;
  }
  .two {
    animation-delay: 1s;
  }
  .three {
    animation-delay: 2s;
  }

  @keyframes oscillate {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(20px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #141416;
  position: 'fixed';
  left: 0;
  top: 0;
  padding: 48px 80px 0;
  @media (max-width: 576px) {
    /* height: auto; */
    padding: 40px 16px;
  }
`;
const VideoRange = styled(Slider)`
  & .MuiSlider-track {
    height: 4px;
    background: #ffaa00;
  }
  & .MuiSlider-thumb {
    width: 18px !important;
    height: 18px !important;
    border: 4px solid #353e50;
    margin-top: -7px;
  }
  & .MuiSlider-rail {
    height: 2px;
    background: #fcfcfd;
    border: 1px solid rgba(255, 255, 255, 0.5442);
  }
`;

const LightBox = ({ onClickWrapper, title, video, images, recipe, absolutePath }) => {
  const [currentSlide, setSlide] = useState(0);
  const [loading, setLoading] = useState(false);
  const mobile = useMediaQuery('(max-width:576px)');
  //video
  const videoElement = useRef(null);
  const videoWrap = useRef(null);
  const [isVolumeActive, setIsVolumeActive] = useState(false);
  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    toggleMute,
    handleAudioVolume,
    backward,
    forward,
    toggleFullscreen
  } = useVideoPlayer(videoElement, videoWrap);
  const updateCurrentSlide = index => {
    if (currentSlide !== index) {
      setSlide(index);
    }
  };
  useEffect(() => {
    setLoading(true);
  }, []);

  const displayCount = 1;
  return (
    <Wrapper>
      <>
        <div className={classes.lightbox__row_top}>
          <div className={classes.lightbox__row_controls}>
            <div className={classes.lightbox__row_top__text}>
              {!mobile && `${currentSlide + 1} / ${images?.length + 1}`}
            </div>
            {console.log(recipe)}
            <div>
              <IconButton className={classes.lightbox__controls_upload} size="24px" onClick={() => null}>
                {/* <BasicIcon icon={ShareIcon} color={'#AFB8CA'} /> */}
                <ButtonShare
                  id={recipe?.pk}
                  photo={recipe?.images[0]}
                  description={recipe?.description}
                  currentUrl={`${absolutePath}/recipe/${recipe?.pk}`}
                  leftSide>
                  <BasicIcon icon={ShareIcon} color={'#AFB8CA'} />
                </ButtonShare>
              </IconButton>
              <IconButton className={classes.lightbox__controls} size="24px" onClick={onClickWrapper}>
                <BasicIcon icon={CloseIcon} />
              </IconButton>
            </div>
          </div>
        </div>

        {video ? (
          <div className={classes.slider__wrap}>
            {!mobile && (
              <IconButton
                className={classes.slider__arrow}
                size="24px"
                onClick={() => currentSlide !== 0 && setSlide(currentSlide - 1)}>
                <BasicIcon icon={ArrowLeftIcon} color={'#AFB8CA'} />
              </IconButton>
            )}
            <div className={classes.slider_body}>
              <Carousel
                showArrows={false}
                showThumbs={false}
                centerMode
                swipeable={true}
                emulateTouch={true}
                infiniteLoop={false}
                centerSlidePercentage={100 / displayCount}
                showStatus={false}
                showIndicators={false}
                onChange={index => updateCurrentSlide(index)}
                onClickThumb={() => console.log('clicked')}
                onClickItem={() => console.log('clicked')}
                selectedItem={currentSlide}>
                <>
                  {loading && (
                    <Balls>
                      <div className="ball one"></div>
                      <div className="ball two"></div>
                      <div className="ball three"></div>
                    </Balls>
                  )}
                  <div className={loading ? classes.slider__main_hide : classes.slider__main}>
                    <div className={playerState.fullscreen && classes.video__container} ref={videoWrap}>
                      <video
                        onLoadedData={() => setLoading(false)}
                        src={video}
                        ref={videoElement}
                        onTimeUpdate={handleOnTimeUpdate}
                        preload="true"
                      />
                      <div className={classes.slider__main__toolbar}>
                        <VideoRange
                          classes={{ root: classes.slider__root }}
                          type="range"
                          min={0}
                          max={100}
                          value={playerState.progress}
                          onChange={(event, value) => {
                            handleVideoProgress(value);
                            event.stopPropagation();
                          }}
                        />
                        {isVolumeActive && (
                          <div className={classes.slider__main__valumebar}>
                            <IconButton
                              size="40px"
                              onClick={() => {
                                toggleMute;
                              }}>
                              <BasicIcon icon={VolumeIcon} color={'#FCFCFD'} />
                            </IconButton>
                            <VideoRange
                              classes={{ root: classes.slider__rail }}
                              type="range"
                              min={0}
                              max={1}
                              step={0.01}
                              value={playerState.volume}
                              onChange={(event, value) => {
                                handleAudioVolume(value);
                                event.stopPropagation();
                              }}
                            />
                            <span>{Math.round(videoElement?.current?.volume * 100)}</span>
                          </div>
                        )}
                        <div className={classes.slider__main__toolbar_timeRow}>
                          {!Number.isNaN(Math.floor(videoElement?.current?.currentTime)) ? (
                            <span>{convertToHours(Math.floor(videoElement?.current?.currentTime))}</span>
                          ) : (
                            <span>00 : 00 : 00</span>
                          )}
                          {!Number.isNaN(Math.floor(videoElement?.current?.currentTime)) ? (
                            <span>{convertToHours(Math.floor(videoElement?.current?.duration))}</span>
                          ) : (
                            <span>00 : 00 : 00</span>
                          )}
                        </div>
                        <div className={classes.slider__main__toolbar_row}>
                          <div>
                            <IconButton
                              size="40px"
                              onClick={() => {
                                setIsVolumeActive(prev => !prev);
                              }}>
                              <BasicIcon icon={VolumeIcon} color={isVolumeActive ? '#FFAA00' : '#FCFCFD'} />
                            </IconButton>
                            {/* <IconButton size="40px">
                          <BasicIcon icon={SubtitlesIcon} color={'#FCFCFD'} />
                        </IconButton> */}
                          </div>

                          <div>
                            {!mobile && (
                              <IconButton size="40px" onClick={backward}>
                                <BasicIcon icon={BackwardIcon} color={'#FCFCFD'} />
                              </IconButton>
                            )}
                            {!playerState.isPlaying ? (
                              <IconButton size="40px" onClick={togglePlay}>
                                <BasicIcon icon={PlayIcon} color={'#FCFCFD'} />
                              </IconButton>
                            ) : (
                              <IconButton size="40px" onClick={togglePlay}>
                                <BasicIcon icon={PauseIcon} color={'#FCFCFD'} />
                              </IconButton>
                            )}
                            {!mobile && (
                              <IconButton size="40px" onClick={forward}>
                                {console.log(playerState.progress)}
                                <BasicIcon icon={ForwardIcon} color={'#FCFCFD'} />
                              </IconButton>
                            )}
                          </div>
                          <div>
                            <IconButton size="40px" onClick={toggleFullscreen}>
                              <BasicIcon icon={FullscreenIcon} color={'#FCFCFD'} />
                            </IconButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>

                {images?.length > 0 &&
                  images.map(el => (
                    <div className={classes.slider__item} key={el.url}>
                      <img src={el.url} />
                    </div>
                  ))}
              </Carousel>
            </div>

            {!mobile && (
              <IconButton
                className={classes.slider__arrow}
                size="24px"
                onClick={() => currentSlide < images.length + 1 && setSlide(currentSlide + 1)}>
                <BasicIcon icon={ArrowRightIcon} color={'#AFB8CA'} />
              </IconButton>
            )}
          </div>
        ) : null}
        <div className={classes.title}>
          <h2>{title}</h2>
        </div>
        {mobile && <div className={classes.currentSlide}>{`${currentSlide + 1} / ${images?.length + 1}`}</div>}
      </>
    </Wrapper>
  );
};

export default LightBox;
