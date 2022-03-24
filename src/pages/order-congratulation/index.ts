import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { RootState } from '@/store/store';

// page component
import { OrderCongratulationPage } from '@/components/pages/order-congratulation/OrderCongratulationPage';

const connector = connect((state: RootState) => ({
  account: state.account
}))(OrderCongratulationPage);

export default withRouter(connector);

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'orderCongratulationPage', 'orderSummary', 'orderInfo']))
  }
});
