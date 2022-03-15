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
import { useTranslation, i18n } from 'next-i18next';
import LanguageSelector from '@/components/elements/language-selector';

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

const RecipesButton = () => (
  <Link href="/search">
    <Button variant="text" className={classes.button_recipes}>
      {i18n.t('header.recipesButton')}
    </Button>
  </Link>
);

const LoginButton = ({ handleClick }) => (
  <Button onClick={handleClick('register')} variant="outlined" className={classes.button_login}>
    {i18n.t('header.loginButton')}
  </Button>
);

const UploadRecipeButton = () => (
  <Link href="/recipe/upload">
    <Button variant="outlined" className={classes.button_upload}>
      {i18n.t('header.uploadRecipeButton')}
    </Button>
  </Link>
);

const Header = props => {
  const { t } = useTranslation('common');
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
  const isAuthorized = useSelector(state => state.account?.hasToken);

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

  const isChef = useSelector(state => state?.account?.profile?.user_type === USER_TYPE.chefType);

  const burgerMenuProps = { anchorEl, setAnchorEl, isExpanded, isChef, notificationAmount };

  const drawerProps = { anchorEl, setAnchorEl, isExpanded, setIsExpanded, isChef, notificationAmount };

  useEffect(() => {
    console.log('auth', isAuthorized);
    return cartItemsAmount ?? props.dispatch(getCart());
  }, [props.account.hasToken]);

  useEffect(() => {
    if (props.account.hasToken) {
      Account.getNotifications()
        .then(res => setNotificationAmount(res.data.length))
        .catch(e => setNotificationAmount(null));
    }
  }, [props.account.hasToken]);

  const openMenuHandler = event => {
    setAnchorEl(event.target);
    // event.stopPropagation();
    setIsExpanded(true);
  };

  const CartButton = cartItemsAmount => (
    <Link href="/cart">
      <IconButton className={classes.button_cart}>
        <CartIcon />
        {cartItemsAmount > 0 && <div className={classes.orange_circle}></div>}
      </IconButton>
    </Link>
  );

  return (
    <div className={`${classes.header} ${props.shadow && classes.header__shadow}`}>
      <div className={classes.header_elements_wrapper}>
        <Link href="/">
          <a>
            <img className={classes.header_logo} src={logo} alt="Eatchef Header Logo" />
          </a>
        </Link>
        <div className={classes.button_group}>
          <RecipesButton />
          {!isAuthorized && !isMobile && <LoginButton handleClick={handleClickLogin} />}
          {isAuthorized && isChef && <UploadRecipeButton />}
          {isAuthorized && <CartButton cartItemsAmount={cartItemsAmount} />}
          {isAuthorized && (
            <UserAvatar clickHandler={openMenuHandler} avatar={avatar} notificationAmount={notificationAmount} />
          )}

          {isMobile && <BurgerButton clickHandler={openMenuHandler} />}
          <LanguageSelector />
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
