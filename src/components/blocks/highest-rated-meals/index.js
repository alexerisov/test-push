import React from 'react';
import classes from "./index.module.scss";
import CardHighestMeals from "@/components/elements/card-highest-meals";

const HighestRatedMealsBlock = () => {
    return (
      <section className={classes.ratedMeals}>
        <div className={classes.ratedMeals__title}>
          <h2>Our top highest rated meals</h2>
          <span className={classes.ratedMeals__yellowLine} />
        </div>
        <div className={classes.container}>
          <CardHighestMeals />
          <CardHighestMeals />
          <CardHighestMeals />
        </div>
      </section>
    );
  };
  
export default HighestRatedMealsBlock;