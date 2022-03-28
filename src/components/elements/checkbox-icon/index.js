import React from 'react';
import styled from 'styled-components';
import CheckboxIconChecked from './checkbox-icon-checked';
const Wrap = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: #ffaa00;
  display: flex;
  justify-content: center;
  align-items: center;
  & svg {
    font-size: 24px !important;
  }
`;

const CheckboxIcon = () => {
  return (
    <Wrap>
      <CheckboxIconChecked />
    </Wrap>
  );
};

export default CheckboxIcon;
