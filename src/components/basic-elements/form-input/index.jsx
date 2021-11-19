import React from 'react';
import classes from './index.module.scss';
import { InputAdornment, InputLabel, TextField } from '@material-ui/core';
import SuccessIcon from '../../../../public/images/index/icons-complete.svg';
import ErrorIcon from '../../../../public/images/index/icons-clear.svg';

export const FormInput = props => {
  const { name, label, placeholder, formik } = props;

  const defineFocusedStyle = () => {
    if (formik.dirty && formik.isValid) {
      return classes.success;
    }

    return classes.focused;
  };

  const defineAdornment = () => {
    if (formik.dirty && formik.isValid) {
      return <img alt="" src={SuccessIcon} />;
    }

    if (formik.touched[name] && Boolean(formik.errors[name])) {
      return <img alt="" src={ErrorIcon} />;
    }

    return false;
  };

  return (
    <>
      <InputLabel className={classes.label}>{label}</InputLabel>
      <TextField
        InputProps={{
          classes: {
            root: classes.input,
            error: classes.error,
            focused: defineFocusedStyle()
          },
          disableUnderline: false,
          // notched: false,
          endAdornment: <InputAdornment position="end">{defineAdornment()}</InputAdornment>
        }}
        variant="outlined"
        fullWidth
        id={name}
        name={name}
        placeholder={placeholder}
        value={formik.values[name]}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && formik.errors[name]}
      />
    </>
  );
};
