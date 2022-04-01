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
  const session = await getSession(context);
  if (session) {
    http.defaults.headers.common['Authorization'] = `Bearer ${session?.jwt}`;
    console.log(session);
  }
  try {
    const profileResponse = await Account.current(session?.jwt);

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
