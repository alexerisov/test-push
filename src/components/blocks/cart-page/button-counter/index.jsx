import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { IconButton, TextField } from '@material-ui/core';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import classes from './index.module.scss';
import Typography from '@material-ui/core/Typography';

export const CounterButton = () => {
  const [count, setCount] = React.useState(1);

  const handleIncrement = () => {
    if (!count) {
      setCount(1);
    }

    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (!count) {
      setCount(1);
    }

    if (count > 0) {
      setCount(count - 1);
    }
  };

  const CountButton = props => (
    // <Button classes={{ root: styles.button }} size="small" {...props}>
    <IconButton size="small" {...props}>
      {props.children}
    </IconButton>
  );

  return (
    <div className={classes.container} size="small" aria-label="counter">
      <CountButton className={classes.button} disabled={count <= 1} onClick={handleDecrement}>
        <RemoveRoundedIcon />
      </CountButton>
      <Typography className={classes.input}>{count}</Typography>
      <CountButton className={classes.button} onClick={handleIncrement}>
        <AddRoundedIcon />
      </CountButton>
    </div>
  );
};
