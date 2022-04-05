import { connect } from 'react-redux';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// page component
import { ProfilePasswordPage } from '@/components/pages/profile/password/ProfilePasswordPage';
import { RootState } from '@/store/store';

export default connect((state: RootState) => ({
  account: state.account,
  restorePassword: state.restorePassword
}))(ProfilePasswordPage);

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'profilePage', 'errors']))
      // Will be passed to the page component as props
    }
  };
}
