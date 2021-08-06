import React from 'react';
import classes from "./index.module.scss";
import Link from 'next/link';

const LayoutFooter = (props) => {
    return (
        <div className={classes.footer}>
            <div className={classes.footer__container}>
                <div className={classes.footer__top}>
                    <img src="/images/index/footer_logo.png" className={classes.footer__logo} alt="" />
                    <p className={classes.footer__aboutCompanyText}>
                        Make people Happy with HOME COOKED FOOD.
                        Eatchefs helps home chefs to produce, distribute
                        and promote their delicious meals🤗
                    </p>
                </div>
                <div className={classes.footer__middle}>
                    <div className={classes.footer__middleItem}>
                        <h2 className={classes.footer__titleList}>Quick Links</h2>
                        <div className={`${classes.footer__list} ${classes.footer__list_align}`}>
                            <Link href="/">
                                <a className={classes.footer__linkList}>Home</a>
                            </Link>
                            <Link href="/search">
                                <a className={classes.footer__linkList}>Recipes</a>
                            </Link>
                            <Link href="/">
                                <a className={classes.footer__linkList}>Get Inspired!</a>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h2 className={`${classes.footer__titleList} ${classes.footer__titleList__align}`}>Recipes & Menu</h2>
                        <div className={`${classes.footer__rowContainer} ${classes.footer__recipesBlock}`}>
                            <div className={`${classes.footer__list} ${classes.footer__list_margin}`}>
                                <Link href="/search?types=1">
                                    <a className={classes.footer__linkList}>Breakfast</a>
                                </Link>
                                <Link href="/search?types=2">
                                    <a className={classes.footer__linkList}>Lunch</a>
                                </Link>
                                <Link href="/search?types=3">
                                    <a className={classes.footer__linkList}>Dinner</a>
                                </Link>
                                <Link href="/search?types=6">
                                    <a className={classes.footer__linkList}>Appetizer & Snacks</a>
                                </Link>
                            </div>
                            <div className={classes.footer__list}>
                                <Link href="/search?types=5">
                                    <a className={classes.footer__linkList}>Drinks</a>
                                </Link>
                                <Link href="/search?types=4">
                                    <a className={classes.footer__linkList}>Desserts</a>
                                </Link>
                                <Link href="/search?types=7">
                                    <a className={classes.footer__linkList}>Salad</a>
                                </Link>
                                <Link href="/search?types=8">
                                    <a className={classes.footer__linkList}>Bread</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.footer__bottom}>
                    <h2 className={`${classes.footer__titleList} ${classes.footer__titleList_hidden}`}>Get Social With Us</h2>
                    <ul className={classes.footer__rowContainer}>
                        <li className={classes.footer__socialItem}><img src="/images/index/face book.svg" className={classes.footer__socialIcon}/></li>
                        <li className={classes.footer__socialItem}><img src="/images/index/pinterest.svg" className={classes.footer__socialIcon}/></li>
                        <li className={classes.footer__socialItem}><img src="/images/index/instagram.svg" className={classes.footer__socialIcon}/></li>
                        <li className={classes.footer__socialItem}><img src="/images/index/twiter.svg" className={classes.footer__socialIcon}/></li>
                    </ul>
                </div>
            </div>
            <div>
                <p className={classes.footer__termsOfUse}>
                    <Link href="/terms">
                        <a className={classes.footer__termsOfUse__link}>Terms of use </a>
                    </Link> 
                    |
                    <Link href="/privacy-policy">
                        <a className={classes.footer__termsOfUse__link}> Privacy policy</a>
                    </Link> 
                </p>
                <p className={classes.footer__copyright}>©EatChefs 2021. All right reserved</p>
            </div>
            <img src="/images/index/footer_img.png" className={classes.footer__foodImg}/>
        </div>
    );
};

export default LayoutFooter;