import React, { useEffect, useState } from 'react';
import { Button } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { useSelector } from "react-redux";

import { CommentItem } from "@/components/elements/comment";
import Recipe from "@/api/Recipe";
import { validator } from "@/utils/validator";

import classes from './RecipeComments.module.scss';

const ResipeComments = ({ recipeId }) => {
  const isAuthorized = useSelector(state => state.account.hasToken);

  const [comments, setComments] = useState();

  const [commentsTextarea, setCommentsTextarea] = useState();

  const placeholder = "Add your comments here...";

  // Pagination for comments
  const itemsPerPage = 4;
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState();

  useEffect(() => {
    if (recipeId) {
      getComments();
    }
  }, [page]);

  const getComments = async () => {
    try {
      const response = await Recipe.getComments({recipeId, page});
      setNumberOfPages(countCommentsPages(response.data.count));
      setComments(response.data.results);
    } catch (e) {
      console.log(e);
    }
  };

  const countCommentsPages = (count) => {
    const isRemainExists = (count % itemsPerPage) > 0;
    let pages = Math.floor(count / itemsPerPage);
    return isRemainExists ? ++pages : pages;
  };

  const uploadComment = async () => {
    if(!isAuthorized) {
      setCommentsTextarea('Please login first...');
      return;
    }

    if (!validator.isCommentTextareaValid(commentsTextarea)) {
      setCommentsTextarea('Please type more than 5 letters...');
      return;
    }

    try {
      const targetComment = {
        id: +recipeId,
        text: commentsTextarea
      };
      const response = await Recipe.uploadComments(targetComment);

      setComments([...comments, response.data]);
      setCommentsTextarea('');
    } catch (e) {
      console.log(e);
    }
  };

  const commentsTextareaHandler = ({ target }) => {
    setCommentsTextarea(target.value);
  };

  return (
    <div className={classes.comments}>
      <h2 className={classes.comments__title}>Write review</h2>
      <span className={classes.comments__lineContainer}>
          <span className={classes.comments__yellowLine} />
          <span className={classes.comments__blueСircle} />
      </span>

      <textarea
        className={classes.comments__input}
        name="comments-input" placeholder={placeholder}
        onChange={commentsTextareaHandler}
        value={commentsTextarea}
      />

      <Button
        variant='contained'
        color='primary'
        onClick={uploadComment}
      >
        Submit
      </Button>

      <div className={classes.comments__body}>
        <h3 className={classes.comments__subtitle}>
          Comments ({comments && comments.length})
        </h3>

      {comments?.length && comments
        .map((comment, index) => {
          return (
            <CommentItem
            user={comment.user}
            key={`${comment.pk}-${index + 1}`}
            text={comment.text}
            username={comment.user?.full_name}
            avatar={comment.user?.avatar}
            likesNumber={comment['likes_number']}
            dislikesNumber={comment['dislikes_number']}
            commentId={comment.pk}
            />
          );
        })
      }

        <Pagination
          classes={{root: classes.comments__pagination}}
          count={numberOfPages}
          onChange={(event, number) => setPage(number)}
        />
      </div>
    </div>
  );
};

export default ResipeComments;
