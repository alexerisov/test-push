import React from 'react';
import { connect } from 'react-redux';
import classes from "./reset-password-success.module.scss";

function ResetPasswordSuccess (props) {
  
  return (
    <div>
      <h2 className={classes.resetPasswordSuccessTitle}>RESET PASSWORD SUCCESSFUL</h2>
      <p className={classes.resetPasswordSuccessSubTitle}>
        A link to change your password has been sent to the specified email address.<br/>
        Follow the link in the letter to recovery the password for your account
      </p>
    </div>
  );
}

export default connect()(ResetPasswordSuccess);