import { connect } from 'react-redux';
import log from 'loglevel';
import Recipe from '@/api/Recipe';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { RootState } from '@/store/store';
import { HomePage } from '@/components/pages/home/HomePage';
import { getSession } from 'next-auth/react';
import http from '@/utils/http';

export default connect((state: RootState) => ({
  account: state.account,
  profile: state.profile
}))(HomePage);

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    http.defaults.headers.common['Authorization'] = `Bearer ${session.accessToken}`;
  }
  try {
    const weekmenu = await Recipe.getWeekmenu();
    return {
      props: {
        ...(await serverSideTranslations(context.locale, ['common', 'homePage', 'recipeClassifications'])),
        session,
        weekmenu: weekmenu.data,
        absolutePath: context.req.headers.host
      }
    };
  } catch (e) {
    log.error('%0', e);

    return {
      props: {
        notFound: true
      }
    };
  }
}
