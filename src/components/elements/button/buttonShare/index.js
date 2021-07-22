import React, { useState, useEffect } from 'react';
import Clipboard from 'clipboard';
import LinkIcon from '@material-ui/icons/Link';

import { Button } from "@material-ui/core";

import Recipe from "@/api/Recipe";

import classes from './buttonShare.module.scss';

const Index = ({recipeId}) => {
  const [anchorEl, setAnchorEl] = useState(false);

  useEffect(() => {
    const currentUrl = window.location.href;

    new Clipboard('.copy-clipboard', {
      text: () => {
        return currentUrl;
      }
    });
  }, []);

  const toggleMenu = () => {
    setAnchorEl(!anchorEl);
  };

  const copyLink = async () => {
    uploadShareStats();
    setAnchorEl(!anchorEl);
  };

  const uploadShareStats = () => {
    try {
      Recipe.uploadShareStatsForRecipe(Number(recipeId));
    }
    catch(e)  {
      console.error(e);
    }
  };

  return (
    <div className={classes.shareBtn}>
      <Button
        variant='contained'
        color='primary'
        onClick={toggleMenu}
      >
        Share
      </Button>

      <ul className={anchorEl ? classes.shareBtn__dropdown : classes.shareBtn__dropdown__disabled}>
        <li className={`${classes.shareBtn__dropdown__item} copy-clipboard`} onClick={copyLink}>
          <LinkIcon classes={{root: classes.shareBtn__icon}}/>
          Copy Link
        </li>
      </ul>
    </div>
  );
};

export default Index;
