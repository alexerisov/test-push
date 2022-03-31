import { connect } from 'react-redux';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// page component
import { ProfileAccountSettingsPage } from '@/components/pages/profile/account-settings/ProfileAccountSettingsPage';
import { RootState } from '@/store/store';
import { getSession } from 'next-auth/react';
import Account from '@/api/Account';
import { log } from 'loglevel';
import { setBearer } from '@/utils/setBearer';

export default connect((state: RootState) => ({
  account: state.account
}))(ProfileAccountSettingsPage);
export const getServerSideProps = async context => {
  const session = await getSession(context);
  setBearer(session?.jwt);
  try {
    const profileResponse = await Account.current();

    return {
      props: {
        session,
        profile: profileResponse?.data,
        ...(await serverSideTranslations(context.locale, ['common', 'profilePage']))
      }
    };
  } catch (e) {
    log(e);

    return {
      props: {
        notFound: true
      }
    };
  }
};
