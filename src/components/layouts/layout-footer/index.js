import React from 'react';
import classes from "./index.module.scss";

const LayoutFooter = (props) => {
    return (
        <div className={classes.footer}>
            <div className={classes.footer__container}>
                <div>
                    <img src="/images/index/footer_logo.png" className={classes.footer__logo} alt="" />
                    <p className={classes.footer__aboutCompanyText}>
                        Make people Happy with HOME COOKED FOOD.
                        Eatchefs helps home chefs to produce, distribute
                        and promote their delicious meals🤗
                    </p>
                </div>
                <div>
                    <h2 className={classes.footer__titleList}>Quick Links</h2>
                    <ul>
                        <li className={classes.footer__linkList}>Home</li>
                        <li className={classes.footer__linkList}>Recipes</li>
                        <li className={classes.footer__linkList}>Get Inspired!</li>
                    </ul>
                </div>
                <div>
                    <h2 className={classes.footer__titleList}>Recipes & Menu</h2>
                    <div className={classes.footer__rowContainer}>
                        <ul>
                            <li className={classes.footer__linkList}>Breakfast</li>
                            <li className={classes.footer__linkList}>Lunch</li>
                            <li className={classes.footer__linkList}>Dinner</li>
                            <li className={classes.footer__linkList}>Appetizer & Snacks</li>
                        </ul>
                        <ul>
                            <li className={classes.footer__linkList}>Drinks</li>
                            <li className={classes.footer__linkList}>Desserts</li>
                            <li className={classes.footer__linkList}>Salad</li>
                            <li className={classes.footer__linkList}>Bread</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h2 className={classes.footer__titleList}>Get Social With Us</h2>
                    <ul className={classes.footer__rowContainer}>
                        <li><img src="/images/index/face book.svg" className={classes.footer__socialIcon}/></li>
                        <li><img src="/images/index/pinterest.svg" className={classes.footer__socialIcon}/></li>
                        <li><img src="/images/index/instagram.svg" className={classes.footer__socialIcon}/></li>
                        <li><img src="/images/index/twiter.svg" className={classes.footer__socialIcon}/></li>
                    </ul>
                </div>
            </div>
            <div>
                <p className={classes.footer__termsOfUse}>Terms of use | Privacy policy</p>
                <p className={classes.footer__copyright}>©EatChefs 2021. All right reserved</p>
            </div>
            <img src="/images/index/footer_img.png" className={classes.footer__foodImg}/>
        </div>
    );
};

export default LayoutFooter;