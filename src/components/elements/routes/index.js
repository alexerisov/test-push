import React, { useEffect } from 'react';
import Router from 'next/router';
import PageLoader from '../page-loader';
import { connect } from 'react-redux';

const Redirect = ({ to }) => {
  useEffect(() => {
    if (Router.router.pathname !== to) {
      Router.router.push(to);
    }
  }, [to]);

  return <PageLoader />;
};

export default connect()(Redirect);
