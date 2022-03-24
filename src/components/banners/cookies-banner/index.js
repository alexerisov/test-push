import React, { useState, useEffect } from 'react';
import classes from './index.module.scss';
import { Alert } from '@material-ui/lab';
import { Button } from '@material-ui/core';
import Link from 'next/link';
import { setСonfirmBannerCoockie, getСonfirmBannerCoockie } from '@/utils/web-storage/cookie';

import { connect } from 'react-redux';
import { useAuth } from '@/utils/Hooks';

const CookiesBanner = props => {
  const { session } = useAuth();

  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(getСonfirmBannerCoockie());
  }, []);

  const hideCookiesBanner = () => {
    setСonfirmBannerCoockie();
    setVisible(getСonfirmBannerCoockie());
  };

  return !isVisible && !session ? (
    <div className={classes.cookiesBanner}>
      <Alert severity="info" className={classes.alert}>
        <div className={classes.cookiesBanner__container}>
          <p>
            Eatchefs and selected partners use cookies for to help out site function properly for you. In addition to
            the operation of Eatchefs features, cookies are used for personalizing your experience and for providing
            relevant advertising for you. By using the site, you acknowledge and consent to the use of these cookies. To
            learn more about cookies
            <Link href="/terms">
              <a className={classes.cookiesBanner__termsLink}> View our Terms of Use</a>
            </Link>
          </p>
          <Button variant="contained" color="primary" onClick={hideCookiesBanner}>
            I AGREE
          </Button>
        </div>
      </Alert>
    </div>
  ) : (
    <div className={classes.cookiesBanner_none} />
  );
};

export default connect(state => ({
  account: state.account
}))(CookiesBanner);
