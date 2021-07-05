import React from 'react';
import { connect } from 'react-redux';
import classes from "./buttonLogin.module.scss";

function ButtonLogin (props) {
  
  return (
    <>
      <button
        onClick={props.onClick}
        className={props.disabled ? classes.buttonLogin__disabled : classes.buttonLogin}
        disabled={props.disabled}>
        {props.children}
      </button>
    </>
  );
}

export default connect()(ButtonLogin);