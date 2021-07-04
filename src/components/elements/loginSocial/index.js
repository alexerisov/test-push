import React from 'react';
import { connect } from 'react-redux';
import { ButtonLogin } from '@/components/elements/button';
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
      <ButtonLogin onClick={props.loginEmail}>LOGIN WITH FACEBOOK</ButtonLogin>
      <ButtonLogin onClick={props.loginSocial}>LOGIN WITH GOOGLE</ButtonLogin>
      <ButtonLogin onClick={props.loginSocial}>LOGIN WITH INSTAGRAM</ButtonLogin>
    </div>
  );
}

export default connect()(LoginSocial);