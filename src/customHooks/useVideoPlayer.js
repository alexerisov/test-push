import { useState, useEffect } from 'react';

const useVideoPlayer = (videoElement, videoWrap) => {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    volume: 1,
    isMuted: false,
    fullscreen: false
  });

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying
    });
  };

  useEffect(() => {
    if (videoElement.current) {
      playerState.isPlaying ? videoElement.current.play() : videoElement.current.pause();
    }
  }, [playerState.isPlaying, videoElement]);

  const handleOnTimeUpdate = () => {
    if (videoElement.current.currentTime && videoElement.current.duration) {
      const progress = (videoElement.current.currentTime / videoElement.current.duration) * 100;
      setPlayerState({
        ...playerState,
        progress
      });
    }
  };

  const handleVideoProgress = value => {
    if (value) {
      const manualChange = Number(value);

      videoElement.current.currentTime = (videoElement.current.duration / 100) * manualChange;
      setPlayerState({
        ...playerState,
        progress: manualChange
      });
    }
  };

  const handleAudioVolume = value => {
    if (value) {
      const newVolume = Number(value);
      videoElement.current.volume = newVolume;
      setPlayerState({
        ...playerState,
        volume: newVolume
      });
    }
  };
  const toggleMute = () => {
    setPlayerState({
      ...playerState,
      isMuted: !playerState.isMuted
    });
  };
  const backward = () => {
    videoElement.current.currentTime = videoElement.current.currentTime - 15;
  };
  const forward = () => {
    videoElement.current.currentTime = videoElement.current.currentTime + 15;
  };
  useEffect(() => {
    if (videoElement.current) {
      playerState.isMuted ? (videoElement.current.muted = true) : (videoElement.current.muted = false);
    }
  }, [playerState.isMuted, videoElement]);

  const toggleFullscreen = () => {
    setPlayerState({
      ...playerState,
      fullscreen: !playerState.fullscreen
    });
  };

  useEffect(() => {
    function requestFullscreen() {
      if (videoWrap.current?.requestFullscreen) {
        videoWrap.current.requestFullscreen();
      } else if (videoElement.current?.webkitEnterFullscreen) {
        videoElement.current.webkitEnterFullscreen();
        setPlayerState({
          ...playerState,
          fullscreen: false
        });
      } else {
        console.log("Can't open fullscreen");
      }
    }

    function exitFullscreen() {
      if (videoWrap.current?.exitFullscreen) {
        videoWrap.current.exitFullscreen();
      } else if (videoElement.current?.webkitExitFullscreen) {
        videoElement.current.webkitExitFullscreen();
      }
    }

    if (playerState.fullscreen) {
      requestFullscreen();
    } else if (document.fullscreenEnabled) {
      exitFullscreen();
    }
  }, [playerState.fullscreen, videoWrap]);
  return {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    toggleMute,
    handleAudioVolume,
    backward,
    forward,
    toggleFullscreen
  };
};

export default useVideoPlayer;
