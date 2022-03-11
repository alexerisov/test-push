import PageLoader from '@/components/elements/page-loader';
import { LayoutPage } from '@/components/layouts';
import { AuthCookieStorage } from '@/utils/web-storage/cookie';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

const Oauth2LoginComplete = props => {
  const router = useRouter();
  const { token } = AuthCookieStorage.auth;

  useEffect(() => {
    if (!token) {
      router.push(`/profile/account-settings`, undefined, { locale: router.locale });
    }
    router.push(
      {
        pathname: '/profile/account-settings',
        query: {
          edit: `true`
        }
      },
      undefined,
      { locale: router.locale }
    );
  }, [props.account]);

  const content = <PageLoader />;

  return <LayoutPage content={content} />;
};

export default connect(state => ({
  account: state.account
}))(Oauth2LoginComplete);
