import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginSocialActions} from '@/store/actions';
import Router, {withRouter} from 'next/router';
import {withoutAuth} from '@/utils/authProvider';
import {USER_TYPE} from '@/utils/datasets';

class LoginSocial extends Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
    loginSocial: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    if (this.props.router.asPath.includes('social#')) {
      this.query = new URLSearchParams(this.props.router.asPath.split('social#').pop());
    } else {
      this.query = new URLSearchParams(this.props.router.asPath);
    }
    let access_token = this.query.get('access_token');
    if (!access_token) {
      access_token = this.query.get('code');
    }
    const state = JSON.parse(this.query.get('state').replace("#_", ""));
    if (this.props.account.hasToken) {
      Router.router.push('/');
    }
    this.props.dispatch(
      loginSocialActions.login({
        access_token,
        account_type: state.account_type ?? USER_TYPE.viewerType,
        backend: state.backend,
        register: state.register,
      }),
    ).then(() => {
      window.close();
    }).catch(() => {
      // window.close();
    });
  }

  render() {
    return (
      <div>
        {
          !this.props.loginSocial.error
            ? 'loading...'
            : this.props.loginSocial.error
        }
      </div>
    );
  }
}

export default withRouter(withoutAuth(connect(state => ({
  account: state.account,
  loginSocial: state.loginSocial,
}))(LoginSocial)));
