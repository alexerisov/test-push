import { connect } from 'react-redux';
import Recipe from '@/api/Recipe';
import Cookies from 'cookies';
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
  try {
    const weekmenu = await Recipe.getWeekmenu('');
    const translations = await serverSideTranslations(context.locale, ['common', 'homePage']);
    return {
      props: {
        ...translations,
        session: await getSession(context),
        weekmenu: weekmenu.data,
        absolutePath: context.req.headers.host
      }
    };
  } catch (e) {
    console.error(e);

    return {
      props: {
        notFound: true
      }
    };
  }
}
