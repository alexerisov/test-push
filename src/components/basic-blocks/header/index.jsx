import React, { useEffect, useState } from 'react';
import classes from './index.module.scss';
import logo from '../../../../public/images/Header Logo/Line.svg';
import { ReactComponent as CartIcon } from '../../../../public/icons/Shopping Cart/Line.svg';
import { ReactComponent as MenuIcon } from '../../../../public/icons/Menu/Line.svg';
import { Button, IconButton, ListItemIcon, NoSsr, SvgIcon } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { connect, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { accountActions, modalActions } from '@/store/actions';
import { useRouter } from 'next/router';
import { getCart } from '@/store/cart/actions';
import Account from '@/api/Account';
import Link from 'next/link';
import { USER_TYPE } from '@/utils/datasets';
import BurgerMenu from '@/components/basic-blocks/burger-menu';
import { LoginDrawer } from '@/components/basic-blocks/drawer';

const UserAvatar = ({ clickHandler, notificationAmount, avatar }) => {
  const RedCircle = () => <div className={classes.red_circle}></div>;

  return (
    <span onClick={clickHandler}>
      <div className={classes.button_avatar}>
        <Avatar src={avatar} />
        {notificationAmount > 0 && <RedCircle />}
      </div>
    </span>
  );
};

const BurgerButton = ({ clickHandler }) => (
  <IconButton onClick={clickHandler}>
    <MenuIcon />
  </IconButton>
);

const Header = props => {
  const useSeparatorStyles = makeStyles({
    root: {
      borderBottom: '2px solid #f8f8f8'
    }
  });

  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isExpanded, setIsExpanded] = React.useState(false);
  const separatorStyles = useSeparatorStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const avatar = props?.account?.profile?.avatar;

  const handleClickLogin = name => {
    return () => {
      props.dispatch(modalActions.open(name)).then(result => {
        // result when modal return promise and close
      });
    };
  };

  const router = useRouter();

  const [notificationAmount, setNotificationAmount] = useState(0);

  const cartItemsAmount = useSelector(state => state.cart.products?.length);

  const isAuthorized = useSelector(state => state?.account?.hasToken);
  const isChef = useSelector(state => state?.account?.profile?.user_type === USER_TYPE.chefType);

  const burgerMenuProps = { anchorEl, setAnchorEl, isExpanded, isChef, notificationAmount };

  const drawerProps = { anchorEl, setAnchorEl, isExpanded, setIsExpanded, isChef, notificationAmount };

  useEffect(() => {
    return cartItemsAmount ?? props.dispatch(getCart());
  }, [props.account.hasToken]);

  useEffect(() => {
    if (props.account.hasToken) {
      Account.getNotifications()
        .then(res => setNotificationAmount(res.data.length))
        .catch(e => setNotificationAmount(null));
    }
  }, [props.account.hasToken]);

  const OrangeCircle = () => <div className={classes.orange_circle}></div>;

  const RecipesButton = () => (
    <Button variant="text" href="/search" className={classes.button_recipes}>
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
      {cartItemsAmount > 0 && <OrangeCircle />}
    </IconButton>
  );

  const openMenuHandler = event => {
    setAnchorEl(event.target);
    // event.stopPropagation();
    setIsExpanded(true);
  };

  return (
    <div className={classes.header}>
      <div className={classes.header_elements_wrapper}>
        <Link href="/">
          <a>
            <img className={classes.header_logo} src={logo} alt="Eatchef Header Logo" />
          </a>
        </Link>
        <div className={classes.button_group}>
          <RecipesButton />
          {!isAuthorized && !isMobile && <LoginButton />}
          {isAuthorized && isChef && <UploadRecipeButton />}
          {isAuthorized && <CartButton />}
          {isAuthorized && (
            <UserAvatar clickHandler={openMenuHandler} avatar={avatar} notificationAmount={notificationAmount} />
          )}

          {isMobile && <BurgerButton clickHandler={openMenuHandler} />}
        </div>
      </div>
      {isAuthorized && <BurgerMenu {...burgerMenuProps} />}
      {!isAuthorized && isMobile && <LoginDrawer {...drawerProps} />}
    </div>
  );
};

export default connect(state => ({
  account: state.account
}))(Header);
