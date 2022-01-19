import React from 'react';
import classes from './index.module.scss';
import { Button, Drawer, IconButton } from '@material-ui/core';
import { modalActions } from '@/store/actions';
import { useDispatch } from 'react-redux';
import logo from '../../../../public/images/Header Logo/Line.svg';
import { ReactComponent as CloseIcon } from '../../../../public/icons/Close/Line.svg';
import Link from 'next/link';
import { BasicIcon } from '@/components/basic-elements/basic-icon';
import { ReactComponent as UserIcon } from '../../../../public/icons/User/Line.svg';
import { useRouter } from 'next/router';

export const LoginDrawer = props => {
  const { anchorEl, setAnchorEl, isExpanded, setIsExpanded, isChef, notificationAmount } = props;

  const dispatch = useDispatch();
  const router = useRouter();

  const handleClose = () => {
    setIsExpanded(false);
  };

  const handleClickLogin = name => {
    return () => {
      setIsExpanded(false);
      dispatch(modalActions.open(name)).then(result => {
        // result when modal return promise and close
      });
    };
  };

  const LinkElement = props => {
    const { text, path } = props;
    const isActive = router.pathname === path;

    return (
      <Link href={path}>
        <a className={classes.link}>
          <span className={isActive ? classes.link__active : classes.link__text}>{text}</span>
        </a>
      </Link>
    );
  };

  const LoginButton = () => (
    <Button onClick={handleClickLogin('register')} variant="outlined" className={classes.button_login}>
      Login
    </Button>
  );

  const GetStartedButton = () => (
    <Button variant="text" href="/search?title=" className={classes.button_get_started}>
      Get Started
    </Button>
  );

  return (
    <Drawer anchor="right" open={isExpanded} onClose={handleClose}>
      <div className={classes.drawer}>
        <div className={classes.header}>
          <Link href="/">
            <a>
              <img className={classes.header_logo} src={logo} alt="Eatchef Header Logo" />
            </a>
          </Link>
          <IconButton onClick={handleClose}>
            <BasicIcon icon={CloseIcon} color="#777E91" size="32px" />
          </IconButton>
        </div>
        <div className={classes.links}>
          <LinkElement path="/" text="Home" />
          <LinkElement path="/search?title=" text="Recipes" />
        </div>
        <div className={classes.buttons}>
          <LoginButton />
          <GetStartedButton />
        </div>
      </div>
    </Drawer>
  );
};
