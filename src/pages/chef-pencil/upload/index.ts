import { withRouter } from 'next/router';

// page component
import { ChefPencilUploadPage } from '@/components/pages/chef-pencil/upload/ChefPencilUploadPage';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default withRouter(ChefPencilUploadPage);

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'errors']))
      // Will be passed to the page component as props
    }
  };
};
