import React from 'react';
import { IconButton } from '@material-ui/core';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import classes from './index.module.scss';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import { updateCartItem } from '@/store/cart/actions';

export const CounterButton = props => {
  const { id, count } = props;
  // const [count, setCount] = React.useState(1);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(updateCartItem(id, count + 1));
  };

  const handleDecrement = () => {
    dispatch(updateCartItem(id, count - 1));
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
