import { connect } from 'react-redux';
import 'react-phone-input-2/lib/style.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { RootState } from '@/store/store';

// page component
import { ProfileBecomeHomeChefPage } from '@/components/pages/profile/become-home-chef/ProfileBecomeHomeChefPage';

export default connect((state: RootState) => ({
  account: state.account
}))(ProfileBecomeHomeChefPage);

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
});
