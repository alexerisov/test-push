import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// page component
import { OrderConfirmPage } from '@/components/pages/order-confirm/OrderConfirmPage';
import { RootState } from '@/store/store';

const connector = connect((state: RootState) => ({
  account: state.account
}))(OrderConfirmPage);

export default withRouter(connector);

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'orderConfirmPage', 'orderSummary', 'errors']))
  }
});
