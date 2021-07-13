import React, { useState } from 'react';
import classes from "./index.module.scss";
import LayoutPage from '@/components/layouts/layout-page';

const Recipes = (props) => {

  const content = <h1 className={classes.title}>Recipes</h1>

  return (
    <LayoutPage content={content} />
  );
};
  
export default Recipes;