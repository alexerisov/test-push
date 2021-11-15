import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100% !important',
    color: theme.palette.primary.main,
    marginBottom: '10px',
    marginTop: '10px',
    height: 'auto',
    '& .MuiInput-underline:before': {
      borderBottomColor: theme.palette.primary.main,
      borderBottomWidth: '3px'
    },
    '&:hover .MuiInput-underline:before': {
      borderBottomColor: theme.palette.primary.main,
      borderBottomWidth: '4px'
    },
    '& .MuiInput-input': {
      color: theme.palette.primary.main,
      fontWeight: 600
    },

    [theme.breakpoints.up('lg')]: {
      '& .MuiInput-input': {
        fontSize: '18px',
        lineHeight: '22px'
      }
    },
    [theme.breakpoints.only('md')]: {
      '& .MuiInput-input': {
        fontSize: '16px',
        lineHeight: '20px'
      }
    },
    [theme.breakpoints.only('sm')]: {
      '& .MuiInput-input': {
        fontSize: '12px',
        lineHeight: '15px'
      }
    },
    [theme.breakpoints.only('xs')]: {
      '& .MuiInput-input': {
        textAlign: 'center'
      }
    }
  }
}));

export const PromoCodeInput = props => {
  const [value, setValue] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const styles = useStyles();
  return <TextField value={value} onChange={handleChange} placeholder="PROMO CODE" classes={{ root: styles.root }} />;
};
