import React from 'react';
import { connect } from 'react-redux';
import { ButtonLogin } from '@/components/elements/button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import classes from './loginSocial.module.scss';

function LoginSocial(props) {
  return (
    <div>
      <ArrowBackIcon
        style={{
          color: '#fff',
          fontSize: 36,
          cursor: 'pointer',
          marginLeft: '33px'
        }}
        onClick={props.onClickReturn}
      />
      <h2 className={classes.registerTitle}>LOGIN</h2>
      <ButtonLogin onClick={() => console.log('login')}>LOGIN WITH FACEBOOK</ButtonLogin>
      <ButtonLogin onClick={() => console.log('login')}>LOGIN WITH GOOGLE</ButtonLogin>
    </div>
  );
}

export default connect()(LoginSocial);
