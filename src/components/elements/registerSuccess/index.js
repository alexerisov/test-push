import React from 'react';
import { connect } from 'react-redux';
import classes from "./registerSuccess.module.scss";

function RegisterSuccess (props) {
  
  return (
    <div>
      <h2 className={classes.registerSuccessTitle}>REGISTERATION SUCCESSFUL</h2>
      <p className={classes.registerSuccessSubTitle} onClick={props.onClose}>Let us know about your interests</p>
      <p className={classes.registerSuccessText} onClick={props.onClose}>Skip and continue to website</p>
    </div>
  );
}

export default connect()(RegisterSuccess);