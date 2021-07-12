import React from 'react';
import { connect } from 'react-redux';
import { ButtonLogin } from '@/components/elements/button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { InputLogin } from '@/components/elements/input';
import FieldError from '../../elements/field-error';
import classes from "./form-reset-password.module.scss";

function FormResetPassword (props) {
  const { data, errors } = props;

  function onChangeField(name) {
    return (event) => {
      const data = { ...props.data, [name]: event.target.value };
      if (props.onChange) {
        props.onChange(data);
      }
    };
  }

  const onResetPassword = () => {
    if (props.onResetPassword) {
      props.onResetPassword(data);
    }
  };

  return (
    <div>
      <ArrowBackIcon
        style={{
          color: '#fff',
          fontSize: 36,
          cursor: 'pointer',
          marginLeft: '33px'
        }}
        onClick={props.onClickReturn}/>
      <h2 className={classes.registerTitle}>RESET PASSWORD</h2>
      <form className={classes.loginForm}>
        <InputLogin
          id="reset-email"
          label="Email"
          type="email"
          onChange={onChangeField('email')}
          value={data.email}
        />
        <FieldError errors={errors} path="email" />
        <div className={classes.registerSection}>
          <a className={classes.registerLink} href='#' onClick={props.onClickReturn}>Remembered your password?</a>
        </div>
        <FieldError errors={errors} path="detail" />
      </form>
      <ButtonLogin
        onClick={onResetPassword}
        disabled={!data.email}>
        RESET PASSWORD
      </ButtonLogin>
    </div>
  );
}

export default connect()(FormResetPassword);