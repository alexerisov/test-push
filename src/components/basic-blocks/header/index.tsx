import React, { useEffect, useState } from 'react';
import s from './index.module.scss';
import Logo from '~public/images/Header Logo/Line.svg';
import CartIcon from '~public/icons/Shopping Cart/Line.svg';
import MenuIcon from '~public/icons/Menu/Line.svg';
import { Button, IconButton } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { connect, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { modalActions } from '@/store/actions';
import { useRouter } from 'next/router';
import { getCart } from '@/store/cart/actions';
import Account from '@/api/Account';
import Link from 'next/link';
import { USER_TYPE } from '@/utils/datasets';
import BurgerMenu from '@/components/basic-blocks/burger-menu';
import { LoginDrawer } from '@/components/basic-blocks/drawer';
import { useTranslation } from 'next-i18next';
import LanguageSelector from '@/components/elements/language-selector';
import { RootState } from '@/store/store';

const UserAvatar = ({ clickHandler, notificationAmount, avatar }) => {
  const RedCircle = () => <div className={s.red_circle}></div>;

  return (
    <span onClick={clickHandler}>
      <div className={s.button_avatar}>
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

const RecipesButton = () => {
  const { t } = useTranslation('common');
  return (
    <Link href="/search">
      <Button variant="text" className={s.button_recipes}>
        {t('header.recipesButton')}
      </Button>
    </Link>
  );
};

const LoginButton = ({ handleClick }) => {
  const { t } = useTranslation('common');
  return (
    <Button onClick={handleClick('register')} variant="outlined" className={s.button_login}>
      {t('header.loginButton')}
    </Button>
  );
};

const UploadRecipeButton = () => {
  const { t } = useTranslation('common');
  return (
    <Link href="/recipe/upload">
      <Button variant="outlined" className={s.button_upload}>
        {t('header.uploadRecipeButton')}
      </Button>
    </Link>
  );
};

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
  const [isAuthorized, setIsAuthorized] = useState(props.account?.hasToken);

  const handleClickLogin = name => {
    return () => {
      props.dispatch(modalActions.open(name)).then(result => {
        // result when modal return promise and close
      });
    };
  };

  const router = useRouter();

  const [notificationAmount, setNotificationAmount] = useState(0);

  const cartItemsAmount = useSelector((state: RootState) => state.cart.products?.length);

  const isChef = useSelector((state: RootState) => state?.account?.profile?.user_type === USER_TYPE.chefType);

  const burgerMenuProps = { anchorEl, setAnchorEl, isExpanded, isChef, notificationAmount };

  const drawerProps = { anchorEl, setAnchorEl, isExpanded, setIsExpanded, isChef, notificationAmount };

  useEffect(() => {
    setTimeout(() => {
      setIsAuthorized(props.account?.hasToken);
      return cartItemsAmount ?? props.dispatch(getCart());
    }, 200);
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
      <IconButton className={s.button_cart}>
        <CartIcon />
        {cartItemsAmount > 0 && <div className={s.orange_circle}></div>}
      </IconButton>
    </Link>
  );

  return (
    <div className={`${s.header} ${props.shadow && s.header__shadow}`}>
      <div className={s.header_elements_wrapper}>
        <Link href="/">
          <a>
            <Logo className={s.header_logo} />
          </a>
        </Link>
        <div className={s.button_group}>
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

export default connect((state: RootState) => ({
  account: state.account
}))(Header);
