import React from 'react';
import { connect } from 'react-redux';
import { ButtonLogin } from '@/components/elements/button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { InputLogin } from '@/components/elements/input';
import FieldError from '../../elements/field-error';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import classes from "./formLogin.module.scss";

const colorGray = '#707070';

const FormControlLabelLogin = withStyles({
    root: {
      color: colorGray,
    }
  })((props) => <FormControlLabel color="default" {...props} />);

  const CheckboxLogin = withStyles({
    root: {
      color: colorGray,
    }
  })((props) => <Checkbox color="default" {...props} />);

function FormLogin (props) {
  const { data, errors } = props;

  function onChangeField(name) {
    return (event) => {
      const data = { ...props.data, [name]: event.target.value };
      if (props.onChange) {
        props.onChange(data);
      }
    };
  }

  function onChangeCheckbox(name) {
    return (event) => {
      const data = { ...props.data, [name]: event.target.checked };
      if (props.onChange) {
        props.onChange(data);
      }
    };
  }

  const onLogin = () => {
    if (props.onLogin) {
      props.onLogin(data);
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
      <h2 className={classes.registerTitle}>LOGIN</h2>
      <form className={classes.loginForm}>
        <InputLogin
          id="login-email"
          label="Email"
          type="email"
          onChange={onChangeField('email')}
          value={data.email}
        />
        <FieldError errors={errors} path="email" />
        <InputLogin
          id="login-password"
          label="Password"
          type="password"
          onChange={onChangeField('password')}
          value={data.password}
        />
        <FieldError errors={errors} path="password" />
        <div className={classes.registerSection}>
          <FormControlLabelLogin
            checked={data.checkboxRemember}
            onChange={onChangeCheckbox('checkboxRemember')}
            control={<CheckboxLogin name="checkboxRemember" />}
            label="Remember me"
          />
          <a className={classes.registerLink} href='#'>Forgot Password?</a>
        </div>
        <FieldError errors={errors} path="detail" />
      </form>
      <ButtonLogin
        onClick={onLogin}
        disabled={!data.email || !data.password}>
        LOGIN
      </ButtonLogin>
    </div>
  );
}

export default connect()(FormLogin);