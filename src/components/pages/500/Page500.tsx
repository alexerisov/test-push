import React from 'react';
import s from './Page500.module.scss';

const Page500 = () => {
  return (
    <div className={s.notFound}>
      <h2>Technical work on the site.</h2>
      <h1 className={s.notFound__subtitle}>Come back later or update the page!</h1>
    </div>
  );
};

export default Page500;
