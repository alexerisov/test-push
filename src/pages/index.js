import React from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import classes from "./index.module.scss";
import LayoutPage from '@/components/layouts/layout-page';
import MealOfWeekBlock from '@/components/blocks/meal-of-the-week';
import FavoriteCuisinesBlock from '@/components/blocks/favorite-cuisines';
import PinnedMeals from '@/components/blocks/pinned-meals';
import HighestRatedMealsBlock from '@/components/blocks/highest-rated-meals';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { modalActions, profileActions, accountActions } from '@/store/actions';
import Recipe from '@/api/Recipe';

const Home = (props) => {
  const router = useRouter();
  const USER_TYPE = {
    viewerType: 0,
    chefType: 1
  };

  const chefType = USER_TYPE.chefType;
  const viewerType = USER_TYPE.viewerType;

  React.useEffect(() => {
    Recipe.getTopRatedMeals()
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
  }, []);

  React.useEffect(() => {
    props.dispatch(profileActions.init(props.account.profile));
  }, [props.account.profile]);

  const handleChangeStatus = () => {
    if (props?.profile?.data?.user_type === viewerType) {
      return router.push('/profile/account-settings');
    } else {
      props.dispatch(modalActions.open('register'));
    }
  };

  const handleClickSearch = (name) => {
    return () => {
      props.dispatch(
        modalActions.open(name),
      ).then(result => {
        // result when modal return promise and close
      });
    };
  };

  const content = <>
    <section className={classes.home}>
      <button className={classes.home__inputSearch} onClick={handleClickSearch('search')}>
        <img src="/images/index/icon_search.svg" className={classes.home__iconSearch}/>
        Search for dish name
      </button>
      <div className={classes.home__titleContainer}>
        <div className={classes.home__titleTextContainer}>
          <p className={classes.home__titleText}>Hungry?</p>
          <h1 className={classes.home__title}>Homemade food</h1>
          <p className={classes.home__subtitle}>delivered doorstep</p>
        </div>
      </div>
      {
        props?.profile?.data?.user_type === chefType
        ? <Button
            variant='contained'
            color='primary'
            href="/recipe/upload"
          >
            Upload your recipe
          </Button>
        : <Button
            variant='contained'
            color='primary'
            onClick={handleChangeStatus}
          >
            Become a home chef
          </Button>
      }
      <div className={classes.home__slide}>
        <button className={classes.home__slideButton}>&#5176;</button>
        <button className={classes.home__slideButton}>&#5171;</button>
      </div>
      <img src="/images/index/mint.png" className={classes.imgMint1}/>
      <img src="/images/index/mint.png" className={classes.imgMint2}/>
      <img src="/images/index/broccoli.png" className={classes.imgBroccoli}/>
      <img src="/images/index/carrot.png" className={classes.imgCarrot}/>
      <img src="/images/index/banner.png" className={classes.imgBanner}/>
    </section>
    <PinnedMeals />
    <HighestRatedMealsBlock />
    <MealOfWeekBlock />
    <FavoriteCuisinesBlock />
  </>;


  return (
    <div>
      <NextSeo
        title="EatChef"
        description="EatChef"
        canonical="https://www.canonicalurl.ie/"
        openGraph={{
          url: 'https://www.canonicalurl.ie/',
          title: 'Open Graph Title',
          description: 'Open Graph Description',
          images: [
            {
              url: 'https://www.example.ie/og-image-01.jpg',
              width: 800,
              height: 600,
              alt: 'Og Image Alt',
            },
            {
              url: 'https://www.example.ie/og-image-02.jpg',
              width: 900,
              height: 800,
              alt: 'Og Image Alt Second',
            },
            { url: 'https://www.example.ie/og-image-03.jpg' },
            { url: 'https://www.example.ie/og-image-04.jpg' },
          ],
        }}
      />
      <LayoutPage content={content} />
    </div>
  );
};

export default connect((state) => ({
  account: state.account,
  profile: state.profile,
}))(Home);
