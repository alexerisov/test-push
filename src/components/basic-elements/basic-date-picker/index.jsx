import React, { useState } from 'react';
import classes from './index.module.scss';
import { DatePicker } from '@material-ui/pickers';
import { InputAdornment } from '@material-ui/core';
import CalendarIcon from '~public/icons/Calendar/Line.svg';

export const BasicDatePicker = props => {
  const { formik, label, name, ...otherProps } = props;
  const [inputStyle, setInputStyle] = useState(classes.input);
  return (
    <DatePicker
      id={name}
      name={name}
      disableToolbar
      className={classes.root}
      variant="inline"
      format="MMMM DD, YYYY"
      margin="normal"
      label={label}
      inputVariant="filled"
      LabelProps={{
        classes: {
          root: classes.label
        }
      }}
      onOpen={() => setInputStyle(classes.input__opened)}
      onClose={() => setInputStyle(classes.input)}
      InputProps={{
        classes: {
          root: inputStyle,
          error: classes.error
        },
        disableUnderline: true,
        endAdornment: (
          <InputAdornment style={{ fontSize: 20 }} position="end">
            <CalendarIcon className={classes.icon} />
          </InputAdornment>
        )
      }}
      value={formik.values[name]}
      onChange={value => formik.setFieldValue(name, value)}
      fullWidth
      autoOk
      {...otherProps}
    />
  );
};
