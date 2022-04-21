// types
import type { GetServerSideProps } from 'next';

import { connect } from 'react-redux';
import { RootState } from '@/store/store';
import Recipe from '@/api/Recipe';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import log from 'loglevel';
import { getSession } from 'next-auth/react';
import http from '@/utils/http';
import getInitialFilters from '@/utils/getInitialFilters';

// page component
import { SearchPage } from '@/components/pages/search/SearchPage';
import parseSearchParams from '@/utils/parseSearchParams';

export default connect((state: RootState) => ({
  token: state.account.hasToken,
  userType: state.account?.profile?.user_type
}))(SearchPage);

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);
  if (session) {
    http.defaults.headers.common['Authorization'] = `Bearer ${session?.accessToken}`;
  }
  const initialFilters = getInitialFilters(context);
  const productionRecipes = await Recipe.getRecipes(
    parseSearchParams({
      ...initialFilters,
      page: 1,
      page_size: 3,
      sale_status: 5,
      lang: context.locale
    })
  );
  const nonProductionRecipes = await Recipe.getRecipes(
    parseSearchParams({
      ...initialFilters,
      page: 1,
      page_size: 9,
      sale_status: [4, 6, 7],
      lang: context.locale
    })
  );

  const weekmenu = await Recipe.getWeekmenu(parseSearchParams({ ...initialFilters }));
  const weekmenuWithoutFilters = await Recipe.getWeekmenu();
  try {
    return {
      props: {
        ...(await serverSideTranslations(context.locale, ['common', 'searchPage', 'recipeClassifications'])),
        initialFilters: getInitialFilters(context),
        session,
        weekmenuWithoutFilters: weekmenuWithoutFilters?.data || [],
        fallback: {
          productionRecipes: productionRecipes?.data.results,
          nonProductionRecipes: nonProductionRecipes?.data.results,
          weekmenu: weekmenu?.data || []
        }
      }
    };
  } catch (e) {
    log.error('%0', e);

    return {
      props: {
        ...(await serverSideTranslations(context.locale, ['common'])),
        notFound: true
      }
    };
  }
};
