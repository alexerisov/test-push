import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { RootState } from '@/store/store';

// page component
import { MyOrdersPage } from '@/components/pages/my-orders/MyOrdersPage';

const connector = connect((state: RootState) => ({
  account: state.account
}))(MyOrdersPage);

export default withRouter(connector);

export async function getServerSideProps(context) {
  try {
    return {
      props: {
        ...(await serverSideTranslations(context.locale, ['common', 'myOrdersPage', 'profileSidebar', 'orderInfo'])),
        absolutePath: context.req.headers.host
      }
    };
  } catch (e) {
    console.error(e);

    return {
      props: {
        ...(await serverSideTranslations(context.locale, ['common', 'myOrdersPage', 'profileSidebar', 'orderInfo'])),
        notFound: true
      }
    };
  }
}
