import PageLoader from '@/components/elements/page-loader';
import { LayoutPage } from '@/components/layouts';
import { accountTypesList } from '@/utils/datasets';
import { AuthCookieStorage } from '@/utils/web-storage/cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

const Oauth2LoginComplete = (props) => {
  const router = useRouter();
  const { token } = AuthCookieStorage.auth;

  // const [accountType, setAccountType] = useState();

  // useEffect(() => {
  //   setAccountType(router.query.accType);
  // }, [router]);

  useEffect(() => {
    if (!token) {
      router.push(`/profile/account-settings`);
    }
      router.push({
        pathname: '/profile/account-settings',
        query: {
          edit: `true`
        }
      });
  }, [props.account]);

  const content = <PageLoader />;

  return (
    <LayoutPage content={content} />
  );
};

export default (connect((state) => ({
  account: state.account,
}))(Oauth2LoginComplete)
);
