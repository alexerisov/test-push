// types
import type { GetServerSideProps } from 'next';
import type { RootState } from '@/store/store';

import { connect } from 'react-redux';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import log from 'loglevel';
import { getSession } from 'next-auth/react';
import Account from '@/api/Account';
import http from '@/utils/http';

// page component
import { ProfileAccountSettingsPage } from '@/components/pages/profile/account-settings/ProfileAccountSettingsPage';

export default connect((state: RootState) => ({
  account: state.account
}))(ProfileAccountSettingsPage);

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession({ req: context.req });
  log.debug('getServerSideProps session', session);
  if (session) {
    http.defaults.headers.common['Authorization'] = `Bearer ${session.accessToken}`;
  }
  const profileResponse = await Account.current(session?.accessToken);
  try {
    return {
      props: {
        ...(await serverSideTranslations(context.locale, ['common', 'profilePage', 'errors'])),
        session,
        profile: profileResponse?.data
      }
    };
  } catch (e) {
    log.error(e);

    return {
      props: {
        notFound: true
      }
    };
  }
};
