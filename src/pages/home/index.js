import React from 'react';
import classes from "./index.module.scss";
import LayoutPage from '@/components/layouts/layout-page';
import MealOfWeekBlock from '@/components/blocks/meal-of-the-week';
import FavoriteCuisinesBlock from '@/components/blocks/favorite-cuisines';
import LiveVideoCardsBlock from '@/components/blocks/live-video-cards';
import HighestRatedMealsBlock from '@/components/blocks/highest-rated-meals';
import { Button } from '@material-ui/core';

const HomeLanding = () => {

  const content = <>
      <section className={classes.home}>
        <input placeholder="Search for dish name" className={classes.home__inputSearch}/>
        <div className={classes.home__titleContainer}>
          <div className={classes.home__titleTextContainer}>
            <p className={classes.home__titleText}>Hungry?</p>
            <h1 className={classes.home__title}>Homemade food</h1>
            <p className={classes.home__subtitle}>delivered doorstep</p>
          </div>
        </div>
        <Button
          variant='contained'
          className={classes.home__button}
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
  
export default HomeLanding;