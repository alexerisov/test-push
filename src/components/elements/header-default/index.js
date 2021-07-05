import React from 'react';
import classes from "./index.module.scss";
import Link from "next/link";
import { modalActions } from '@/store/actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const HeaderDefault = (props) => {

  const handleClickLogin = (name) => {
    return () => {
      props.dispatch(
        modalActions.open(name),
      ).then(result => {
        // result when modal return promise and close
      });
    };
  }

    return (
      <div className={classes.header}>
        <div className={classes.header__phone}>Customer support: 1800 234 356 79</div>
        <div className={classes.header__container}>
          <Link href="/home">
            <a>
              <img src="/images/index/logo.png" className={classes.header__logo} alt="" />
            </a>
          </Link>
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
          <button className={classes.header__button} onClick={handleClickLogin('register')}>Login</button>
        </div>
      </div>
    );
  };
  
export default connect((state) => ({
  account: state.account,
}))(HeaderDefault);