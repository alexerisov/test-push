import React, { useState, useEffect } from 'react';
import classes from './index.module.scss';
import { Alert } from '@material-ui/lab';
import { Button } from '@material-ui/core';
import Link from 'next/link';
import { setСonfirmBannerCoockie, getСonfirmBannerCoockie } from '@/utils/web-storage/cookie';

import { connect } from 'react-redux';
import { useAuth } from '@/utils/Hooks';
import { useTranslation } from 'next-i18next';

const CookiesBanner = props => {
  const { session, status: loading } = useAuth();
  const { t } = useTranslation('common');

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
            {t('cookieBanner.text')}
            <Link href="/terms">
              <a className={classes.cookiesBanner__termsLink}>{t('cookieBanner.text')}</a>
            </Link>
          </p>
          <Button variant="contained" color="primary" onClick={hideCookiesBanner}>
            {t('cookieBanner.button')}
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
