import React, { useEffect, useState } from 'react';
import classes from "./index.module.scss";
import Link from 'next/link';
import { useRouter } from 'next/router';

const ContentLayout = (props) => {

  const router = useRouter();

  const [data, setData] = useState();

  useEffect(() => {
    setData({
      accountSettings: { path: `/profile/account-settings` },
      password: { path: `/profile/password` },
      notificationSettings: { path: `/profile/notification-settings` },
    });
  }, []);

  const { children } = props;

  if (!data) {
    return <></>;
  }
  
  const content = (
    <div className={classes.dashboard__navbar}>
      <h2 className={classes.dashboard__title}>Home / <span>My profile</span></h2>
      <ul className={classes.dashboard__itemContainer}>
        <li className={`${classes.dashboard__item} ${(router.asPath === data.accountSettings.path) && classes.dashboard__item_active}`}>
          <Link href={data.accountSettings.path}>
            <a>Account Settings</a>
          </Link>
        </li>
        <li className={`${classes.dashboard__item} ${(router.asPath === data.password.path) && classes.dashboard__item_active}`}>
          <Link href={data.password.path}>
            <a>Password</a>
          </Link>
        </li>
        <li className={`${classes.dashboard__item} ${(router.asPath === data.notificationSettings.path) && classes.dashboard__item_active}`}>
          <Link href={data.notificationSettings.path}>
            <a>Notification Settings</a>
          </Link>
        </li>
      </ul>
    </div>
  );

  return (
    <div className={classes.dashboard}>
      {content}
      <div className={classes.dashboard__content}>
        {children}
      </div>
    </div>
  );
};


export default ContentLayout;
