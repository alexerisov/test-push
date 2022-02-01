import React, { useEffect } from 'react';
import classes from './index.module.scss';
import styled from 'styled-components';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Button, ListItemIcon } from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
import { ReactComponent as UserIcon } from '../../../../public/icons/User/Line.svg';
import { ReactComponent as BellIcon } from '../../../../public/icons/Bell/Line.svg';
import { ReactComponent as ListIcon } from '../../../../public/icons/List/Line.svg';
import { ReactComponent as MegaphoneIcon } from '../../../../public/icons/Megaphone/Line.svg';
import { ReactComponent as HistoryIcon } from '../../../../public/icons/History/Line.svg';
import { ReactComponent as BookmarkIcon } from '../../../../public/icons/Bookmark/Line.svg';
import Link from 'next/link';
import { Link as MuiLink } from '@material-ui/core';
import { accountActions } from '@/store/actions';
import { useRouter } from 'next/router';
import { BasicIcon } from '@/components/basic-elements/basic-icon';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const BurgerMenu = props => {
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
          {/*{path && (*/}
          {/*  <Link href={path}>*/}
          <p className={classes.header__link_place_menu}>{text}</p>
          {/*  </Link>*/}
          {/*)}*/}
          {otherProps?.children ? otherProps?.children : false}
          {endIcon ? endIcon : false}
        </>
      </MenuItem>
    );
  };
  const handleLogout = () => {
    dispatch(accountActions.logout());
    router.push('/');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const NotificationCircle = () => <span className={classes.notification_circle}>{notificationAmount}</span>;

  const PopupMenu = () => {
    return (
      <Menu
        id="simple-menu"
        // anchorReference="anchorEl"
        // anchorPosition={anchorEl}
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
          horizontal: 'right'
        }}
        marginThreshold={0}
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        {isMobile && isChef && (
          <MenuListItem classes={classes.menu_button_item} onClick={handleClose}>
            <Button href="/recipe/upload" className={classes.header__link_place_menu_logout}>
              Upload Recipes
            </Button>
          </MenuListItem>
        )}
        <MenuListItem text="Account Settings" icon={UserIcon} path="/profile/account-settings" />
        <MenuListItem
          text="Notifications"
          icon={BellIcon}
          endIcon={notificationAmount && notificationAmount !== 0 ? <NotificationCircle /> : false}
          path="/notifications"
        />
        {isChef && <MenuListItem text="My Recipes" icon={ListIcon} path="/my-recipes" />}
        <MenuListItem text="Market" icon={MegaphoneIcon} path="/search" />
        <MenuListItem text="History" icon={HistoryIcon} path="/my-orders" />
        <MenuListItem text="Saved Recipes" icon={BookmarkIcon} path="/saved-recipes" />

        <MenuListItem classes={classes.menu_button_item} onClick={handleClose}>
          <Button className={classes.header__link_place_menu_logout} onClick={handleLogout}>
            Logout
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
