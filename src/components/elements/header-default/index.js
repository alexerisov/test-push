import React from 'react';
import classes from "./index.module.scss";
import Link from "next/link";
import { modalActions } from '@/store/actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';

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

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const StyledMenu = styled(Menu)`
      margin: 40px 0 0 0;
  `;

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
        {props.account.hasToken
        ? <button className={classes.header__button} onClick={handleClickLogin('register')}>Login</button>
        : <>
          <button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.header__button}>
            Hi, luzer
          </button>
          <StyledMenu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link href="/profile/account-settings">
                <a className={classes.header__link}>My Profile</a>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link href="/home">
                <a className={classes.header__link}>Saved Recipes</a>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link href="/home">
                <a className={classes.header__link}>History</a>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link href="/home">
                <a className={classes.header__link}>Logout</a>
              </Link>
            </MenuItem>
          </StyledMenu>
        </>
        }
      </div>
    </div>
  );
};
  
export default connect((state) => ({
  account: state.account,
}))(HeaderDefault);