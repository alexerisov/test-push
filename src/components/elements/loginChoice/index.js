import React from 'react';
import { connect } from 'react-redux';
import { ButtonLogin } from '@/components/elements/button';
import classes from "./loginChoice.module.scss";

function LoginChoice (props) {
  
  return (
    <div>
      <h2 className={classes.registerTitle}>LOGIN</h2>
      <ButtonLogin onClick={props.loginEmail}>LOGIN USING EMAIL</ButtonLogin>
      <ButtonLogin onClick={props.loginSocial}>LOGIN VIA SOCIAL MEDIA</ButtonLogin>
      <p className={classes.registerSubTitle} onClick={props.register}>REGISTER</p>
    </div>
  );
}

export default connect()(LoginChoice);