import React from 'react';
import { Button } from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";

import styles from "./buttonUploadRecipe.module.scss";
import uploadIcon from "../../../../../public/images/index/icon_upload.svg";

const useStyles = makeStyles({
  root: {
    position: 'relative',
    padding: '5px 9px',
    fontSize: '20px',
    borderWidth: '2px'
  },
  outlinedPrimary: {
    '&:hover': {
      borderWidth: '2px'
    },
  }
});

const buttonUploadRecipe = () => {
  const classes = useStyles();

  return (
    <>
      <Button
        color="primary"
        variant="outlined"
        href="/recipe/upload"
        classes={{root: classes.root, outlinedPrimary: classes.outlinedPrimary}}
      >
          <img className={styles.icon} src={uploadIcon} alt="upload recipe icon"/>
          <span className={styles.name}>Upload your recipe</span>
      </Button>
    </>
  );
};

export default buttonUploadRecipe;
