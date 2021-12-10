import React from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import classes from './index.module.scss';
import LayoutPage from '@/components/layouts/layout-page';
import MealOfWeekBlock from '@/components/blocks/meal-of-the-week';
import FavoriteCuisinesBlock from '@/components/blocks/favorite-cuisines';
import PinnedMeals from '@/components/blocks/pinned-meals';
import HighestRatedMealsBlock from '@/components/blocks/highest-rated-meals';
import BlocksHomePage from '@/components/blocks/blocks-home-page';
import Carousel from '@/components/elements/carusel';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { modalActions, profileActions } from '@/store/actions';
import Recipe from '@/api/Recipe';
import { getBaseUrl } from '@/utils/isTypeOfWindow';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';
import Cookies from 'cookies';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { WhyEatchefBlock } from '@/components/blocks/home-page/why-eatchef';
import { SearchBlock } from '@/components/blocks/home-page/search';
import { WeekMenuBlock } from '@/components/blocks/home-page/week-menu';

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
  const mobile = useMediaQuery('(max-width: 768px)');

  React.useEffect(() => {
    setMeal(props?.mealOfTheWeek);
  }, []);

  React.useEffect(() => {
    props.dispatch(profileActions.init(props.account.profile));
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
      <WeekMenuBlock />
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
      <LayoutPage content={content} />
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

    const mealOfWeekBlock = response?.data?.length ? response?.data?.[0] : null;

    return {
      props: {
        mealOfTheWeek: mealOfWeekBlock,
        carouselItems: banners.data,
        absolutePath: context.req.headers.host
      }
    };
  } catch (e) {
    console.error(e);
  }
}
