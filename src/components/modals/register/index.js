import React, { useEffect, useState } from 'react';
import classes from './register.module.scss';
import { LayoutModal } from '@/components/layouts';
import { Button, Icon, IconButton, Link, OutlinedInput, useMediaQuery } from '@material-ui/core';
import { loginActions, modalActions, registerActions, restorePasswordActions } from '@/store/actions';
import { LoginChoice, LoginSocial, RegisterChoice, RegisterSuccess, ResetPasswordSuccess } from '@/components/elements';
import { FormLogin, FormRegister, FormResetPassword } from '@/components/forms';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { BasicSelect } from '@/components/basic-elements/basic-select';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ArrowIcon from '~public/icons/Arrow Right 2/Line.svg';
import GoogleIcon from '~public/icons/Google Logo/Line.svg';
import AppleIcon from '~public/icons/Apple Logo/Line.svg';
import FacebookIcon from '~public/icons/Facebook Logo/Line-F.svg';
import { BasicIcon } from '@/components/basic-elements/basic-icon';
import { Divider } from '@/components/basic-elements/divider';
import { BasicInput } from '@/components/basic-elements/basic-input';
import FieldError from '@/components/elements/field-error';
import VisibilityOffRoundedIcon from '@material-ui/icons/VisibilityOffRounded';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import { signIn } from 'next-auth/react';
import CONFIG from '@/config';

