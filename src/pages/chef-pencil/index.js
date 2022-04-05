import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// page component
import { ChefPencilsListPage } from '@/components/pages/chef-pencil/ChefPencilsListPage';

export default ChefPencilsListPage;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'errors']))
      // Will be passed to the page component as props
    }
  };
}
