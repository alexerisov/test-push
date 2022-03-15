import React from 'react';
import Link from 'next/link';
import classes from './index.module.scss';

const Custom500 = () => {
  return (
    <div className={classes.notFound}>
      <h2>Technical work on the site.</h2>
      <h1 className={classes.notFound__subtitle}>Come back later or update the page!</h1>
    </div>
  );
};

export default Custom500;
