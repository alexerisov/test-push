import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';

import classes from './index.module.scss';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';

import defaultAvatar from '@/../public/images/index/icon_user.svg';
import Recipe from '@/api/Recipe';
import { debounce } from '@/utils/debounce';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Rating } from '@material-ui/lab';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
const relativeTime = require('dayjs/plugin/relativeTime');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);
dayjs.extend(relativeTime);

const Comment = ({
  likesNumber,
  dislikesNumber,
  text,
  commentId,
  createdAt,
  deleteComment,
  deleteReview,
  user,
  userId,
  uploadLikeHandler,
  rating
}) => {
  const { t } = useTranslation('recipePage');
  const mobile = useMediaQuery('(max-width: 568px)');
  const activeUserId = useSelector(state => state?.account?.profile?.pk);
  const status = {
    created: 'created',
    deleted: 'deleted'
  };

  const likeTypes = {
    like: 'like',
    dislike: 'dislike'
  };

  const [likes, setLikes] = useState({
    value: Number(likesNumber),
    updated: false
  });
  const [dislikes, setDislikes] = useState({
    value: Number(dislikesNumber),
    updated: false
  });

  const isCreated24HoursAgo = () => {
    const createdTimeOfTargetComment = Date.parse(createdAt);

    // This is a difference between current GMT and UTC of active user
    const diffGMT = new Date().getTimezoneOffset() * 6e4;
    const currentTime = Date.now() + diffGMT;

    const hoursDiff = Math.floor((currentTime - createdTimeOfTargetComment) / 3.6e6);

    return hoursDiff < 24;
  };

  const isCommentCreatedByActiveUser = () => {
    return user.pk === userId;
  };

  const uploadLike = async type => {
    try {
      const targetLike = {
        id: commentId,
        type: type
      };

      let response;
      if (uploadLikeHandler) {
        response = await uploadLikeHandler(targetLike);
      } else {
        response = await Recipe.uploadCommentsLikes(targetLike);
      }

      const likeStatus = response.data['like_status'];
      const dislikeStatus = response.data['dislike_status'];

      setLikeValuesByResponseLikeStatus({ likeStatus, dislikeStatus });
    } catch (e) {
      console.log(e);
    }
  };

  const likeHandler = debounce(type => {
    uploadLike(type);
  }, 600);

  const setLikeValuesByResponseLikeStatus = ({ likeStatus, dislikeStatus }) => {
    let likeCount = likes.value;
    let dislikeCount = dislikes.value;

    if (likeStatus === status.created && !likes.updated) {
      setLikes({
        value: ++likeCount,
        updated: true
      });
    }

    if (likeStatus === status.deleted && likes.updated) {
      setLikes({
        value: --likeCount,
        updated: false
      });
    }

    if (dislikeStatus === status.created && !dislikes.updated) {
      setDislikes({
        value: ++dislikeCount,
        updated: true
      });
    }

    if (dislikeStatus === status.deleted && dislikes.updated) {
      setDislikes({
        value: --dislikeCount,
        updated: false
      });
    }
  };

  return (
    <div className={classes.comment}>
      {!mobile && <img className={classes.comment__avatar} src={user?.avatar ?? defaultAvatar} alt="avatar" />}

      <div className={classes.comment__body}>
        <p className={classes.comment__username}>
          {mobile && <img className={classes.comment__avatar} src={user?.avatar ?? defaultAvatar} alt="avatar" />}
          {user?.full_name ?? 'No name'}
        </p>

        {rating && (
          <div className={classes.stars}>
            <Rating
              emptyIcon={<StarBorderIcon htmlColor="#AFB8CA" fontSize="16px" />}
              classes={{
                icon: classes.stars_icon,
                iconEmpty: classes.stars_icon_empty,
                iconFilled: classes.stars_icon_filled
              }}
              readOnly
              value={rating}
              precision={0.5}
            />
          </div>
        )}

        <p className={classes.comment__text}>{text}</p>

        <div className={classes.comment__likes}>
          <div className={classes.comment__created_at}>
            <span>{dayjs().to(dayjs.utc(createdAt))}</span>
          </div>

          <div className={classes.comment__like}>
            <span onClick={() => likeHandler(likeTypes.like)}>
              {likes.value || false} {t('comments.likeButton')}
            </span>
          </div>

          <div className={classes.comment__reply}>
            <span>{t('comments.replyButton')}</span>
          </div>

          {/*<div className={classes.comment__like}>*/}
          {/*  <span onClick={() => likeHandler(likeTypes.dislike)}>{dislikes.value} Dislikes</span>*/}
          {/*</div>*/}

          {isCreated24HoursAgo() && isCommentCreatedByActiveUser() && (
            <div className={classes.comment__delete}>
              <span onClick={() => (rating ? deleteReview(commentId) : deleteComment(commentId))}>
                {t('comments.deleteButton')}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
