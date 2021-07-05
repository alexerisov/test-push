import React from 'react';
import {LayoutModal} from '@/components/layouts';
import {loginActions, modalActions, registerActions} from '@/store/actions';
import {
  LoginChoice,
  LoginSocial,
  RegisterChoice,
  RegisterSuccess,
} from '@/components/elements';
import {FormLogin, FormRegister} from '@/components/forms';
import { connect } from 'react-redux';
import classes from "./register.module.scss";

function Register (props) {

  const USER_TYPE = {
    viewerType: 0,
    chefType: 1
  };

  const viewerType = USER_TYPE.viewerType;
  const chefType = USER_TYPE.chefType;
  const PAGE_SELECTED_TYPES = {
    loginChoice: 'LOGIN_CHOICE',
    loginEmail: 'LOGIN_EMAIL',
    loginSocial: 'LOGIN_SOCIAL',
    registerChoice: 'REGISTER_CHOICE',
    registerPage: 'REGISTER_PAGE',
    registerSuccess: 'REGISTER_SUCCESS',
  };

  const [pageSelected, setPageSelected] = React.useState(PAGE_SELECTED_TYPES.loginChoice);

  const {data: loginData, isLoading: loginIsLoading, error: loginError} = props.login;
  const {data: registerData, isLoading: registerIsLoading, error: registerError} = props.register;

  const onCancel = () => {
    props.dispatch(modalActions.close());
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

  const switchToPageRegisterViewer = () => {
    const data = { ...registerData, user_type: viewerType };
    props.dispatch(
        registerActions.update(data),
    );
    setPageSelected(PAGE_SELECTED_TYPES.registerPage);
  };

  const switchToPageRegisterChef = () => {
    const data = { ...registerData, user_type: chefType };
    props.dispatch(
        registerActions.update(data),
    );
    setPageSelected(PAGE_SELECTED_TYPES.registerPage);
  };

  const switchToPageSuccess = () => {
    setPageSelected(PAGE_SELECTED_TYPES.registerSuccess);
  };

  const onChangeLogin = (data) => {
    props.dispatch(
        loginActions.update(data),
    );
  };

  const onChangeRegister = (data) => {
    props.dispatch(
        registerActions.update(data),
    );
  };

  const login = (data) => {
    props.dispatch(loginActions.login(data)).then((res) => {
      onCancel();
    }).catch(e => {
      console.log('error', e);
    });
  };

  const register = (data) => {
    props.dispatch(registerActions.register(data)).then((res) => {
      switchToPageSuccess();
    }).catch(e => {
      console.log('error', e);
    });
  };

  const renderContent = () => {
    switch (pageSelected) {
      case PAGE_SELECTED_TYPES.loginChoice:
        return <LoginChoice
              loginEmail={switchToPageEmail}
              loginSocial={switchToPageSocial}
              register={switchToPageRegisterChoice}
          />;
      case PAGE_SELECTED_TYPES.loginEmail:
        return <FormLogin
              onClickReturn={switchToPageChoise}
              onChange={onChangeLogin}
              data={loginData}
              errors={loginError}
              onLogin={login}
          />;
      case PAGE_SELECTED_TYPES.loginSocial:
        return <LoginSocial
              onClickReturn={switchToPageChoise}
          />;
      case PAGE_SELECTED_TYPES.registerChoice:
        return <RegisterChoice
              registerViewer={switchToPageRegisterViewer}
              registerChef={switchToPageRegisterChef}
              onClickReturn={switchToPageChoise}
              login={switchToPageChoise}
          />;
      case PAGE_SELECTED_TYPES.registerPage:
        return <FormRegister
              onClickReturn={switchToPageChoise}
              onRegister={register}
              onChange={onChangeRegister}
              data={registerData}
              errors={registerError}
          />;
      case PAGE_SELECTED_TYPES.registerSuccess:
        return <RegisterSuccess
              onClose={onCancel}
          />;
      default:
        return null;
    }

  };

  return (
      <LayoutModal
          onClose={onCancel}>
        <div className={classes.register}>
          <div className={classes.registerLogo}>
            <img className={classes.registerImage} src="/images/index/logo.png"
                 alt="Logo"></img>
          </div>
          {renderContent()}
        </div>
      </LayoutModal>
  );
}

export default connect((state => ({
  account: state.account,
  login: state.login,
  register: state.register,
})))(Register);
