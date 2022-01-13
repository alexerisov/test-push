import React, { useState } from 'react';
import classes from './index.module.scss';
import { InputAdornment, InputLabel, NativeSelect, OutlinedInput } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { ReactComponent as ArrowDownIcon } from '@/../public/icons/Arrow Down Simple/Line.svg';
import { ReactComponent as ArrowUpIcon } from '@/../public/icons/Arrow Up Simple/Line.svg';
import { BasicIcon } from '../basic-icon';

export const BasicSelect = props => {
  const { name, label, formik, values, disabled, classes: styles } = props;

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container || 'container'}>
      {label && <InputLabel className={classes.label}>{label}</InputLabel>}
      <Select
        variant="outlined"
        onOpen={handleOpen}
        onClose={handleClose}
        IconComponent={() => <BasicIcon icon={isOpen ? ArrowUpIcon : ArrowDownIcon} />}
        labelId={'label-id' + label}
        value={formik.values[name]}
        id={name}
        name={name}
        classes={{ outlined: classes.select_input }}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        fullWidth
        MenuProps={{
          disableScrollLock: true,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left'
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left'
          },
          getContentAnchorEl: null,
          classes: { paper: classes.select_menu_paper }
        }}
        inputProps={{
          classes: {
            outlined: classes.select_input
            // input: classes.select_input
          },
          disableUnderline: false
        }}>
        {values &&
          Object.entries(values).map(item => (
            <MenuItem key={`${name}-select-${item[0]}`} value={item[0]}>
              {item[1]}
            </MenuItem>
          ))}
      </Select>
    </div>
  );
};
