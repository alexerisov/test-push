// types
import type { GetServerSideProps } from 'next';

import { connect } from 'react-redux';
import { RootState } from '@/store/store';
import Recipe from '@/api/Recipe';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import log from 'loglevel';

// page component
import { SearchPage } from '@/components/pages/search/SearchPage';
import { getSession } from 'next-auth/react';
import http from '@/utils/http';
import getInitialFilters from '@/utils/getInitialFilters';

export default connect((state: RootState) => ({
  token: state.account.hasToken,
  userType: state.account?.profile?.user_type
}))(SearchPage);

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);
  if (session) {
    http.defaults.headers.common['Authorization'] = `Bearer ${session?.accessToken}`;
  }
  console.log('context', context);
  try {
    const weekmenu = await Recipe.getWeekmenu('');

    return {
      props: {
        ...(await serverSideTranslations(context.locale, ['common', 'searchPage', 'recipeClassifications'])),
        initialFilters: getInitialFilters(context),
        session,
        weekmenuWithoutFilters: weekmenu?.data || []
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
