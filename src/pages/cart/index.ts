import { withRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// page component
import { CartPage } from '@/components/pages/cart/CartPage';
import { GetServerSideProps } from 'next';

export default withRouter(CartPage);

export const getServerSideProps: GetServerSideProps = async context => {
  try {
    return {
      props: {
        ...(await serverSideTranslations(context.locale, ['common', 'cartPage', 'orderSummary', 'cart_item_recipe'])),
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
};
