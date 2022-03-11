import React, { useEffect, useState } from 'react';
import classes from './index.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { USER_TYPE } from '@/utils/datasets';
import { profileActions } from '@/store/actions';

const ContentLayout = props => {
  const router = useRouter();

  const [data, setData] = useState();

  useEffect(() => {
    setData({
      accountSettings: { path: `/profile/account-settings` },
      password: { path: `/profile/password` },
      becomeHomeChef: { path: `/profile/become-home-chef` }
    });
  }, []);

  const { children } = props;

  const handleChangeStatus = () => {
    router.push('/profile/become-home-chef', undefined, { locale: router.locale });
  };

  useEffect(() => {
    props.dispatch(profileActions.init(props.account.profile));
  }, [props.account.profile]);

  if (!data) {
    return <></>;
  }

  const content = (
    <div className={classes.dashboard__navbar}>
      <h2 className={classes.dashboard__title}>
        <Link href="/">
          <a className={classes.dashboard__navbar__link}>Home / </a>
        </Link>
        <span className={classes.dashboard__myProfile}>My profile</span>
      </h2>
      <ul className={classes.dashboard__itemContainer}>
        <li
          className={`${classes.dashboard__item} ${
            router.asPath === data.accountSettings.path && classes.dashboard__item_active
          }`}>
          <Link href={data.accountSettings.path}>
            <a>Account Settings</a>
          </Link>
        </li>
        <li
          className={`${classes.dashboard__item} ${
            router.asPath === data.password.path && classes.dashboard__item_active
          }`}>
          <Link href={data.password.path}>
            <a>Password</a>
          </Link>
        </li>
      </ul>
      {!(router.asPath === data.becomeHomeChef.path) && (
        <div className={classes.dashboard__buttonUploud}>
          {props?.profile?.data?.user_type === USER_TYPE.chefType ? (
            <Button variant="contained" color="primary" href="/recipe/upload">
              Upload New Recipe!
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleChangeStatus}>
              Become a home chef
            </Button>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className={classes.dashboard}>
      {content}
      <div className={classes.dashboard__content}>{children}</div>
    </div>
  );
};

export default connect(state => ({
  account: state.account,
  profile: state.profile
}))(ContentLayout);
