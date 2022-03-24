import { connect } from 'react-redux';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// page component
import { ProfileAccountSettingsPage } from '@/components/pages/profile/account-settings/ProfileAccountSettingsPage';
import { RootState } from '@/store/store';
import { getSession } from 'next-auth/react';
import Account from '@/api/Account';
import http from '@/utils/http';
import { getToken } from 'next-auth/jwt';

export default connect((state: RootState) => ({
  account: state.account
}))(ProfileAccountSettingsPage);

export const getServerSideProps = async context => {
  const token = await getToken(context);
  console.log(token);
  const session = await getSession(context);
  if (token) {
    http.defaults.headers.common['Authorization'] = `Bearer ${token?.accessToken}`;
  }

  try {
    const profileResponse = await Account.current(token?.accessToken);
    // await console.log('response', profileResponse.request._header);

    return {
      props: {
        session,
        profile: profileResponse?.data,
        ...(await serverSideTranslations(context.locale, ['common', 'profilePage']))
      }
    };
  } catch (e) {
    console.error(e);

    return {
      props: {
        notFound: true
      }
    };
  }
};
