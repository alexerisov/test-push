import React from 'react';
import classes from './index.module.scss';
import Link from 'next/link';

const RecipeNotFound = ({ text }) => {
  return (
    <div className={classes.notFound}>
      <h1 className={classes.notFound__title}>{text ?? 'Recipe not found'}</h1>
      <Link href="/">
        <a>Home</a>
      </Link>
    </div>
  );
};

export default RecipeNotFound;
