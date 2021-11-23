import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100% !important'
  },
  label: {
    fontSize: 16,
    lineHeight: '20px'
  },
  [theme.breakpoints.up('lg')]: {
    root: {
      maxHeight: 36,
      marginTop: 18
    },
    label: {
      fontSize: 16,
      lineHeight: '20px'
    }
  },
  [theme.breakpoints.only('md')]: {
    root: {
      maxHeight: 32,
      marginTop: 15
    },
    label: {
      fontSize: 14,
      lineHeight: '17px'
    }
  },
  [theme.breakpoints.only('sm')]: {
    root: {
      maxHeight: 24,
      marginTop: 12
    },
    label: {
      fontSize: 11,
      lineHeight: '13px'
    }
  },
  [theme.breakpoints.only('xs')]: {
    root: {
      maxHeight: 36,
      marginTop: 18
    },
    label: {
      fontSize: 16,
      lineHeight: '19px'
    }
  }
}));

export const ConfirmButton = props => {
  const styles = useStyles();
  return (
    <Button
      disableRipple
      disableElevation
      color="primary"
      variant="contained"
      classes={{
        root: styles.root,
        label: styles.label
      }}
      {...props}>
      Confirm
    </Button>
  );
};
