import React, { useState, useEffect } from 'react';
import Clipboard from 'clipboard';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Fade from '@material-ui/core/Fade';
import { useMobileDevice } from '@/customHooks/useMobileDevice';

import Tooltip from '@material-ui/core/Tooltip';
import { EmailShareButton, FacebookShareButton, PinterestShareButton, TwitterShareButton } from 'react-share';

import ShareIcon from '@material-ui/icons/Share';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import { EmailIcon, FacebookIcon, TwitterIcon, PinterestIcon } from 'react-share';

import Recipe from '@/api/Recipe';

import styles from './buttonShare.module.scss';

const ButtonShare = ({ recipeId, recipePhoto, recipeDescription }) => {
  const [openShareWindow, setOpenShareWindow] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMobileOrTabletDevice] = useMobileDevice();
  const currentUrl = window.location.href;

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleOpenShareWindow = e => {
    setOpenShareWindow(true);
  };

  const handleCloseShareWindow = e => {
    setOpenShareWindow(false);
  };

  useEffect(() => {
    new Clipboard('.buttonShare_shareWindow__item__3rA8k:first-child', {
      text: () => {
        return currentUrl;
      }
    });
  }, []);

  const copyLink = async () => {
    await uploadShareStats();
    handleCloseShareWindow();
    setTimeout(handleTooltipOpen, 500);
    setTimeout(handleTooltipClose, 1500);
  };

  const mobileHandler = () => {
    if (navigator.share) {
      navigator
        .share({
          url: document.location.href
        })
        .then(() => {
          console.log('Successfully shared');
        })
        .catch(error => {
          console.error('Something went wrong sharing the blog', error);
        });
    }
  };

  const uploadShareStats = () => {
    try {
      Recipe.uploadShareStatsForRecipe(Number(recipeId));
    } catch (e) {
      console.error(e);
    }
  };

  const beforeOnClickOnSocialNetwork = async () => {
    return new Promise(resolve => {
      resolve('success');
    }).then(() => {
      handleCloseShareWindow();
    });
  };

  return (
    <ClickAwayListener onClickAway={handleCloseShareWindow}>
      <Tooltip
        classes={{ tooltipArrow: styles.shareBtn__tooltipArrow }}
        arrow
        PopperProps={{
          disablePortal: true
        }}
        onClose={handleTooltipClose}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title="Link successfully copied!">
        <button
          className={styles.shareBtn}
          type="button"
          onClick={isMobileOrTabletDevice ? mobileHandler : e => handleOpenShareWindow(e)}>
          <div className={styles.shareBtn__icon}>
            <ShareIcon fontSize="inherit" />

            <span className={styles.shareBtn__text}>Share</span>
          </div>

          <Fade in={openShareWindow}>
            <ul className={styles.shareWindow}>
              <li className={styles.shareWindow__item} onClick={copyLink}>
                <AssignmentOutlinedIcon fontSize={'small'} /> Copy to clipboard
              </li>

              <li className={styles.shareWindow__item}>
                <TwitterShareButton
                  url={currentUrl}
                  className={styles.shareWindow__action}
                  beforeOnClick={beforeOnClickOnSocialNetwork}>
                  <TwitterIcon round={true} size="23px" />
                  Twitter
                </TwitterShareButton>
              </li>

              <li className={styles.shareWindow__item}>
                <FacebookShareButton
                  url={currentUrl}
                  className={styles.shareWindow__action}
                  beforeOnClick={beforeOnClickOnSocialNetwork}>
                  <FacebookIcon round={true} size="23px" />
                  Facebook
                </FacebookShareButton>
              </li>

              <li className={styles.shareWindow__item}>
                <EmailShareButton
                  url={currentUrl}
                  className={styles.shareWindow__action}
                  beforeOnClick={beforeOnClickOnSocialNetwork}>
                  <EmailIcon round={true} size="23px" />
                  Email
                </EmailShareButton>
              </li>

              <li className={styles.shareWindow__item}>
                <PinterestShareButton
                  className={styles.shareWindow__action}
                  beforeOnClick={beforeOnClickOnSocialNetwork}
                  media={recipePhoto.url}
                  description={recipeDescription}
                  url={currentUrl}>
                  <PinterestIcon round={true} size="23px" />
                  Pinterest
                </PinterestShareButton>
              </li>
            </ul>
          </Fade>
        </button>
      </Tooltip>
    </ClickAwayListener>
  );
};

export default ButtonShare;
