import React, { useEffect, useState } from 'react';
import { Button, IconButton, LinearProgress, OutlinedInput, Popover } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

import { modalActions } from '@/store/actions';
import { CommentItem } from '@/components/elements/comment';
import { ReactComponent as ArrowRightIcon } from '@/../public/icons/Arrow Right 2/Line.svg';
import { ReactComponent as SmileIcon } from '@/../public/icons/Smile/Line.svg';
import Recipe from '@/api/Recipe';

import classes from './index.module.scss';
import { useDispatch } from 'react-redux';
import Comment from '@/components/blocks/recipe-page/comment-block/comment';
import { Rating } from '@material-ui/lab';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import { BasicIcon } from '@/components/basic-elements/basic-icon';
import { Spinner } from '@/components/elements';
import { useRouter } from 'next/router';

const CommentBlock = ({
  id,
  userId,
  children,
  updateComments,
  addComment,
  uploadLikeHandler,
  deleteCommentHandle,
  rating,
  isUserRecipeBuyer,
  isRecipeRatedByUser
}) => {
  const isAuthorized = useSelector(state => state.account.hasToken);

  const dispatch = useDispatch();
  const router = useRouter();

  const [comments, setComments] = useState();
  const [commentsCount, setCommentsCount] = useState(0);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const placeholder = 'Share your thoughts here...';
  const authError = 'Please login first, then you will can comment recipes!';

  // Pagination for comments
  const itemsPerPage = 4;
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState();
  const [emojiAnchorEl, setEmojiAnchorEl] = useState(null);

  const emojiPickerOpen = Boolean(emojiAnchorEl);
  const emojiPickerId = emojiPickerOpen ? 'comment-emoji-picker' : undefined;

  const [ratingStars, setRatingStars] = useState();

  const formik = useFormik({
    initialValues: {
      textarea: '',
      ratingTaste: null,
      ratingValueForMoney: null,
      ratingOriginality: null
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
  }, [id]);

  const getComments = async () => {
    try {
      let response;

      if (updateComments) {
        response = await updateComments({ recipeId: id, page });
      } else {
        response = await Recipe.getReviewsAndComments({ recipeId: id, page });
      }

      setNumberOfPages(countCommentsPages(response.data.count));
      setCommentsCount(response.data.count);
      setComments(response.data.results);
    } catch (e) {
      console.log(e);
    }
  };

  const countCommentsPages = count => {
    const isRemainExists = count % itemsPerPage > 0;
    let pages = Math.floor(count / itemsPerPage);
    return isRemainExists ? ++pages : pages;
  };

  const ratings = [
    { type: 1, value: +formik.values.ratingTaste },
    { type: 2, value: +formik.values.ratingValueForMoney },
    { type: 3, value: +formik.values.ratingOriginality }
  ];

  const uploadComment = async ({ textarea, ratingTaste, ratingValueForMoney, ratingOriginality }) => {
    if (!isAuthorized) {
      return;
    }

    const ratings = [
      { type: 1, value: +ratingTaste },
      { type: 2, value: +ratingValueForMoney },
      { type: 3, value: +ratingOriginality }
    ];

    try {
      const targetComment = {
        id: +id,
        text: textarea
      };

      let response;
      if (updateComments) {
        response = await addComment(targetComment);
      } else {
        if (isUserRecipeBuyer && !isRecipeRatedByUser && ratings.every(el => el.value)) {
          ratings.map(async item => {
            if (0 < item.value && item.value <= 5) {
              let itemResponse = await Recipe.uploadRating({ id: +id, ...item });
            }
          });
          response = await Recipe.uploadReviews(targetComment);
          router.reload();
        } else {
          response = await Recipe.uploadComments(targetComment);
        }
      }

      if (response.status === 201) {
        getComments();
        formik.values.textarea = '';
        formik.values.ratingTaste = null;
        formik.values.ratingValueForMoney = null;
        formik.values.ratingOriginality = null;
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
  const deleteReview = async commentId => {
    try {
      let response;

      if (deleteCommentHandle) {
        response = await deleteCommentHandle(commentId);
      } else {
        response = await Recipe.deleteReview(commentId);
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

  const loadMoreHandler = async () => {
    if (page === numberOfPages) {
      return;
    }

    try {
      setIsLoadingMore(true);
      let response;
      if (updateComments) {
        response = await updateComments({ recipeId: id, page: page + 1 });
      } else {
        response = await Recipe.getReviewsAndComments({ recipeId: id, page: page + 1 });
      }

      setPage(page + 1);

      setComments([...comments, ...response.data.results]);
      setIsLoadingMore(false);
    } catch (e) {
      console.log(e);
      setIsLoadingMore(false);
    }
  };

  const RateParameter = props => {
    const { text, formik, value, average } = props;

    return (
      <div className={classes.rate_parameter_wrapper}>
        <div className={classes.rate_parameter_text}>{text}</div>
        {isUserRecipeBuyer && !isRecipeRatedByUser && (
          <div className={classes.rate_parameter_stars}>
            <Rating
              emptyIcon={<StarBorderIcon htmlColor="#FFAA00" fontSize="24px" />}
              classes={{
                icon: classes.rate_parameter_stars_icon,
                iconEmpty: classes.rate_parameter_stars_icon_empty,
                iconFilled: classes.rate_parameter_stars_icon_filled
              }}
              name={value}
              value={formik.values[value]}
              precision={1}
              onChange={(event, newValue) => {
                if (!isAuthorized) {
                  return dispatch(modalActions.open('register'));
                }

                formik.setFieldValue(value, newValue);
              }}
            />
          </div>
        )}
        <div className={classes.rate_parameter_line}>
          <LinearProgress
            classes={{
              root: classes.rate_parameter_line_root,
              colorPrimary: classes.rate_parameter_line_colorPrimary,
              bar: classes.rate_parameter_line_bar
            }}
            variant="determinate"
            value={average ? (average / 5) * 100 : 0}
          />
        </div>
        <div className={classes.rate_parameter_average}>
          {average ? average.toFixed(1) : '-'}
          <StarIcon htmlColor="#FFAA00" fontSize="20px" />
        </div>
      </div>
    );
  };

  const handleSmileClick = event => {
    setEmojiAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setEmojiAnchorEl(null);
  };

  const handleEmojiSelect = emoji => {
    formik.setFieldValue('textarea', formik.values.textarea + emoji.native);
    handleClose();
  };

  return (
    <div className={classes.comments}>
      <div className={classes.rating}>
        <div className={classes.rating_header}></div>
        <div className={classes.rating_body}>
          <RateParameter
            text="Taste"
            formik={formik}
            value="ratingTaste"
            average={Number.parseFloat(rating.taste) || null}
          />
          <RateParameter
            text="Value for Money"
            formik={formik}
            value="ratingValueForMoney"
            average={Number.parseFloat(rating.valueForMoney) || null}
          />
          <RateParameter
            text="Originality"
            formik={formik}
            value="ratingOriginality"
            average={Number.parseFloat(rating.originality) || null}
          />
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
            <>
              <IconButton onClick={handleSmileClick}>
                <BasicIcon icon={SmileIcon} color="#566481" />
              </IconButton>
              <Popover
                disableScrollLock
                id={emojiPickerId}
                open={emojiPickerOpen}
                anchorEl={emojiAnchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center'
                }}>
                <Picker onSelect={handleEmojiSelect} showPreview={false} showSkinTones={false} />
              </Popover>

              <Button
                disabled={ratings.some(el => el.value) && ratings.some(el => !el.value)}
                endIcon={<BasicIcon icon={ArrowRightIcon} color="white" size="16px" />}
                classes={{
                  root: classes.comments__input__button,
                  label: classes.comments__input__button__label
                }}
                type="submit"
                variant="contained"
                color="primary">
                Post it!
              </Button>
            </>
          }
        />

        {formik.touched.textarea && formik.errors.textarea ? (
          <div className={classes.comments__input__error}>{formik.errors.textarea}</div>
        ) : null}

        {!isAuthorized && <div className={classes.comments__input__error}>{authError}</div>}
      </form>

      <div className={classes.comments__body}>
        <h3 className={classes.comments__subtitle}>{comments && commentsCount} Comments</h3>

        {comments?.length !== 0 &&
          comments
            ?.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
            ?.map((comment, index) => {
              let isReview = Boolean(comment?.avg_user_rating);
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
                  deleteReview={deleteReview}
                  uploadLikeHandler={uploadLikeHandler}
                  rating={comment?.avg_user_rating}
                />
              );
            })}

        {page !== numberOfPages && (
          <div className={classes.load_more_wrapper}>
            <Button
              startIcon={isLoadingMore && <Spinner />}
              onClick={loadMoreHandler}
              className={classes.load_more_button}>
              Load more
            </Button>
          </div>
        )}

        {/*{comments?.results?.length !== 0 && (*/}
        {/*  <Pagination*/}
        {/*    classes={{ root: classes.comments__pagination }}*/}
        {/*    count={numberOfPages}*/}
        {/*    onChange={(event, page) => setPage(page)}*/}
        {/*  />*/}
        {/*)}*/}
      </div>
    </div>
  );
};

export default CommentBlock;
