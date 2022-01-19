import React from 'react';
import classes from './index.module.scss';
import Link from 'next/link';

const LayoutFooter = props => {
  return (
    <div className={classes.footer}>
      <div className={classes.footer__container}>
        <div className={classes.footer__logoContainer}>
          <img src="/images/index/footer_logo.png" className={classes.footer__logo} alt="" />
          <p className={classes.footer__aboutCompanyText}>
            Platform for Home Chefs to promote their food creations and for consumers to get inspired for a good meal
          </p>
        </div>
        <div className={classes.footer__middle}>
          <div className={classes.footer__middleItem}>
            <h2 className={classes.footer__titleList}>Quick Links</h2>
            <div className={`${classes.footer__list} ${classes.footer__list_align}`}>
              <Link href="/">
                <a className={classes.footer__linkList}>Home</a>
              </Link>
              <Link href="/search?title=">
                <a className={classes.footer__linkList}>Recipes</a>
              </Link>
              <Link href="/search?&only_eatchefs_recipes=Y">
                <a className={classes.footer__linkList}>Get Inspired!</a>
              </Link>
            </div>
          </div>
          <div>
            <h2 className={`${classes.footer__titleList} ${classes.footer__titleList__align}`}>Recipes & Menu</h2>
            <div className={`${classes.footer__rowContainer} ${classes.footer__recipesBlock}`}>
              <div className={`${classes.footer__list} ${classes.footer__list_margin}`}>
                <Link href="/search?types=5">
                  <a className={classes.footer__linkList}>Drinks</a>
                </Link>
                <Link href="/search?types=2">
                  <a className={classes.footer__linkList}>Lunch</a>
                </Link>
                <Link href="/search?types=3">
                  <a className={classes.footer__linkList}>Dinner</a>
                </Link>
                <Link href="/search?types=1">
                  <a className={classes.footer__linkList}>Breakfast</a>
                </Link>
              </div>
              <div className={classes.footer__list}>
                <Link href="/search?types=7">
                  <a className={`${classes.footer__linkList} ${classes.footer__linkList_marginRightNull}`}>Salad</a>
                </Link>
                <Link href="/search?types=8">
                  <a className={`${classes.footer__linkList} ${classes.footer__linkList_marginRightNull}`}>Bread</a>
                </Link>
                <Link href="/search?types=4">
                  <a className={`${classes.footer__linkList} ${classes.footer__linkList_marginRightNull}`}>Desserts</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.footer__bottom}>
          <h2 className={classes.footer__titleList}>Get Social With Us</h2>
          <ul className={classes.footer__rowContainer}>
            <li className={classes.footer__socialItem}>
              <a href="https://www.facebook.com/eatchefs" target="_blank">
                <img src="/images/index/facebook-block-icon.png" className={classes.footer__socialIcon} />
              </a>
            </li>
            <li className={classes.footer__socialItem}>
              <a href="https://www.instagram.com/eatchefs/" target="_blank">
                <img src="/images/index/insta-icon-block.png" className={classes.footer__socialIcon} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={classes.footer__termsContainer}>
        <p className={classes.footer__copyright}>©EatChefs 2021. All right reserved</p>
        <p className={classes.footer__termsOfUse}>
          <Link href="/terms">
            <a className={classes.footer__termsOfUse__link}>Terms of use </a>
          </Link>
          |
          <Link href="/privacy-policy">
            <a className={classes.footer__termsOfUse__link}> Privacy policy</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LayoutFooter;
