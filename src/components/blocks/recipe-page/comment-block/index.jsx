import React, { useEffect, useState } from 'react';
import { Button, LinearProgress, OutlinedInput } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { modalActions } from '@/store/actions';
import { CommentItem } from '@/components/elements/comment';
import Recipe from '@/api/Recipe';

import classes from './index.module.scss';
import { useDispatch } from 'react-redux';
import Comment from '@/components/blocks/recipe-page/comment-block/comment';
import { Rating } from '@material-ui/lab';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

const CommentBlock = ({ id, userId, children, updateComments, addComment, uploadLikeHandler, deleteCommentHandle }) => {
  const isAuthorized = useSelector(state => state.account.hasToken);

  const dispatch = useDispatch();

  const [comments, setComments] = useState();

  const placeholder = 'Share your thoughts here...';
  const authError = 'Please login first, then you will can comment recipes!';

  // Pagination for comments
  const itemsPerPage = 4;
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState();

  const [ratingStars, setRatingStars] = useState();

  const formik = useFormik({
    initialValues: {
      textarea: ''
    },
    validationSchema: Yup.object({
      textarea: Yup.string()
        .min(5, 'Must be 5 characters or more')
        .max(300, 'Must be 300 characters or less')
        .required('Write something before submit...')
    }),
    onSubmit: values => {
      uploadComment(values);
    }
  });

  useEffect(() => {
    if (id) {
      getComments();
    }
  }, [page, id]);

  const getComments = async () => {
    try {
      let response;

      if (updateComments) {
        response = await updateComments({ recipeId: id, page });
      } else {
        response = await Recipe.getComments({ recipeId: id, page });
      }

      setNumberOfPages(countCommentsPages(response.data.count));
      setComments(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const countCommentsPages = count => {
    const isRemainExists = count % itemsPerPage > 0;
    let pages = Math.floor(count / itemsPerPage);
    return isRemainExists ? ++pages : pages;
  };

  const uploadComment = async ({ textarea }) => {
    if (!isAuthorized) {
      return;
    }

    try {
      const targetComment = {
        id: +id,
        text: textarea
      };

      let response;
      if (updateComments) {
        response = await addComment(targetComment);
      } else {
        response = await Recipe.uploadComments(targetComment);
      }

      if (response.status === 201) {
        getComments();
        formik.values.textarea = '';
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteComment = async commentId => {
    try {
      let response;

      if (deleteCommentHandle) {
        response = await deleteCommentHandle(commentId);
      } else {
        response = await Recipe.deleteComment(commentId);
      }

      if (response.status === 204) {
        getComments();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const openUnregisterModal = name => {
    return () => {
      dispatch(modalActions.open(name)).then(result => {
        // result when modal return promise and close
      });
    };
  };

  const RateParameter = props => {
    const [ratingStars, setRatingStars] = useState();

    return (
      <div className={classes.rate_parameter_wrapper}>
        <div className={classes.rate_parameter_text}>{props?.text}</div>
        <div className={classes.rate_parameter_stars}>
          <Rating
            emptyIcon={<StarBorderIcon htmlColor="#FFAA00" fontSize="24px" />}
            classes={{
              icon: classes.rate_parameter_stars_icon,
              iconEmpty: classes.rate_parameter_stars_icon_empty,
              iconFilled: classes.rate_parameter_stars_icon_filled
            }}
            name={props?.text}
            value={ratingStars}
            precision={0.5}
            onChange={(event, newValue) => {
              setRatingStars(newValue);
            }}
          />
        </div>
        <div className={classes.rate_parameter_line}>
          <LinearProgress
            classes={{
              root: classes.rate_parameter_line_root,
              colorPrimary: classes.rate_parameter_line_colorPrimary,
              bar: classes.rate_parameter_line_bar
            }}
            variant="determinate"
            value={(props?.average / 5) * 100}
          />
        </div>
        <div className={classes.rate_parameter_average}>
          {props?.average?.toFixed(1)}
          <StarIcon htmlColor="#FFAA00" fontSize="20px" />
        </div>
      </div>
    );
  };

  return (
    <div className={classes.comments}>
      <div className={classes.rating}>
        <div className={classes.rating_header}></div>
        <div className={classes.rating_body}>
          <RateParameter text="Taste" stars="3" average={Number.parseFloat('2.5')} />
          <RateParameter text="Value for Money" stars="1" average={Number.parseFloat('5')} />
          <RateParameter text="Originality" stars="2" average={Number.parseFloat('4.5')} />
        </div>
      </div>

      <form className={classes.comments__form} onSubmit={formik.handleSubmit}>
        <OutlinedInput
          className={classes.comments__input}
          id="textarea"
          name="textarea"
          placeholder={placeholder}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.textarea}
          fullWidth
          endAdornment={
            <Button className={classes.comments__input__button} type="submit" variant="contained" color="primary">
              Post it
            </Button>
          }
        />

        {formik.touched.textarea && formik.errors.textarea ? (
          <div className={classes.comments__input__error}>{formik.errors.textarea}</div>
        ) : null}

        {!isAuthorized && <div className={classes.comments__input__error}>{authError}</div>}
      </form>

      <div className={classes.comments__body}>
        <h3 className={classes.comments__subtitle}>Comments ({comments && comments.count})</h3>

        {comments?.results?.length !== 0 &&
          comments?.results.map((comment, index) => {
            console.log(comment);
            return (
              <Comment
                user={comment?.user}
                userId={userId}
                key={`${comment?.pk}-${index + 1}`}
                text={comment?.text}
                likesNumber={comment?.likes_number}
                dislikesNumber={comment?.dislikes_number}
                commentId={comment?.pk}
                createdAt={comment?.created_at}
                deleteComment={deleteComment}
                uploadLikeHandler={uploadLikeHandler}
              />
            );
          })}

        {comments?.results?.length !== 0 && (
          <Pagination
            classes={{ root: classes.comments__pagination }}
            count={numberOfPages}
            onChange={(event, page) => setPage(page)}
          />
        )}
      </div>
    </div>
  );
};

export default CommentBlock;
