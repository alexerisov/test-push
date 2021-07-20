import React from 'react';
import Link from "next/link";

import classes from "./buttonUploadRecipe.module.scss";

const buttonUploadRecipe = ({ children }) => {
  return (
    <>
      <Link
        href="/recipe/upload"
      >
        <button type="btn" className={classes.btn}>
          {children}
        </button>
      </Link>
    </>
  );
};

export default buttonUploadRecipe;
