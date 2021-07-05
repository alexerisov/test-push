import React from 'react';
import { connect } from 'react-redux';
import { ButtonLogin } from '@/components/elements/button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import classes from "./registerChoice.module.scss";

function RegisterChoice (props) {
  
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
      <h2 className={classes.registerTitle}>REGISTER</h2>
      <ButtonLogin onClick={props.registerViewer}>REGISTER AS A VIEWER</ButtonLogin>
      <ButtonLogin onClick={props.registerChef}>REGISTER AS A HOME CHEF</ButtonLogin>
      <p className={classes.registerSubTitle} onClick={props.login}>LOGIN</p>
    </div>
  );
}

export default connect()(RegisterChoice);