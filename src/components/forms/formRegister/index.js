import React from 'react';
import { connect } from 'react-redux';
import { ButtonLogin } from '@/components/elements/button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { InputLogin } from '@/components/elements/input';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import FieldError from '../../elements/field-error';
import classes from "./formRegister.module.scss";

const colorGray = '#707070';

const FormControlLabelLogin = withStyles({
  root: {
    color: colorGray,
  }
})((props) => <FormControlLabel color="default" {...props} />);

const CheckboxLogin = withStyles({
  root: {
    color: colorGray,
  },
})((props) => <Checkbox color="default" {...props} />);

function FormRegister (props) {

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

  const onRegister = () => {
    if (props.onRegister) {
      props.onRegister(data);
    }
  };

  return (
    <div style={props.pageSelected === props.pageName ? null : {display: 'none'}}>
      <ArrowBackIcon
        style={{
          color: '#fff',
          fontSize: 36,
          cursor: 'pointer',
          marginLeft: '33px'
        }}
        onClick={props.onClickReturn}/>
      <h2 className={classes.registerTitle}>REGISTER</h2>
      <form className={classes.registerForm}>
        <InputLogin
          id="register-email"
          label="Email"
          type="email"
          onChange={onChangeField('email')}
          value={data.email}
        />
        <FieldError errors={errors} path="email" />
        <InputLogin
          id="register-phone"
          label="Phone Number"
          type="tel"
          onChange={onChangeField('phone_number')}
          value={data.phone_number}
        />
        <InputLogin
          id="register-password"
          label="Password"
          type="password"
          onChange={onChangeField('password')}
          value={data.password}
        />
        <FieldError errors={errors} path="password" />
        <FormControlLabelLogin
          checked={data.checkboxAcceptTerms}
          onChange={onChangeCheckbox('checkboxAcceptTerms')}
          control={<CheckboxLogin name="checkboxAcceptTerms" />}
          label="I agree to Terms &#38; Conditions"
        />
      </form>
      <ButtonLogin
        onClick={onRegister}
        disabled={!data.email || !data.password || !data.checkboxAcceptTerms}>
        REGISTER
      </ButtonLogin>
    </div>
  );
}

export default connect()(FormRegister);