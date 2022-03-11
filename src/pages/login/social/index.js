import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginSocialActions } from '@/store/actions';
import Router, { withRouter } from 'next/router';
import { withoutAuth } from '@/utils/authProvider';
import { USER_TYPE } from '@/utils/datasets';
import CONFIG from '@/config.js';

class LoginSocial extends Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
    loginSocial: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    if (this.props.router.asPath.includes('social#')) {
      this.query = new URLSearchParams(this.props.router.asPath.split('social#').pop());
    } else {
      this.query = new URLSearchParams(this.props.router.asPath.split('social?').pop());
    }
    const state = JSON.parse(this.query.get('state').replace('#_', ''));

    const access_token = this.query.get('access_token');
    const code = this.query.get('code');

    if (this.props.account.hasToken) {
      Router.router.push('/', undefined, { locale: router.locale });
    }
    this.props
      .dispatch(
        loginSocialActions.login({
          access_token,
          code,
          account_type: state.account_type ?? USER_TYPE.viewerType,
          backend: state.backend,
          register: state.register,
          redirect_uri: CONFIG.oauthRedirectUrl
        })
      )
      .then(() => {
        this.props.router.replace('/');
      })
      .catch(e => {
        console.log('Login error', e);
        this.props.router.replace('/');
      });
  }

  render() {
    return <div>{!this.props.loginSocial.error ? 'loading...' : this.props.loginSocial.error}</div>;
  }
}

export default withRouter(
  withoutAuth(
    connect(state => ({
      account: state.account,
      loginSocial: state.loginSocial
    }))(LoginSocial)
  )
);
