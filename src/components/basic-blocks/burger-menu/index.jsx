import React, { useEffect } from 'react';
import classes from './index.module.scss';
import styled from 'styled-components';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Button, ListItemIcon } from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
import UserIcon from '../../../../public/icons/User/Line.svg';
import BellIcon from '../../../../public/icons/Bell/Line.svg';
import ListIcon from '../../../../public/icons/List/Line.svg';
import MegaphoneIcon from '../../../../public/icons/Megaphone/Line.svg';
import HistoryIcon from '../../../../public/icons/History/Line.svg';
import BookmarkIcon from '../../../../public/icons/Bookmark/Line.svg';
import Link from 'next/link';
import { Link as MuiLink } from '@material-ui/core';
import { accountActions } from '@/store/actions';
import { useRouter } from 'next/router';
import { BasicIcon } from '@/components/basic-elements/basic-icon';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTranslation } from 'next-i18next';

const BurgerMenu = props => {
  const { t } = useTranslation('common');
  const { anchorEl, setAnchorEl, isExpanded, isChef, notificationAmount } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const MenuListItem = ({ icon, text, path, ...otherProps }) => {
    const endIcon = otherProps?.endIcon;
    return (
      <MenuItem
        button
        component={MuiLink}
        href={path}
        onClick={handleClose}
        className={otherProps?.classes || classes.menu_item}>
        <>
          {icon && (
            <ListItemIcon className={classes.menu_item_icon}>{<BasicIcon icon={icon} color="#777E90" />}</ListItemIcon>
          )}
          <p className={classes.header__link_place_menu}>{text}</p>
          {otherProps?.children ? otherProps?.children : false}
          {endIcon ? endIcon : false}
        </>
      </MenuItem>
    );
  };
  const handleLogout = () => {
    dispatch(accountActions.logout());
    router.push('/', undefined, { locale: router.locale });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const NotificationCircle = () => <span className={classes.notification_circle}>{notificationAmount}</span>;

  const PopupMenu = () => {
    return (
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        disableScrollLock
        autoFocus={false}
        PopoverClasses={{ paper: classes.menu_popover, list: classes.menu_list }}
        anchorOrigin={{
          vertical: '0',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        marginThreshold={0}
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        {isMobile && isChef && (
          <MenuListItem classes={classes.menu_button_item} onClick={handleClose}>
            <Link href="/recipe/upload">
              <Button className={classes.header__link_place_menu_logout}>{t('header.uploadRecipeButton')}</Button>
            </Link>
          </MenuListItem>
        )}
        <MenuListItem text={t('header.burgerMenu.accountSettings')} icon={UserIcon} path="/profile/account-settings" />
        <MenuListItem
          text={t('header.burgerMenu.notifications')}
          icon={BellIcon}
          endIcon={notificationAmount && notificationAmount !== 0 ? <NotificationCircle /> : false}
          path="/notifications"
        />
        {isChef && <MenuListItem text={t('header.burgerMenu.myRecipes')} icon={ListIcon} path="/my-recipes" />}
        <MenuListItem text={t('header.burgerMenu.market')} icon={MegaphoneIcon} path="/search" />
        <MenuListItem text={t('header.burgerMenu.history')} icon={HistoryIcon} path="/my-orders" />
        <MenuListItem text={t('header.burgerMenu.savedRecipes')} icon={BookmarkIcon} path="/saved-recipes" />

        <MenuListItem classes={classes.menu_button_item} onClick={handleClose}>
          <Button className={classes.header__link_place_menu_logout} onClick={handleLogout}>
            {t('header.burgerMenu.logout')}
          </Button>
        </MenuListItem>
      </Menu>
    );
  };

  return <PopupMenu />;
};

export default connect(state => ({
  account: state.account
}))(BurgerMenu);
