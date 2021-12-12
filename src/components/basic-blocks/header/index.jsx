import React, { useEffect, useState } from 'react';
import classes from './index.module.scss';
import { ReactComponent as Logo } from '../../../../public/images/Header Logo/Laag 1.svg';
import { ReactComponent as CartIcon } from '../../../../public/icons/Shopping Cart/Line.svg';
import { ReactComponent as MenuIcon } from '../../../../public/icons/Menu/Line.svg';
import { Button, IconButton, NoSsr } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { connect, useSelector } from 'react-redux';
import styled from 'styled-components';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { accountActions, modalActions } from '@/store/actions';
import { useRouter } from 'next/router';
import { getCart } from '@/store/cart/actions';
import Account from '@/api/Account';
import Link from 'next/link';
import { USER_TYPE } from '@/utils/datasets';
const Header = props => {
  const useSeparatorStyles = makeStyles({
    root: {
      borderBottom: '2px solid #f8f8f8'
    }
  });

  const mobile = useMediaQuery('(max-width: 768px)');
  const [isExpanded, setExpanded] = React.useState(false);
  const separatorStyles = useSeparatorStyles();

  const handleClickLogin = name => {
    return () => {
      props.dispatch(modalActions.open(name)).then(result => {
        // result when modal return promise and close
      });
    };
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
    console.log(event.target);
  };

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isExpanded]);

  const router = useRouter();
  const handleLogout = () => {
    props.dispatch(accountActions.logout());
    router.push('/');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [notificationAmount, setNotificationAmount] = useState(null);
  const cartItemsAmount = useSelector(state => state.cart.products?.length);

  useEffect(() => {
    return cartItemsAmount ?? props.dispatch(getCart());
  }, []);

  useEffect(() => {
    if (props.account.hasToken) {
      Account.getNotifications().then(res => setNotificationAmount(res.data.length));
    }
  }, [props.account.hasToken]);

  const isAuthorized = props.account.hasToken;

  const OrangeCircle = () => <div className={classes.orange_circle}></div>;

  const RedCircle = () => <div className={classes.red_circle}></div>;

  const RecipesButton = () => (
    <Button variant="text" href="/search?title=" className={classes.button_recipes}>
      Recipes
    </Button>
  );

  const LoginButton = () => (
    <Button onClick={handleClickLogin('register')} variant="outlined" className={classes.button_login}>
      Login
    </Button>
  );

  const UploadRecipeButton = () => (
    <Button variant="outlined" href="/recipe/upload" className={classes.button_upload}>
      Upload Recipe
    </Button>
  );

  const CartButton = () => (
    <IconButton href="/cart" className={classes.button_cart}>
      <CartIcon />
      {cartItemsAmount?.length > 0 && <OrangeCircle />}
    </IconButton>
  );

  const UserAvatar = () => (
    <span>
      <span className={classes.button_avatar}>
        <Avatar alt="User" src="/public/icons/User/Line.svg" />
        {notificationAmount?.length > 0 && <RedCircle />}
      </span>
    </span>
  );

  const BurgerButton = () => (
    <IconButton>
      <MenuIcon />
    </IconButton>
  );

  return (
    <div className={classes.header}>
      <div className={classes.header_elements_wrapper}>
        <Logo />
        <div className={classes.button_group}>
          <RecipesButton />
          {!isAuthorized && <LoginButton />}
          {isAuthorized && <UploadRecipeButton />}
          {isAuthorized && <CartButton />}
          {isAuthorized && (
            <span onClick={handleClick}>
              <UserAvatar />
            </span>
          )}
          {isAuthorized && (
            <span className={classes.button_burger} onClick={handleClick}>
              <BurgerButton />
            </span>
          )}
          <StyledMenu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            {props?.account?.profile?.user_type === USER_TYPE.chefType && (
              <MenuItem onClick={handleClose}>
                <Link href="/my-recipes">
                  <a className={classes.header__link_place_menu}>My Recipes</a>
                </Link>
              </MenuItem>
            )}

            {props?.account?.profile?.user_type === USER_TYPE.chefType && (
              <MenuItem onClick={handleClose} classes={{ root: separatorStyles.root }}>
                <Link href="/my-pencils">
                  <a className={classes.header__link_place_menu}>My Pencils</a>
                </Link>
              </MenuItem>
            )}
            <MenuItem onClick={handleClose}>
              <Link href="/saved-recipes">
                <a className={classes.header__link_place_menu}>Saved Recipes</a>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose} classes={{ root: separatorStyles.root }}>
              <Link href="/saved-pencils">
                <a className={classes.header__link_place_menu}>Saved Pencils</a>
              </Link>
            </MenuItem>
            {/*{props?.account?.profile?.user_type === USER_TYPE.viewerType && (
                <MenuItem onClick={handleClose}>
                  <Link href="/">
                    <a className={classes.header__link_place_menu}>History</a>
                  </Link>
                </MenuItem>
              )}*/}
            <MenuItem onClick={handleClose}>
              <Link href="/profile/account-settings">
                <a className={classes.header__link_place_menu}>My Profile</a>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link href="#">
                <a className={classes.header__link_place_menu} onClick={handleLogout}>
                  Logout
                </a>
              </Link>
            </MenuItem>
          </StyledMenu>
        </div>
      </div>
    </div>
  );
};

import MenuItem from '@material-ui/core/MenuItem';

const StyledMenu = styled(Menu)`
  margin: 40px 0 0 0;
  li {
    padding: 0;
  }
`;

export default connect(state => ({
  account: state.account
}))(Header);
