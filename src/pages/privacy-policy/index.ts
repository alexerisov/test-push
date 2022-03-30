import { connect } from 'react-redux';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// page component
import { PrivacyPolicy } from '@/components/pages/privacy-policy/PrivacyPolicyPage';

export default connect()(PrivacyPolicy);

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'privacyPolicy']))
  }
});
