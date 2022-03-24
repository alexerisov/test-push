import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// page component
import { SavedRecipesPage } from '@/components/pages/saved-recipes/SavedRecipesPage';

export default SavedRecipesPage;

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
});
