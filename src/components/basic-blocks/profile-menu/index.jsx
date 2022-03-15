import React from 'react';
import classes from './index.module.scss';
import BellIcon from '../../../../public/icons/Bell/Line.svg';
import CreditCardIcon from '../../../../public/icons/Credit Card/Line.svg';
import LockIcon from '../../../../public/icons/Lock/Line.svg';
import UserIcon from '../../../../public/icons/User/Line.svg';
import BoxesIcon from '../../../../public/icons/Boxes/Line.svg';

import Link from 'next/link';
import { useRouter } from 'next/router';

export const ProfileMenu = () => {
  const router = useRouter();

  const LinkElement = props => {
    const { icon, text, path, disabled } = props;
    const isActive = router.pathname === path;

    return (
      <Link href={path}>
        <a className={classes.link}>
          <span>{icon}</span>
          <span className={isActive ? classes.link__active : classes.link__text}>{text}</span>
        </a>
      </Link>
    );
  };

  return (
    <div className={classes.container}>
      <LinkElement path="/profile-info" icon={<UserIcon />} text="Profile info" />
      <LinkElement path="/security" icon={<LockIcon />} text="Login and security" />
      <LinkElement path="/my-payments" icon={<CreditCardIcon />} text="Payments" />
      <LinkElement path="/my-orders" icon={<BoxesIcon />} text="Orders" />
      <LinkElement path="/notifications" icon={<BellIcon />} text="Notifications" />
    </div>
  );
};
