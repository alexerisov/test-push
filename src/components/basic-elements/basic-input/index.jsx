import React from 'react';
import classes from './index.module.scss';
import { IconButton, InputAdornment, InputLabel, NoSsr, TextField } from '@material-ui/core';
import SuccessIcon from '~public/images/index/icons-complete.svg';
import ClearIcon from '~public/icons/Close Circle/Filled.svg';
import dynamic from 'next/dynamic';
import { BasicIcon } from '@/components/basic-elements/basic-icon';
const MuiPhoneNumber = dynamic(() => import('material-ui-phone-number'), { ssr: false });

export const BasicInput = props => {
  const {
    name,
    label,
    placeholder,
    formik,
    size,
    disabled,
    phone,
    isSecret,
    value,
    onChange,
    onBlur,
    onFocus,
    error,
    disableValidation,
    endAdornment
  } = props;
  const gap = '20px';

  const handleClear = () => {
    formik.setFieldValue(name, '');
  };

  const defineFocusedStyle = () => {
    if (formik.dirty && formik.touched[name] && !formik.errors[name]) {
      return classes.success;
    }

    return classes.focused;
  };

  const defineWidth = () => {
    return `1 1 calc((100% * ${size ?? 1}) - ${gap})`;
  };

  const defineAdornment = () => {
    if (endAdornment) {
      return endAdornment;
    }

    if (formik.dirty && formik.touched[name] && !formik.errors[name]) {
      return <SuccessIcon />;
    }

    if (formik.touched[name] && Boolean(formik.errors[name])) {
      return (
        <IconButton onClick={handleClear}>
          <BasicIcon icon={ClearIcon} viewBox="0 0 20 20" size="20px" />
        </IconButton>
      );
    }

    return false;
  };

  return (
    <div className={classes.input_container} style={{ flex: defineWidth() }}>
      <InputLabel className={classes.label}>{label}</InputLabel>
      {!phone && (
        <TextField
          type={isSecret ? 'password' : 'text'}
          value={value ? value : formik.values[name]}
          id={name}
          disableValidation={disableValidation}
          name={name}
          onFocus={onFocus ? onFocus : event => event.target.focus()}
          placeholder={placeholder}
          onBlur={onBlur ? onBlur : formik.handleBlur}
          onChange={onChange ? onChange : formik.handleChange}
          error={error ? error : formik.touched[name] && Boolean(formik.errors[name])}
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
      {phone && (
        <NoSsr>
          <MuiPhoneNumber
            disableAreaCodes
            autoFormat
            data-cy="phone"
            defaultCountry={'nl'}
            value={formik.values[name]}
            id={name}
            name={name}
            placeholder={placeholder}
            onBlur={formik.handleBlur}
            onChange={value => formik.setFieldValue(name, value)}
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
        </NoSsr>
      )}
    </div>
  );
};
