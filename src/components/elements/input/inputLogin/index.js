import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const InputWithStyle = withStyles({
    root: {
      color: '#bcbcbc',
      marginBottom: '10px',
      '& .MuiInput-underline:before': {
        borderBottomColor: '#bcbcbc',
      },
      '& .MuiInput-underline:focus': {
        borderBottomColor: '#bcbcbc',
      },
      '& .MuiInput-root': {
        color: '#bcbcbc',
      },
      '& .MuiInputLabel-root': {
        color: '#bcbcbc',
      },
    },
  })(TextField);

function InputLogin (props) {
  
  return <InputWithStyle
          id={props.id}
          label={props.label}
          type={props.type}
          fullWidth
          {...props}
        />;
}

export default connect()(InputLogin);