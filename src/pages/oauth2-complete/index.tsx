import PageLoader from '@/components/elements/page-loader';
import { AuthCookieStorage } from '@/utils/web-storage/cookie';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LayoutPageNew from '@/components/layouts/layout-page-new';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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

  return <LayoutPageNew content={content} />;
};

export default connect(state => ({
  account: state.account
}))(Oauth2LoginComplete);

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
      // Will be passed to the page component as props
    }
  };
}
