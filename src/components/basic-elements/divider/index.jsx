import React from 'react';
import classes from './index.module.scss';

export const Divider = props => {
  const { m, p } = props;
  return <hr className={classes.divider} style={{ margin: m ?? 0, padding: p ?? 0 }} />;
};
