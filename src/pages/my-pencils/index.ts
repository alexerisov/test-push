import { withRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// page component
import { MyPencilsPage } from '@/components/pages/my-pencils/MyPencilsPage';

export default withRouter(MyPencilsPage);

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
});
