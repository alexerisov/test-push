import React, {useState} from 'react';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';

import classes from './CommentItem.module.scss';

import defaultAvatar from '../../../../../public/images/index/icon_user.svg';
import Recipe from "@/api/Recipe";

const CommentItem = ({ likesNumber, dislikesNumber, avatar, text, username, commentId }) => {
  const status = {
    created: 'created',
    deleted: 'deleted'
  };

  const likeTypes = {
    like: 'like',
    dislike: 'dislike'
  };

  const [likes, setLikes] = useState(+likesNumber);
  const [dislikes, setDislikes] = useState(+dislikesNumber);

  const uploadLike = async ({type}) => {
    try {
      const targetLike = {
        id: commentId,
        type: type
      };

      const response = await Recipe.uploadCommentsLikes(targetLike);
      const likeStatus = response.data['like_status'];
      const dislikeStatus = response.data['dislike_status'];

      setLikeValuesByResponseLikeStatus({likeStatus, dislikeStatus});
    } catch (e) {
      console.log(e);
    }
  };

  const setLikeValuesByResponseLikeStatus = ({likeStatus, dislikeStatus}) => {
    if (likeStatus === status.created) {
      setLikes(likes + 1);
    }

    if (likeStatus === status.deleted) {
      setLikes(likes - 1);
    }

    if (dislikeStatus === status.created) {
      setDislikes(dislikes + 1);
    }

    if (dislikeStatus === status.deleted) {
      setDislikes(dislikes - 1);
    }
  };

  return (
    <div  className={classes.comment}>
      <img className={classes.comment__avatar} src={avatar ? avatar : defaultAvatar} alt="avatar"/>

      <div className={classes.comment__body}>
        <p className={classes.comment__username}>{username ? username : "No name"}</p>

        <p className={classes.comment__text}>{text}</p>

        <div className={classes.comment__likes}>
          <div className={classes.comment__like}>
            <ThumbUpOutlinedIcon
              classes={{root:classes.comment__like__icon}}
              style={{fontSize: '30px'}}
              onClick={() => uploadLike({type:likeTypes.like})}
            />
            <span className={classes.comment__like__value}>{likes} Likes</span>
          </div>

          <div className={classes.comment__like}>
            <ThumbDownOutlinedIcon
              classes={{root: classes.comment__like__icon}}
              style={{fontSize: '30px'}}
              onClick={() => uploadLike({type: likeTypes.dislike})}
            />
            <span>{dislikes}Dislikes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
