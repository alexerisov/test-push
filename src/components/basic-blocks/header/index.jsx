import React, { useEffect, useState } from 'react';
import classes from './index.module.scss';
import { ReactComponent as Logo } from '../../../../public/images/Header Logo/Laag 1.svg';
import { ReactComponent as CartIcon } from '../../../../public/icons/Shopping Cart/Line.svg';
import { ReactComponent as MenuIcon } from '../../../../public/icons/Menu/Line.svg';
import { ReactComponent as UserIcon } from '../../../../public/icons/User/Menu.svg';
import { ReactComponent as BellIcon } from '../../../../public/icons/Bell/Menu.svg';
import { ReactComponent as ListIcon } from '../../../../public/icons/List/Menu.svg';
import { ReactComponent as MegaphoneIcon } from '../../../../public/icons/Megaphone/Menu.svg';
import { ReactComponent as HistoryIcon } from '../../../../public/icons/History/Menu.svg';
import { ReactComponent as BookmarkIcon } from '../../../../public/icons/Bookmark/Menu.svg';
import { Button, IconButton, ListItemIcon, NoSsr } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { connect, useSelector } from 'react-redux';
import styled from 'styled-components';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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
  const isChef = props?.account?.profile?.user_type === USER_TYPE.chefType;

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
      {cartItemsAmount && cartItemsAmount !== 0 ? <OrangeCircle /> : false}
    </IconButton>
  );

  const UserAvatar = () => {
    const avatar = useSelector(state => state?.account?.profile?.avatar);
    return (
      <span>
        <div className={classes.button_avatar}>
          <Avatar alt="User" src={avatar} />
          {notificationAmount && notificationAmount !== 0 ? <RedCircle /> : false}
        </div>
      </span>
    );
  };

  const BurgerButton = () => (
    <IconButton>
      <MenuIcon />
    </IconButton>
  );

  const MenuListItem = ({ icon, text, path, endIcon }) => (
    <StyledMenuItem onClick={handleClose}>
      <StyledListItemIcon>{icon}</StyledListItemIcon>
      <Link href={path}>
        <a className={classes.header__link_place_menu}>{text}</a>
      </Link>
      {endIcon && null}
    </StyledMenuItem>
  );

  const NotificationCircle = (
    <>{!notificationAmount?.length > 0 && <span className={classes.notification_circle}>{notificationAmount}</span>}</>
  );

  return (
    <div className={classes.header}>
      <div className={classes.header_elements_wrapper}>
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
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
          <StyledMenu c id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuListItem text="Account Settings" icon={<UserIcon />} path="/profile/account-settings" />
            <MenuListItem
              text="Notifications"
              icon={<BellIcon />}
              endIcon={<NotificationCircle />}
              path="/notifications"
            />
            {isChef && <MenuListItem text="My Recipes" icon={<ListIcon />} path="/my-recipes" />}
            <MenuListItem text="Market" icon={<MegaphoneIcon />} path="/search" />
            <MenuListItem text="History" icon={<HistoryIcon />} path="/my-orders" />
            <MenuListItem text="Saved Recipes" icon={<BookmarkIcon />} path="/saved-recipes" />

            <LogoutMenuItem onClick={handleClose}>
              <Link href="#">
                <a className={classes.header__link_place_menu_logout} onClick={handleLogout}>
                  Logout
                </a>
              </Link>
            </LogoutMenuItem>
          </StyledMenu>
        </div>
      </div>
    </div>
  );
};

const StyledMenu = styled(Menu)`
  margin-top: 50px;
  border-radius: 20px !important;
`;

const StyledMenuItem = styled(MenuItem)`
  width: 260px !important;
  display: flex;
  padding: 12px 12px 12px 20px !important;
`;

const LogoutMenuItem = styled(StyledMenuItem)`
  margin: 16px;
  padding: 16px;
  justify-content: center;
  border: 2px solid #e6e8ec;
  border-radius: 90px;
`;

const StyledListItemIcon = styled(ListItemIcon)`
  display: flex;
  justify-content: center;
  align-item: center;
`;

export default connect(state => ({
  account: state.account
}))(Header);
