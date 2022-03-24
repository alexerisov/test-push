import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// page component
import { SavedPencilsPage } from '@/components/pages/saved-pencils/SavedPencilsPage';

export default SavedPencilsPage;

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
});
