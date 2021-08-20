import React from 'react';
import { connect } from 'react-redux';
import { ButtonLogin } from '@/components/elements/button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { InputLogin } from '@/components/elements/input';
import FieldError from '../../elements/field-error';
import classes from './formLogin.module.scss';

function FormLogin(props) {
  const { data, errors } = props;

  function onChangeField(name) {
    return event => {
      const data = { ...props.data, [name]: event.target.value };
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
        onClick={props.onClickReturn}
      />
      <h2 className={classes.registerTitle}>LOGIN</h2>
      <form className={classes.loginForm}>
        <InputLogin id="login-email" label="Email" type="email" onChange={onChangeField('email')} value={data.email} />
        <InputLogin
          id="login-password"
          label="Password"
          type="password"
          onChange={onChangeField('password')}
          value={data.password}
        />
        <FieldError errors={errors} path="password" />
        <div className={classes.registerSection}>
          <a className={classes.registerLink} href="#" onClick={props.onClickForgot}>
            Forgot Password?
          </a>
        </div>
        <FieldError errors={errors} path="detail" />
        <FieldError errors={errors} path="email" />
      </form>
      <ButtonLogin onClick={onLogin} disabled={!data.email || !data.password}>
        LOGIN
      </ButtonLogin>
    </div>
  );
}

export default connect()(FormLogin);
