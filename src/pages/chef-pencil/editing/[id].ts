import { connect } from 'react-redux';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// page component
import { ChefPencilEditPage } from '@/components/pages/chef-pencil/editing/[id]';

export default connect()(ChefPencilEditPage);

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
});
