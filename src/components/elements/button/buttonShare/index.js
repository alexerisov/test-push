import React, { useState, useEffect } from 'react';
import {connect} from "react-redux";
import Clipboard from 'clipboard';
import ShareIcon from '@material-ui/icons/Share';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import Recipe from "@/api/Recipe";
import {modalActions} from "@/store/actions";

import styles from './buttonShare.module.scss';

const ButtonShare = ({recipeId, account, dispatch}) => {
  const [open, setOpen] = useState(false);
  const isAuthorized = account.hasToken;

  const openRegisterPopup = (name) => {
    return () => {
      dispatch(
        modalActions.open(name),
      ).then(result => {
        // result when modal return promise and close
      });
    };
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const handleTooltipClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const currentUrl = window.location.href;

    if (isAuthorized) {
      new Clipboard('.buttonShare_shareBtn__1v3WU', {
        text: () => {
          return currentUrl;
        }
      });
    }
  }, [isAuthorized]);

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
          onClick={!isAuthorized ? openRegisterPopup('register') : copyLink}
        >
          <ShareIcon />
          <span className={styles.shareBtn__text}>Share</span>
        </button>
      </Tooltip>
    </ClickAwayListener>
  );
};

export default connect((state) => ({
  account: state.account,
}))(ButtonShare);
