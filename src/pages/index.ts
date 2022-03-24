import { connect } from 'react-redux';
import Recipe from '@/api/Recipe';
import Cookies from 'cookies';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { RootState } from '@/store/store';
import { HomePage } from '@/components/pages/home/HomePage';

export default connect((state: RootState) => ({
  account: state.account,
  profile: state.profile
}))(HomePage);

export async function getServerSideProps(context) {
  const cookies = new Cookies(context.req, context.res);
  const targetCookies = cookies.get('aucr');
  const token = !targetCookies ? undefined : decodeURIComponent(cookies.get('aucr'));

  try {
    const response = await Recipe.getMealOfWeek(token);
    const banners = await Recipe.getHomepageCarouselItems();
    const weekmenu = await Recipe.getWeekmenu('');
    const mealOfWeekBlock = response?.data?.length ? response?.data?.[0] : null;

    return {
      props: {
        ...(await serverSideTranslations(context.locale, ['common', 'homePage'])),
        mealOfTheWeek: mealOfWeekBlock,
        carouselItems: banners.data,
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