function Register(props) {
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isFormLogin, setIsFormLogin] = useState(true);
  const [signupFormStep, setSignupFormStep] = useState(1);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflowY = 'hidden';
    }

    return () => {
      document.body.style.overflowY = 'unset';
    };
  }, [isMobile]);

  const USER_TYPE = {
    viewerType: 0,
    chefType: 1
  };

  const { toChoiceRegister } = props;

  const viewerType = USER_TYPE.viewerType;
  const chefType = USER_TYPE.chefType;
  const PAGE_SELECTED_TYPES = {
    loginChoice: 'LOGIN_CHOICE',
    loginEmail: 'LOGIN_EMAIL',
    loginSocial: 'LOGIN_SOCIAL',
    registerChoice: 'REGISTER_CHOICE',
    registerPage: 'REGISTER_PAGE',
    registerSuccess: 'REGISTER_SUCCESS',
    resetPassword: 'RESET_PASSWORD',
    resetPasswordSuccess: 'RESET_PASSWORD_SUCCESS'
  };

  const [pageSelected, setPageSelected] = React.useState(PAGE_SELECTED_TYPES.loginChoice);

  const { data: loginData, isLoading: loginIsLoading, error: loginError } = props.login;
  const { data: registerData, isLoading: registerIsLoading, error: registerError } = props.register;
  const {
    data: restorePasswordData,
    isLoading: restorePasswordIsLoading,
    error: restorePasswordError
  } = props.restorePassword;

  const onCancel = () => {
    props.dispatch(modalActions.close());
    if ((router.pathname === '/confirm/email/[code]', undefined, { locale: router.locale })) {
      router.push('/');
    }
  };

  const switchToPageEmail = () => {
    setPageSelected(PAGE_SELECTED_TYPES.loginEmail);
  };

  const switchToPageSocial = () => {
    setPageSelected(PAGE_SELECTED_TYPES.loginSocial);
  };

  const switchToPageChoise = () => {
    setPageSelected(PAGE_SELECTED_TYPES.loginChoice);
  };

  const switchToPageRegisterChoice = () => {
    setPageSelected(PAGE_SELECTED_TYPES.registerChoice);
  };

  const switchToPageForgot = () => {
    setPageSelected(PAGE_SELECTED_TYPES.resetPassword);
  };

  const switchToPageResetSuccess = () => {
    setPageSelected(PAGE_SELECTED_TYPES.resetPasswordSuccess);
  };

  const switchToPageRegisterViewer = () => {
    const data = { ...registerData, user_type: viewerType };
    props.dispatch(registerActions.update(data));
    setPageSelected(PAGE_SELECTED_TYPES.registerPage);
  };

  const switchToPageRegisterChef = () => {
    const data = { ...registerData, user_type: chefType };
    props.dispatch(registerActions.update(data));
    setPageSelected(PAGE_SELECTED_TYPES.registerPage);
  };

  const switchToPageSuccess = () => {
    setPageSelected(PAGE_SELECTED_TYPES.registerSuccess);
  };

  const onChangeLogin = data => {
    props.dispatch(loginActions.update(data));
  };

  const onChangeRegister = data => {
    props.dispatch(registerActions.update(data));
  };

  const onChangeRestorePassword = data => {
    props.dispatch(restorePasswordActions.update(data));
  };

  function onChangeField(name) {
    return event => {
      const data = { ...props.data, [name]: event.target.value };
      if (props.onChange) {
        props.onChange(data);
      }
    };
  }

  const login = data => {
    props
      .dispatch(loginActions.login(data))
      .then(res => {
        onCancel();
      })
      .catch(e => {
        console.log('error', e);
      });
  };

  const register = data => {
    props
      .dispatch(registerActions.register(data))
      .then(res => {
        switchToPageSuccess();
      })
      .catch(e => {
        console.log('error', e);
      });
  };

  const restorePassword = data => {
    props
      .dispatch(restorePasswordActions.resetPassword(data))
      .then(res => {
        switchToPageResetSuccess();
      })
      .catch(e => {
        console.log('error', e);
      });
  };

  useEffect(() => {
    toChoiceRegister ? switchToPageRegisterChoice() : null;
  }, [toChoiceRegister]);

  const renderContent = () => {
    switch (pageSelected) {
      case PAGE_SELECTED_TYPES.loginChoice:
        return (
          <LoginChoice
            loginEmail={switchToPageEmail}
            loginSocial={switchToPageSocial}
            register={switchToPageRegisterChoice}
          />
        );
      case PAGE_SELECTED_TYPES.loginEmail:
        return (
          <FormLogin
            onClickReturn={switchToPageChoise}
            onChange={onChangeLogin}
            data={loginData}
            errors={loginError}
            onLogin={login}
            onClickForgot={switchToPageForgot}
          />
        );
      case PAGE_SELECTED_TYPES.loginSocial:
        return <LoginSocial onClickReturn={switchToPageChoise} />;
      case PAGE_SELECTED_TYPES.registerChoice:
        return (
          <RegisterChoice
            registerViewer={switchToPageRegisterViewer}
            registerChef={switchToPageRegisterChef}
            onClickReturn={switchToPageChoise}
            login={switchToPageChoise}
          />
        );
      case PAGE_SELECTED_TYPES.registerPage:
        return (
          <FormRegister
            onClickReturn={switchToPageChoise}
            onRegister={register}
            onChange={onChangeRegister}
            data={registerData}
            errors={registerError}
          />
        );
      case PAGE_SELECTED_TYPES.registerSuccess:
        return <RegisterSuccess onClose={onCancel} />;
      case PAGE_SELECTED_TYPES.resetPassword:
        return (
          <FormResetPassword
            onClickReturn={switchToPageEmail}
            onChange={onChangeRestorePassword}
            data={restorePasswordData}
            errors={restorePasswordError}
            onResetPassword={restorePassword}
          />
        );
      case PAGE_SELECTED_TYPES.resetPasswordSuccess:
        return <ResetPasswordSuccess />;
      default:
        return null;
    }
  };

  const validationSchema = yup.object({
    email: yup.string('Enter your email').emailWithoutSymbols().required('Email is required')
  });

  const defaultFormValues = {
    userType: '0',
    loginEmail: '',
    loginPassword: '',
    signupEmail: '',
    signupUsername: '',
    signupPassword: '',
    acceptTerms: false
  };

  const formik = useFormik({
    initialValues: defaultFormValues,
    validationSchema: validationSchema,
    onSubmit: values => handleSubmit(values)
  });

  const isSupplier = formik.values.userType === '2';

  const handleSubmit = values => {
    const loginData = {
      email: values.email,
      password: values.password
    };
    const registerData = {
      email: values.email,
      full_name: values.username,
      password: values.password,
      user_type: values.userType
    };

    if (isFormLogin) {
      return signIn('credentials', { ...loginData });
    } else {
      return register(registerData);
    }
  };

  const selectValues = {
    0: 'Eater',
    1: 'Chef'
  };

  const SocialBlock = () => {
    return (
      <div className={classes.register_social}>
        <p className={classes.register_social_helper_text1}>Use Your OpenID to {isFormLogin ? 'Login' : 'Sign Up'}</p>
        <div className={classes.register_social_buttons_block}>
          <Button
            onClick={() => signIn('facebook')}
            className={classes.register_social_button_facebook}
            variant="contained"
            startIcon={<BasicIcon icon={FacebookIcon} viewBox="0 0 320 512" size="16px" color="#FCFCFD" />}>
            Facebook
          </Button>
          <Button
            onClick={() => signIn('google')}
            className={classes.register_social_button_google}
            variant="contained"
            startIcon={<BasicIcon icon={GoogleIcon} viewBox="0 0 488 512" size="16px" color="#FCFCFD" />}>
            Google
          </Button>
        </div>
        <p className={classes.register_social_helper_text2}>Or continue with email</p>
      </div>
    );
  };

  const CircleButton = props => {
    const { handleClick, disabled } = props;
    return (
      <IconButton
        disabled={disabled}
        onClick={handleClick}
        className={classes.signup_input_button}
        style={{ background: '#FFAA00', color: 'white' }}
        size="32px">
        <ArrowIcon className={classes.signup_input_icon} />
      </IconButton>
    );
  };

  const RoundInput = props => {
    const { formik, name, placeholder, icon, disabled } = props;

    return (
      <OutlinedInput
        id={name}
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && formik.errors[name]}
        className={classes.signup_input}
        fullWidth
        endAdornment={icon || false}
      />
    );
  };

  const LoginInputs = ({ formik }) => {
    return (
      <>
        <BasicInput
          key="loginEmail"
          formik={formik}
          name="loginEmail"
          label="Email"
          // value={loginData?.email}
          // onChange={onChangeField('email')}
          placeholder="Enter your email"
          // error={loginError?.['email']}
        />
        <BasicInput
          key="loginPassword"
          formik={formik}
          name="loginPassword"
          label="Password"
          // value={loginData?.password}
          // onChange={onChangeField('password')}
          placeholder="Enter your password"
          // error={loginError?.['password']}
        />
      </>
    );
  };

  const handleChangePasswordVisibility = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  const switchToNextFormStep = () => {
    setSignupFormStep(2);
    setIsPasswordHidden(false);
  };

  const SignupInputs = () => {
    const switchToNextFormStep = () => {
      setSignupFormStep(2);
      setIsPasswordHidden(false);
    };

    return (
      <>
        <RoundInput
          formik={formik}
          name="signupEmail"
          disabled={signupFormStep === 2}
          icon={signupFormStep === 1 && <CircleButton handleClick={switchToNextFormStep} />}
        />
        {signupFormStep === 2 && <RoundInput formik={formik} name="signupUsername" />}
        {signupFormStep === 2 && <RoundInput formik={formik} name="signupPassword" />}
      </>
    );
  };

  const FormSwitcher = () => {
    const loginHandle = () => {
      setIsFormLogin(true);
    };

    const signUpHandle = () => {
      setIsFormLogin(false);
    };

    return (
      <>
        {isFormLogin && (
          <p className={classes.register_switcher}>
            Don’t have an account?{' '}
            <span onClick={signUpHandle} className={classes.register_switcher_button}>
              Sign Up
            </span>
          </p>
        )}
        {!isFormLogin && (
          <p className={classes.register_switcher}>
            Already have an account?{' '}
            <span onClick={loginHandle} className={classes.register_switcher_button}>
              Login
            </span>
          </p>
        )}
      </>
    );
  };

  const SubmitButton = () => {
    return (
      <Button
        type="submit"
        // disabled={!login.email || !login.password}
        // type="submit"
        fullWidth
        className={classes.register_submit_button}
        variant="contained"
        endIcon={<BasicIcon icon={ArrowIcon} color="#FCFCFD" />}>
        {isFormLogin && 'Login'}
        {!isFormLogin && signupFormStep === 2 && 'Sign Up'}
      </Button>
    );
  };

  return (
    <LayoutModal onClose={onCancel} themeName="basic">
      <div className={classes.register}>
        <form style={{ width: '100%' }}>
          <div className={classes.register_title_wrapper}>
            <h2 className={classes.register_title}>{isFormLogin ? 'Login' : 'Sign Up'}</h2>
          </div>

          {signupFormStep === 1 && <SocialBlock />}

          {isFormLogin && (
            <>
              <BasicInput
                formik={formik}
                name="email"
                label="Email"
                placeholder="Enter your email"
                error={loginError?.['email']}
              />
              <BasicInput
                formik={formik}
                name="password"
                label="Password"
                isSecret={isPasswordHidden}
                endAdornment={
                  <IconButton onClick={handleChangePasswordVisibility}>
                    {!isPasswordHidden && <VisibilityOffRoundedIcon />}
                    {isPasswordHidden && <VisibilityRoundedIcon />}
                  </IconButton>
                }
                disableValidation
                // value={loginData?.password}
                // onChange={onChangeField('password')}
                placeholder="Enter your password"
                error={loginError?.['password']}
              />
              <FieldError errors={loginError} path="detail" />
            </>
          )}
          {!isFormLogin && (
            <>
              <OutlinedInput
                style={{ marginTop: '24px' }}
                id="email"
                name="email"
                placeholder="Enter your email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched['email'] && Boolean(formik.errors['email'])}
                helperText={formik.touched['email'] && formik.errors['email']}
                className={classes.signup_input}
                fullWidth
                endAdornment={
                  signupFormStep === 1 && (
                    <CircleButton disabled={!(formik.isValid && formik.dirty)} handleClick={switchToNextFormStep} />
                  )
                }
              />
              <FieldError errors={formik.errors} path="email" />
              {signupFormStep === 2 && (
                <BasicInput
                  formik={formik}
                  name="username"
                  label="Full Name"
                  placeholder="Enter your name"
                  error={registerError?.['full_name']}
                />
              )}
              {signupFormStep === 2 && (
                <BasicInput
                  formik={formik}
                  name="password"
                  label="Password"
                  isSecret
                  disableValidation
                  isSecret={!isPasswordHidden}
                  endAdornment={
                    <IconButton onClick={handleChangePasswordVisibility}>
                      {!isPasswordHidden && <VisibilityOffRoundedIcon />}
                      {isPasswordHidden && <VisibilityRoundedIcon />}
                    </IconButton>
                  }
                  placeholder="Enter your password"
                  error={registerError?.['password']}
                />
              )}
              <FieldError errors={registerError} path="detail" />
            </>
          )}
          {(isFormLogin || (!isFormLogin && signupFormStep === 2)) && (
            <Button
              onClick={() => handleSubmit(formik.values)}
              disabled={!(formik.isValid && formik.dirty)}
              // type="submit"
              fullWidth
              className={classes.register_submit_button}
              variant="contained"
              endIcon={<BasicIcon icon={ArrowIcon} color="#FCFCFD" />}>
              {isFormLogin && 'Login'}
              {!isFormLogin && signupFormStep === 2 && 'Sign Up'}
            </Button>
          )}

          {signupFormStep === 1 && <FormSwitcher />}

          <div className={classes.links}>
            <Link className={classes.links_text} href="/terms" target="_blank">
              <a>Terms of use </a>
            </Link>
            <Divider vertical height="32px" width="1px" m="0 32px" />
            <Link className={classes.links_text} href="/privacy-policy" target="_blank">
              <a> Privacy Policy</a>
            </Link>
          </div>
        </form>
      </div>
    </LayoutModal>
  );
}

export default connect(state => ({
  account: state.account,
  login: state.login,
  register: state.register,
  restorePassword: state.restorePassword,
  toChoiceRegister: state.modal.toRegister
}))(Register);
