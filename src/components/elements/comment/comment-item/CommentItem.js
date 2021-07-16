import React, {useState} from 'react';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';

import classes from './CommentItem.module.scss';

import defaultAvatar from '../../../../../public/images/index/icon_user.svg';
import Recipe from "@/api/Recipe";

const CommentItem = ({ likesNumber, avatar, text, username, commentId }) => {
  const [likes, setLikes] = useState(likesNumber);
  const [dislikes, setDislikes] = useState(likesNumber);

  const likeTypes = {
    like: 'like',
    dislike: 'dislike'
  };

  const uploadLike = async ({type}) => {
    try {
      const targetLike = {
        id: +commentId,
        type: type
      };

      await Recipe.uploadCommentsLikes(targetLike);

      if (type === likeTypes.like) {
        setLikes(likes + 1);
      }

      setDislikes(dislikes + 1);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div  className={classes.comment}>
      <div className={classes.comment__avatar}>
        <img src={avatar ? avatar : defaultAvatar} alt="avatar"/>
      </div>

      <div className={classes.comment__body}>
        <p className={classes.comment__username}>{username ? username : "Без имени"}</p>

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
