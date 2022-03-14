import React from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import classes from './index.module.scss';
import LayoutPage from '@/components/layouts/layout-page';
import { connect, useSelector } from 'react-redux';
import { modalActions, profileActions } from '@/store/actions';
import Recipe from '@/api/Recipe';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'cookies';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { WhyEatchefBlock } from '@/components/blocks/home-page/why-eatchef';
import { SearchBlock } from '@/components/blocks/home-page/search';
import { WeekMenuBlock } from '@/components/blocks/home-page/week-menu';
import LayoutPageNew from '@/components/layouts/layout-page-new';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { i18n } from 'next-i18next';
import { LANGUAGES } from '@/utils/datasets';

const useStyles = makeStyles({
  root: {
    '@media (max-width:576px)': {
      width: '160px !important',
      height: '32px !important',
      fontSize: '12px',
      lineHeight: '14.6px',
      fontWeight: '600',
      padding: 0
    }
  }
});

const Home = props => {
  const router = useRouter();
  const USER_TYPE = {
    viewerType: 0,
    chefType: 1
  };
  const btnStyles = useStyles(props);
  const chefType = USER_TYPE.chefType;
  const viewerType = USER_TYPE.viewerType;
  const [meal, setMeal] = React.useState(null);
  const [weekmenu, setWeekmenu] = React.useState(null);
  const isAuthorized = useSelector(state => state?.account?.hasToken);
  const mobile = useMediaQuery('(max-width: 768px)');

  React.useEffect(() => {
    setMeal(props?.mealOfTheWeek);
    setWeekmenu(props?.weekmenu);
  }, []);

  React.useEffect(() => {
    props.dispatch(profileActions.init(props.account.profile));
    for (let key in LANGUAGES) {
      if (isAuthorized) {
        if (props.account.profile?.language === LANGUAGES[key]) {
          router.locale = key;
        }
      } else {
        var userLang = navigator.language || navigator.userLanguage;
        if (userLang === LANGUAGES[key]) {
          router.locale = key;
        }
      }
    }
    router.push(router.asPath, undefined, { locale: router.locale });
  }, [props.account.profile]);

  const handleChangeStatus = () => {
    if (props?.profile?.data?.user_type === viewerType) {
      router.push('/profile/become-home-chef');
    } else {
      props.dispatch(modalActions.open('register'));
    }
  };

  const content = (
    <>
      <SearchBlock />
      <WeekMenuBlock data={props?.weekmenu} />
      <WhyEatchefBlock />
    </>
  );

  return (
    <div>
      <NextSeo
        title="Homemade food"
        openGraph={{
          url: `${props?.absolutePath}`,
          title: 'Homemade food'
        }}
      />
      <LayoutPageNew content={content} />
    </div>
  );
};

export default connect(state => ({
  account: state.account,
  profile: state.profile
}))(Home);

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
