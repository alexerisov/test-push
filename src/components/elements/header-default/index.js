import React from 'react';
import classes from "./index.module.scss";
import Link from "next/link";

const HeaderDefault = () => {
    return (
      <div className={classes.header}>
        <div className={classes.header__phone}>Customer support: 1800 234 356 79</div>
        <div className={classes.header__container}>
          <img src="/images/index/logo.png" className={classes.header__logo} alt="" />
          <nav className={classes.header__links}>
            <Link href="/home">
              <a className={classes.header__link}>Recipes</a>
            </Link>
            <Link href="/home">
              <a className={classes.header__link}>Videos</a>
            </Link>
            <Link href="/home">
              <a className={classes.header__link}>Menu</a>
            </Link>
          </nav>
          <button className={classes.header__button}>Login</button>
        </div>
      </div>
    );
  };
  
export default HeaderDefault;