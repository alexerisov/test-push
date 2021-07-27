import React from 'react';
import classes from "./index.module.scss";
import Link from "next/link";
import { modalActions, accountActions } from '@/store/actions';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';
import { NoSsr } from '@material-ui/core';
import { useRouter } from 'next/router';

const StyledMenu = styled(Menu)`
  margin: 40px 0 0 0;

  li {
    padding: 0;
  }
`;

const HeaderDefault = (props) => {

  const viewerType = 0;
  const chefType = 1;

  const handleClickLogin = (name) => {
    return () => {
      props.dispatch(
        modalActions.open(name),
      ).then(result => {
        // result when modal return promise and close
      });
    };
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const router = useRouter();
  const handleLogout = () => {
    props.dispatch(accountActions.logout());
    router.push('/');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.header}>
      <div className={classes.header__phone}>Customer support: 1800 234 356 79</div>
      <div className={classes.header__container}>
        <Link href="/">
          <a>
            <img src="/images/index/logo.png" className={classes.header__logo} alt="" />
          </a>
        </Link>
        <nav className={classes.header__links}>
          <Link href="/search?title=">
            <a className={classes.header__link}>Recipes</a>
          </Link>
          <Link href="/">
            <a className={classes.header__link}>Get Inspired!</a>
          </Link>
          <Link href="/">
            <a className={classes.header__link}>Menu</a>
          </Link>
        </nav>
        <NoSsr>
        {!props.account.hasToken
          ? <button className={classes.header__button} onClick={handleClickLogin('register')}>Login</button>
          : <>
          <button onClick={handleClick} className={classes.header__button}>
            {props?.account?.profile?.user_type === viewerType
              ? `Hi, ${props?.account?.profile?.full_name.split(' ')[0]}!`
              : `Hi, ${props?.account?.profile?.full_name.split(' ')[0]}!`
            }
          </button>
          <StyledMenu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link href="/profile/account-settings">
                <a className={classes.header__link_place_menu}>My Profile</a>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link href={props?.account?.profile?.user_type === viewerType ? "/" : "/my-uploads"}>
                <a className={classes.header__link_place_menu}>
                  {props?.account?.profile?.user_type === viewerType ? "Saved Recipes" : "Uploads" }
                </a>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link href="/">
                <a className={classes.header__link_place_menu}>
                  {props?.account?.profile?.user_type === viewerType ? "History" : "My videos" }
                </a>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link href="#">
                <a className={classes.header__link_place_menu} onClick={handleLogout}>Logout</a>
              </Link>
            </MenuItem>
          </StyledMenu>
          </>
        }
        </NoSsr>
      </div>
    </div>
  );
};
  
export default connect((state) => ({
  account: state.account,
}))(HeaderDefault);