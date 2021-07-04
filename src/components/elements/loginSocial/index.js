import React from 'react';
import { connect } from 'react-redux';
import { ButtonLogin } from '@/components/elements/button';
import {
  loginViaFacebook,
  loginViaGoogle,
  loginViaInstagram
} from '@/utils/authSocial';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import classes from "./loginSocial.module.scss";

function LoginSocial (props) {
  
  return (
    <div style={props.pageSelected === props.pageName ? null : {display: 'none'}}>
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
      <ButtonLogin onClick={loginViaFacebook(null, false)}>LOGIN WITH FACEBOOK</ButtonLogin>
      <ButtonLogin onClick={loginViaGoogle(null, false)}>LOGIN WITH GOOGLE</ButtonLogin>
      <ButtonLogin onClick={loginViaInstagram(null, false)}>LOGIN WITH INSTAGRAM</ButtonLogin>
    </div>
  );
}

export default connect()(LoginSocial);