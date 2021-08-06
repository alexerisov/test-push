import React, {useEffect} from 'react';
import classes from "./index.module.scss";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import { modalActions, accountActions } from '@/store/actions';
import { connect } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';
import { NoSsr } from '@material-ui/core';
import { useRouter } from 'next/router';
import { USER_TYPE } from "@/utils/datasets";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import logo from './logo.svg';

const StyledMenu = styled(Menu)`
  margin: 40px 0 0 0;
  li {
    padding: 0;
  }
`;

const useSeparatorStyles = makeStyles({
  root: {
    borderBottom: '2px solid #f8f8f8'
  }
});

const HeaderDefault = (props) => {
  const mobile = useMediaQuery('(max-width: 576px)');
  const [isExpanded, setExpanded] = React.useState(false);
  const separatorStyles = useSeparatorStyles();
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

  const handleExpandingMobileMenu = () => {
    setExpanded(!isExpanded);
  };

  const mobileMenu = (
    <div className={isExpanded ? classes.mobileMenu : classes.mobileMenu__dnone}>
      <div className={classes.mobileMenu__separator}></div>
      <ul className={isExpanded ? classes.mobileMenu__list : classes.mobileMenu__listHidden}>
        <nav className={classes.mobileMenu__nav}>
          <li className={classes.mobileMenu__navItem} onClick={handleExpandingMobileMenu}>
            <Link href="/search?title=">
              <a>Recipes</a>
            </Link>
          </li>

          <li className={classes.mobileMenu__navItem} onClick={handleExpandingMobileMenu}>
            <Link href="/">
              <a>Get Inspired!</a>
            </Link>
          </li>

          <li className={classes.mobileMenu__navItem} onClick={handleExpandingMobileMenu}>
            <Link href="/">
              <a>Menu</a>
            </Link>
          </li>

          <li className={classes.mobileMenu__navItem} onClick={handleExpandingMobileMenu}>
            <Link href="/">
              <a>Chef's Pensil</a>
            </Link>
          </li>
        </nav>

        {!props.account.hasToken
          ?
            <li className={classes.mobileMenu__item} onClick={handleExpandingMobileMenu}>
              <Link href="#">
                <a onClick={handleClickLogin('register')}>Login</a>
              </Link>
            </li>
          :
          <>
            <li className={`${classes.mobileMenu__item} ${classes.mobileMenu__itemFont}`} onClick={handleExpandingMobileMenu}>
              <Link href="/profile/account-settings">
                <a>My Profile</a>
              </Link>
            </li>
            {props?.account?.profile?.user_type === USER_TYPE.chefType &&
              <>
                <li className={classes.mobileMenu__item} onClick={handleExpandingMobileMenu}>
                  <Link href="/my-uploads">
                    <a>
                      My Recipes
                    </a>
                  </Link>
                </li>

                <li className={classes.mobileMenu__item} onClick={handleExpandingMobileMenu}>
                  <Link href="/">
                    <a>
                      My Pencils
                    </a>
                  </Link>
                </li>
              </>
            }

            <li className={classes.mobileMenu__item} onClick={handleExpandingMobileMenu}>
              <Link href="/saved-recipes">
                <a>
                Saved Recipes
                </a>
              </Link>
            </li>

            {props?.account?.profile?.user_type === USER_TYPE.viewerType &&
              <li className={classes.mobileMenu__item} onClick={handleExpandingMobileMenu}>
                <Link href="/">
                  <a>
                  History
                  </a>
                </Link>
              </li>
            }
            <li className={classes.mobileMenu__item} onClick={handleLogout}>
              <Link href="#">
                <a>Logout</a>
              </Link>
            </li>
          </>
          }
      </ul>
    </div>
  );

  const defaultContent = (
    <>
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
              {props?.account?.profile?.user_type === USER_TYPE.viewerType
                ?
                `Hi, ${props?.account?.profile?.full_name
                  ? props?.account?.profile?.full_name?.split(' ')[0]
                  : 'user'}!`
                :
                `Hi, ${props?.account?.profile?.full_name
                  ? props?.account?.profile?.full_name?.split(' ')[0]
                  : 'chef'}!`
              }
            </button>
            <StyledMenu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {props?.account?.profile?.user_type === USER_TYPE.chefType &&
              <>
                <MenuItem onClick={handleClose}>
                  <Link href="/my-uploads">
                    <a className={classes.header__link_place_menu}>
                      My Recipes
                    </a>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose} classes={{root: separatorStyles.root}}>
                  <Link href="/">
                    <a className={classes.header__link_place_menu}>
                      My Pencils
                    </a>
                  </Link>
                </MenuItem>
              </>
              }
              <MenuItem onClick={handleClose} classes={{root: separatorStyles.root}}>
                <Link href="/saved-recipes">
                  <a className={classes.header__link_place_menu}>
                    Saved Recipes
                  </a>
                </Link>
              </MenuItem>
              { props?.account?.profile?.user_type === USER_TYPE.viewerType && <MenuItem onClick={handleClose}>
                <Link href="/">
                  <a className={classes.header__link_place_menu}>
                    History
                  </a>
                </Link>
              </MenuItem>}
              <MenuItem onClick={handleClose}>
                <Link href="/profile/account-settings">
                  <a className={classes.header__link_place_menu}>My Profile</a>
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
    </>
  );

  return (
    <div className={classes.header}>
      <div className={classes.header__container}>
        <Link href="/">
          <a>
            <img src={logo} className={classes.header__logo} alt="" />
          </a>
        </Link>

        {!mobile && defaultContent}

        {mobile && !isExpanded && <MenuIcon className={classes.header__burger} onClick={handleExpandingMobileMenu} />}
        {mobile && isExpanded && <CloseIcon className={classes.header__burger} onClick={handleExpandingMobileMenu} />}
      </div>
      {mobile && mobileMenu}
    </div>
  );
};
  
export default connect((state) => ({
  account: state.account,
}))(HeaderDefault);