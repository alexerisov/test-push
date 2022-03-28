import React from 'react';
import styled from 'styled-components';
const Unchecked = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: #fcfcfd;
  border: 2px solid #e6e8ec;
`;

const CheckboxIconUnchecked = () => {
  return <Unchecked />;
};

export default CheckboxIconUnchecked;
