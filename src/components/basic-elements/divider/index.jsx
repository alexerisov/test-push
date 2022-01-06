import React from 'react';
import classes from './index.module.scss';

export const Divider = props => {
  const { m, p, color, width, vertical, height } = props;
  return (
    <hr
      className={classes.divider}
      style={{
        margin: m ?? 0,
        padding: p ?? 0,
        backgroundColor: color ? color : '#E0E4EB',
        width: width ? width : '100%',
        height: vertical ? height : '1px'
      }}
    />
  );
};
