import React, { useRef } from 'react';
import classes from './index.module.scss';
import { InputAdornment, InputLabel, TextField } from '@material-ui/core';
import SuccessIcon from '../../../../public/images/index/icons-complete.svg';
import ErrorIcon from '../../../../public/images/index/icons-clear.svg';
import InputMask from 'react-input-mask';

export const BasicInput = props => {
  const { name, label, placeholder, formik, size, disabled, mask } = props;
  const gap = '20px';

  const defineFocusedStyle = () => {
    if (formik.dirty && !formik.errors[name]) {
      return classes.success;
    }

    return classes.focused;
  };

  const defineWidth = () => {
    return `1 1 calc((100% * ${size ?? 1}) - ${gap})`;
  };

  const defineAdornment = () => {
    if (formik.dirty && !formik.errors[name]) {
      return <img alt="success-icon" src={SuccessIcon} />;
    }

    if (formik.touched[name] && Boolean(formik.errors[name])) {
      return <img alt="clear-icon" src={ErrorIcon} />;
    }

    return false;
  };

  return (
    <div style={{ flex: defineWidth() }}>
      <InputLabel className={classes.label}>{label}</InputLabel>
      {mask && (
        <InputMask
          mask={mask}
          disabled={disabled}
          maskChar="_"
          value={formik.values[name]}
          id={name}
          name={name}
          placeholder={placeholder}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched[name] && Boolean(formik.errors[name])}
          helperText={formik.touched[name] && formik.errors[name]}
          InputProps={{
            classes: {
              root: classes.input,
              error: classes.error,
              focused: defineFocusedStyle()
            },
            disableUnderline: false,
            endAdornment: <InputAdornment position="end">{defineAdornment()}</InputAdornment>
          }}
          variant="outlined"
          fullWidth>
          {inputProps => <TextField {...inputProps} />}
        </InputMask>
      )}

      {!mask && (
        <TextField
          value={formik.values[name]}
          id={name}
          name={name}
          placeholder={placeholder}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched[name] && Boolean(formik.errors[name])}
          helperText={formik.touched[name] && formik.errors[name]}
          InputProps={{
            classes: {
              root: classes.input,
              error: classes.error,
              focused: defineFocusedStyle()
            },
            disableUnderline: false,
            endAdornment: <InputAdornment position="end">{defineAdornment()}</InputAdornment>
          }}
          variant="outlined"
          disabled={disabled}
          fullWidth
        />
      )}
    </div>
  );
};
