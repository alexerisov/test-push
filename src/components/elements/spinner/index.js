import React from 'react';
import styled from 'styled-components';
import LoaderIcon from '~public/icons/Loader/Line.svg';

const SpinnerSpan = styled.span`
  display: flex;
  align-items: center;
  width: 24px;
  height: 24px;
  transform-origin: center;
  & svg {
    width: 24px;
    height: 24px;
    animation: move 1s infinite linear;
  }
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
  return (
    <SpinnerSpan>
      <LoaderIcon />
    </SpinnerSpan>
  );
};
export default Spinner;
