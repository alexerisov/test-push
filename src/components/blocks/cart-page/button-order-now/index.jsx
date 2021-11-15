import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100% !important',
    borderRadius: '0 !important',
    height: 54,
    '&:disabled': {
      background: '#FFBD3A',
      color: 'white'
    }
  },
  label: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '22px',
    lineHeight: '27px'
  },
  [theme.breakpoints.up('lg')]: {
    root: {
      height: 54
    }
  },
  [theme.breakpoints.down('md')]: {
    root: {
      height: 47
    }
  }
}));

export const ButtonOrderNow = props => {
  const { price, isDisabled, onClickHandler } = props;
  const styles = useStyles();

  return (
    <Button
      disabled={isDisabled}
      onClick={onClickHandler}
      disableRipple
      disableElevation
      color="primary"
      fullWidth
      variant="contained"
      classes={styles}>
      Order now ({price}$)
    </Button>
  );
};
