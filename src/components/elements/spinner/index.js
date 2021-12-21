import React from 'react';
import styled from 'styled-components';

const SpinnerImg = styled.img`
  animation: move 1s infinite linear;
  @keyframes move {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
const Spinner = () => {
  return <SpinnerImg src="icons/Loader/Line.svg" alt="loader" />;
};
export default Spinner;
