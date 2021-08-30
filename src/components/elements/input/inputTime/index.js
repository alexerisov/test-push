import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px'
    },
    '& .MuiInputBase-input': {
      height: 'auto'
    },
    '& #create-cooking_time': {
      position: 'relative'
    },
    '& #create-cooking_time:before': {
      content: 'attr(data-placeholder)',
      position: 'absolute',
      left: '14px',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: '#fff'
    }
  }
}));

const InputTime = props => {
  const textFieldStyles = useStyles();
  const [inputTimePlaceholder, setInputTimePlaceholder] = useState('HH:MM');

  useEffect(() => {
    if (props.value !== '00:00') {
      setInputTimePlaceholder('');
    }
  }, [props.value]);

  const handleFocusOnPreparationTime = () => {
    setInputTimePlaceholder('');
  };

  const handleBlurOnPreparationTime = () => {
    if (props?.value !== '00:00') {
      setInputTimePlaceholder('');
      return;
    }

    setInputTimePlaceholder('HH:MM');
  };

  return (
    <TextField
      {...props}
      className={textFieldStyles.textField}
      type="time"
      variant="outlined"
      inputProps={{
        'data-placeholder': inputTimePlaceholder
      }}
      onFocus={handleFocusOnPreparationTime}
      onBlur={handleBlurOnPreparationTime}
    />
  );
};

export default InputTime;
