import { connect } from 'react-redux';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { RootState } from '@/store/store';

// page component
import { NotificationsPage } from '@/components/pages/notifications/NotificationsPage';

export default connect((state: RootState) => ({
  account: state.account
}))(NotificationsPage);

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'notifications_page', 'notifications']))
  }
});
