import { connect } from 'react-redux';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// page component
import { ChefPencilEditPage } from '@/components/pages/chef-pencil/editing/[id]';
import { GetServerSideProps } from 'next';

export default connect()(ChefPencilEditPage);

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'errors']))
  }
});
