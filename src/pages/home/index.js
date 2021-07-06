import React from 'react';
import classes from "./index.module.scss";
import LayoutPage from '@/components/layouts/layout-page';
import MealOfWeekBlock from '@/components/blocks/meal-of-the-week';
import FavoriteCuisinesBlock from '@/components/blocks/favorite-cuisines';
import LiveVideoCardsBlock from '@/components/blocks/live-video-cards';
import HighestRatedMealsBlock from '@/components/blocks/highest-rated-meals';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { modalActions } from '@/store/actions';

const HomeLanding = (props) => {

  const handleClickLogin = (name) => {
    return () => {
      props.dispatch(
        modalActions.open(name),
      ).then(result => {
        // result when modal return promise and close
      });
    };
  }

  const content = <>
      <section className={classes.home}>
        <button className={classes.home__inputSearch} onClick={handleClickLogin('search')}>
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
        <Button
          variant='contained'
          color='primary'
          href={`/`}
        >
          Become a home chef
        </Button>
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
      <LiveVideoCardsBlock />
      <HighestRatedMealsBlock />
      <MealOfWeekBlock />
      <FavoriteCuisinesBlock />
    </>;

  return (
    <LayoutPage content={content} />
  );
};

export default connect()(HomeLanding);