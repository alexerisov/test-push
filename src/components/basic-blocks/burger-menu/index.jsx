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
      <StyledMenuItem onClick={handleClose}>
        <StyledListItemIcon>{<BasicIcon icon={icon} color="#777E90" />}</StyledListItemIcon>
        <Link href={path}>
          <a className={classes.header__link_place_menu}>{text}</a>
        </Link>
        {endIcon && <>{endIcon}</>}
      </StyledMenuItem>
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
      <StyledMenu
        c
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
          <LogoutMenuItem onClick={handleClose}>
            <Button href="/recipe/upload" className={classes.header__link_place_menu_logout}>
              Upload Recipes
            </Button>
          </LogoutMenuItem>
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

        <LogoutMenuItem onClick={handleClose}>
          <Button className={classes.header__link_place_menu_logout} onClick={handleLogout}>
            Logout
          </Button>
        </LogoutMenuItem>
      </StyledMenu>
    );
  };

  return <PopupMenu />;
};

const StyledMenu = styled(Menu)`
  margin-top: 50px;
`;

const StyledMenuItem = styled(MenuItem)`
  width: 100% !important;
  display: flex;
  padding: 12px 12px 12px 20px !important;
  column-gap: 12px;
`;

const LogoutMenuItem = styled(StyledMenuItem)`
  width: 100% !important;
  &:hover {
    background: none;
  }
`;

const StyledListItemIcon = styled(ListItemIcon)`
  display: flex;
  justify-content: center;
  align-item: center;
`;

export default connect(state => ({
  account: state.account
}))(BurgerMenu);
