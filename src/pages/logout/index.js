import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { accountActions } from '@/store/actions';

const Logout = (props) => {
  const router = useRouter();
  useEffect(() => {
    if (props.account.hasToken) {
      props.dispatch(accountActions.logout());
      router.push('/');
    } else {
      router.push('/');
    }
  }, []);

  return (
    <div />
  );

};

Logout.propTypes = {
  account: PropTypes.object.isRequired,

};

export default (connect(state => ({
  account: state.account,
}))(Logout));
