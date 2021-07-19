import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginSocialActions} from '@/store/actions';
import Router, {withRouter} from 'next/router';
import {withoutAuth} from '@/utils/authProvider';

class LoginSocial extends Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
    loginSocial: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.query = new URLSearchParams(this.props.router.asPath.split('#').pop());
    const access_token = this.query.get('access_token');
    const state = JSON.parse(this.query.get('state'));
    if (this.props.account.hasToken) {
      Router.router.push('/');
    }
    this.props.dispatch(
      loginSocialActions.login({
        access_token,
        account_type: state.account_type,
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
