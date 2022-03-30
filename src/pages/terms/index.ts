import React from 'react';
import { connect } from 'react-redux';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// page component
import { TermsPage } from '@/components/pages/terms/TermsPage';

export default connect()(TermsPage);

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'termsOfUse']))
      // Will be passed to the page component as props
    }
  };
}
