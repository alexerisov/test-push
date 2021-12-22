import React from 'react';
import { SvgIcon } from '@material-ui/core';

export const BasicIcon = props => {
  return <SvgIcon component={props.icon} htmlColor={props.color} style={{ fontSize: props.size }} />;
};