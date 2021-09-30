import React from 'react';
import styled from 'styled-components';
import CheckboxIconChecked from './checkbox-icon-checked';
const Wrap = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 2px;
  background-color: #ffaa00;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckboxIcon = () => {
  return (
    <Wrap>
      <CheckboxIconChecked />
    </Wrap>
  );
};

export default CheckboxIcon;
