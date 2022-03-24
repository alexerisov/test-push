import { withRedirectTo404ForHidePage } from '@/utils/withHidePage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// page component
import { MenuPage } from '@/components/pages/menu/MenuPage';

export default withRedirectTo404ForHidePage(MenuPage, true);

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
      // Will be passed to the page component as props
    }
  };
}
