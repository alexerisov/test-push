import React from 'react';
import classes from './index.module.scss';
import { Divider } from '@/components/basic-elements/divider';
import { ReactComponent as Logo } from '../../../../public/images/Footer Logo/Line.svg';
import Link from 'next/link';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

export const Footer = () => {
  const LinkElement = props => (
    <div className={classes.link_element}>
      <Link href={props.path}>
        <a>{props.text}</a>
      </Link>
    </div>
  );

  return (
    <div className={classes.footer}>
      <div className={classes.footer_elements_wrapper}>
        <div className={classes.grid}>
          <div className={classes.logo_wrapper}>
            <Link href="/">
              <a>
                <Logo />
              </a>
            </Link>
          </div>
          <div className={classes.links_block}>
            <LinkElement text="Home" path="/" />
            <LinkElement text="Chef's Pencil" path="/chef-pencil" />
            <LinkElement text="Terms of use" path="/terms" />
            <LinkElement text="Recipes" path="/search?title=" />
            <LinkElement text="Get inspired!" path="/search?&only_eatchefs_recipes=Y" />
            <LinkElement text="Privacy policy" path="/privacy-policy" />
          </div>
          <div className={classes.social_block}>
            <div className={classes.social_title}>GET SOCIAL WITH US 🔥</div>
            <div className={classes.social_icons}>
              <a href="https://www.facebook.com/eatchefs" rel="noreferrer" target="_blank">
                <FacebookIcon style={{ color: '#FCFCFD' }} />
              </a>
              <a href="https://www.twitter.com/eatchefs" rel="noreferrer" target="_blank">
                <TwitterIcon style={{ color: '#FCFCFD' }} />
              </a>
              <a href="https://www.instagram.com/eatchefs/" rel="noreferrer" target="_blank">
                <InstagramIcon style={{ color: '#FCFCFD' }} />
              </a>
            </div>
          </div>
        </div>
        <div className={classes.copyright_wrapper}>
          <Divider m="24px 0 0" />
          <div className={classes.copyright}>©EatChefs 2021. All right reserved</div>
        </div>
      </div>
    </div>
  );
};
