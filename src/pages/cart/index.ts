import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { RootState } from '@/store/store';

// page component
import { CartPage } from '@/components/pages/cart/CartPage';

const connector = connect((state: RootState) => ({
  account: state.account
}))(CartPage);

export default withRouter(connector);

export async function getServerSideProps(context) {
  try {
    return {
      props: {
        ...(await serverSideTranslations(context.locale, ['common', 'cartPage', 'orderSummary'])),
        absolutePath: context.req.headers.host
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
}
