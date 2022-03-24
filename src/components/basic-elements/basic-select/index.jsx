import React, { useState } from 'react';
import classes from './index.module.scss';
import { InputAdornment, InputBase, InputLabel, NativeSelect, OutlinedInput } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDownIcon from '~public/icons/Arrow Down Simple/Line.svg';
import ArrowUpIcon from '~public/icons/Arrow Up Simple/Line.svg';
import { BasicIcon } from '../basic-icon';
import { withStyles } from '@material-ui/core/styles';

const StyledInputBase = withStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  },
  input: {
    height: '48px',
    borderRadius: 12,
    border: '1px solid #AFB8CA',
    padding: '2px 16px',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 600,
    color: '#14181F !important',
    fontSize: '14px',
    lineHeight: '160%',
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '0.01em',

    '&:focus': {
      borderRadius: 12,
      borderColor: '#FFAA00',
      backgroundColor: 'transparent'
    }
  }
}))(InputBase);

const StyledSelect = withStyles(theme => ({
  root: {
    borderRadius: 12,
    border: '1px solid #AFB8CA',
    // maxWidth: '100% !important',
    width: '100% !important'
  }
}))(Select);

export const BasicSelect = props => {
  const { name, label, formik, values, disabled, classes: styles } = props;

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const defineEndIcon = () => {
    return (
      <div className={classes.select_icon_wrapper}>
        <BasicIcon icon={isOpen ? ArrowUpIcon : ArrowDownIcon} color="#AFB8CA" />
      </div>
    );
  };

  return (
    <div className={styles.container || 'container'}>
      {label && <InputLabel className={classes.label}>{label}</InputLabel>}
      <StyledSelect
        variant="outlined"
        onOpen={handleOpen}
        onClose={handleClose}
        labelId={'label-id' + label}
        value={formik.values[name]}
        // classes={{ root: classes.select_input }}
        id={name}
        IconComponent={defineEndIcon}
        name={name}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        fullWidth
        input={<StyledInputBase />}
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
          // classes: { root: classes.select_input },
          disableUnderline: false
        }}>
        {values &&
          Object.entries(values).map(item => (
            <MenuItem key={`${name}-select-${item[0]}`} value={item[0]}>
              {item[1]}
            </MenuItem>
          ))}
      </StyledSelect>
    </div>
  );
};
