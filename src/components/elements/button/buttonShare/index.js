import React, { useState, useEffect } from 'react';
import Clipboard from 'clipboard';
import ShareIcon from '@material-ui/icons/Share';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import Recipe from "@/api/Recipe";

import styles from './buttonShare.module.scss';

const ButtonShare = ({recipeId}) => {
  const [open, setOpen] = useState(false);

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const handleTooltipClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const currentUrl = window.location.href;

    new Clipboard('.buttonShare_shareBtn__1v3WU', {
      text: () => {
        return currentUrl;
      }
    });
  }, []);

  const copyLink = async () => {
    await uploadShareStats();
    handleTooltipOpen();
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
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        classes={{tooltipArrow: styles.shareBtn__tooltipArrow}}
        arrow
        PopperProps={{
          disablePortal: true,
        }}
        onClose={handleTooltipClose}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title="Successfully copied!"
      >
        <button
          className={styles.shareBtn}
          type="button"
          onClick={copyLink}
        >
          <ShareIcon />
          <span className={styles.shareBtn__text}>Share</span>
        </button>
      </Tooltip>
    </ClickAwayListener>
  );
};

export default ButtonShare;
