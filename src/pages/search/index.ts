import { connect } from 'react-redux';
import { RootState } from '@/store/store';
import Recipe from '@/api/Recipe';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// page component
import { SearchPage } from '@/components/pages/search/SearchPage';
import { getSession } from 'next-auth/react';
import { setBearer } from '@/utils/setBearer';
import http from '@/utils/http';

export default connect((state: RootState) => ({
  token: state.account.hasToken,
  userType: state.account?.profile?.user_type
}))(SearchPage);

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    http.defaults.headers.common['Authorization'] = `Bearer ${session?.jwt}`;
  }
  try {
    const weekmenu = await Recipe.getWeekmenu('');
    return {
      props: {
        session,
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
