import { connect } from 'react-redux';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// page component
import { EmailConfirmPage } from '@/components/pages/confirm/email/EmailConfirmPage';
import { GetServerSideProps } from 'next';

export default connect()(EmailConfirmPage);

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
      // Will be passed to the page component as props
    }
  };
};
