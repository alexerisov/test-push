import { connect } from 'react-redux';
import { RootState } from '@/store/store';
import Recipe from '@/api/Recipe';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// page component
import { SearchPage } from '@/components/pages/search/SearchPage';

export default connect((state: RootState) => ({
  token: state.account.hasToken,
  userType: state.account?.profile?.user_type
}))(SearchPage);

export async function getServerSideProps(context) {
  try {
    const weekmenu = await Recipe.getWeekmenu('');

    return {
      props: {
        ...(await serverSideTranslations(context.locale, ['common', 'searchPage', 'recipeClassifications'])),
        weekmenuWithoutFilters: weekmenu.data
      }
    };
  } catch (e) {
    console.error(e);

    return {
      props: {
        ...(await serverSideTranslations(context.locale, ['common'])),
        notFound: true
      }
    };
  }
}
