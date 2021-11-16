import React from 'react';
import { TextField, Typography } from '@material-ui/core';
import classes from './index.module.scss';

export const PortionsInput = props => {
  const { value, onChangeHandler } = props;

  return (
    <div className={classes.container}>
      <Typography className={classes.label}>Count of portions</Typography>
      <TextField
        min={1}
        max={10}
        type="number"
        value={value}
        onChange={onChangeHandler}
        classes={{ root: classes.input }}
        placeholder="Write here 1-10"
      />
    </div>
  );
};
