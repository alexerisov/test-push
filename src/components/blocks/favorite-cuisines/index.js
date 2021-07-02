import React from 'react';
import classes from "./index.module.scss";
import CardFavoriteCuisines from "@/components/elements/card-favorite-cuisines";

const FavoriteCuisinesBlock = () => {
    return (
      <section className={classes.cuisines}>
        <div className={classes.cuisines__title}>
          <h2>Your favorite cuisines</h2>
          <span className={classes.cuisines__yellowLine} />
        </div>
        <div className={classes.cuisines__menu}>
          <ul className={classes.cuisines__links}>
            <li>Indian</li>
            <li>Indonesian</li>
            <li>Turkish</li>
            <li>Thai</li>
            <li>Spanish</li>
            <li>Moroccan</li>
            <li>Japanese</li>
          </ul>
          <button className={classes.cuisines__slideButton}><img className={classes.cuisines__slideLeft} src="/images/index/slider-gray.svg"/></button>
          <button className={classes.cuisines__slideButton}><img className={classes.cuisines__slideRight} src="/images/index/slider-yellow.svg"/></button>
        </div>
        <div className={classes.container}>
          <CardFavoriteCuisines />
          <CardFavoriteCuisines />
          <CardFavoriteCuisines />
        </div>
      </section>
    );
  };
  
export default FavoriteCuisinesBlock;