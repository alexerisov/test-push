import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { IconButton, Slider } from '@material-ui/core';
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

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #141416;
  position: 'fixed';
  left: 0;
  top: 0;
  padding: 48px 80px 0;
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

const LightBox = ({ onClickWrapper, items, title, video }) => {
  const [currentSlide, setSlide] = useState(1);

  //video
  const videoElement = useRef(null);
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
  } = useVideoPlayer(videoElement);

  const array = [1, 2, 3, 4];

  return (
    <Wrapper
    // onClick={onClickWrapper}
    >
      <div className={classes.lightbox__row_top}>
        <div className={classes.lightbox__row_controls}>
          <div className={classes.lightbox__row_top__text}>
            {currentSlide}/{array.length}
          </div>

          <div>
            <IconButton className={classes.lightbox__controls_upload} size="24px" onClick={() => null}>
              <BasicIcon icon={ShareIcon} color={'#AFB8CA'} />
            </IconButton>
            <IconButton className={classes.lightbox__controls} size="24px" onClick={onClickWrapper}>
              <BasicIcon icon={CloseIcon} />
            </IconButton>
          </div>
        </div>
      </div>

      <div className={classes.slider__wrap}>
        <IconButton
          className={classes.slider__arrow}
          size="24px"
          onClick={() => setSlide((currentSlide - 5) % items?.length)}>
          <BasicIcon icon={ArrowLeftIcon} color={'#AFB8CA'} />
        </IconButton>
        {/* <LightboxSlider /> */}
        {video && (
          <div className={!playerState.fullscreen ? classes.slider__main : classes.fullsize_video}>
            <video src={video} ref={videoElement} onTimeUpdate={handleOnTimeUpdate} />
            <div className={classes.slider__main__toolbar}>
              <VideoRange
                classes={{ root: classes.slider__root }}
                type="range"
                min={0}
                max={100}
                value={playerState.progress}
                onChange={(_, value) => handleVideoProgress(value)}
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
                    onChange={(_, value) => handleAudioVolume(value)}
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
                  <IconButton size="40px">
                    <BasicIcon icon={SubtitlesIcon} color={'#FCFCFD'} />
                  </IconButton>
                </div>

                <div>
                  <IconButton size="40px" onClick={backward}>
                    <BasicIcon icon={BackwardIcon} color={'#FCFCFD'} />
                  </IconButton>
                  {!playerState.isPlaying ? (
                    <IconButton size="40px" onClick={togglePlay}>
                      <BasicIcon icon={PlayIcon} color={'#FCFCFD'} />
                    </IconButton>
                  ) : (
                    <IconButton size="40px" onClick={togglePlay}>
                      <BasicIcon icon={PauseIcon} color={'#FCFCFD'} />
                    </IconButton>
                  )}
                  <IconButton size="40px" onClick={forward}>
                    {console.log(playerState.progress)}
                    <BasicIcon icon={ForwardIcon} color={'#FCFCFD'} />
                  </IconButton>
                </div>
                <div>
                  <IconButton size="40px" onClick={toggleFullscreen}>
                    <BasicIcon icon={FullscreenIcon} color={'#FCFCFD'} />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
        )}
        <IconButton
          className={classes.slider__arrow}
          size="24px"
          onClick={() => setSlide((currentSlide + 5) % items?.length)}>
          <BasicIcon icon={ArrowRightIcon} color={'#AFB8CA'} />
        </IconButton>
      </div>

      <div className={classes.title}>
        <h2>{title}</h2>
      </div>
    </Wrapper>
  );
};

const LightboxSlider = props => {
  const displayCount = 1;

  return (
    <div className={classes.slider_body}>
      {/* <Carousel
        showArrows={false}
        showThumbs={false}
        centerMode
        swipeable={false}
        emulateTouch={false}
        infiniteLoop
        centerSlidePercentage={100 / displayCount}
        showStatus={false}
        showIndicators={false}
        onClickThumb={() => console.log('clicked')}
        onClickItem={() => console.log('clicked')}
        selectedItem={currentSlide}>
        {recipes?.length > 0 && recipes.map(recipe => <RecipeCard key={recipe.pk} recipe={recipe} />)}
      </Carousel> */}
    </div>
  );
};

export default LightBox;
