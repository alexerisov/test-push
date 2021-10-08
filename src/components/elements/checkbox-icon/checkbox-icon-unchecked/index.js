import React from 'react';
import styled from 'styled-components';
const Unchecked = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 2px;
  background-color: #dadada;
`;

const CheckboxIconUnchecked = () => {
  return <Unchecked />;
};

export default CheckboxIconUnchecked;
