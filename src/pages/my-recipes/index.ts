import { withRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { MyRecipesPage } from '@/components/pages/my-recipes/MyRecipesPage';

export default withRouter(MyRecipesPage);

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'searchPage']))
  }
});
