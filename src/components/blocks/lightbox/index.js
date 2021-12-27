import React, { useState } from 'react';
import styled from 'styled-components';
import {VideoImageCarousel} from "@/components/"
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #141416;
  position: 'fixed';
  left: 0;
  top: 0;
`;

const LightBox = ({ onClickWrapper,items }) => {
  return <Wrapper onClick={onClickWrapper}><VideoImageCarousel /></Wrapper>;
};

export default LightBox;
