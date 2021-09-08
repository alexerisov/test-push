import React from 'react';
import Rating from 'react-rating';

import FullStar from './fullStar.svg';
import EmptyStar from './emptyStar.svg';

import classes from './index.module.scss';

const RatingComponent = ({ rating, handleRating }) => {
  const fullStar = (
    <img src={FullStar} alt="full star" className={classes.star}/>
  );

  const emptyStar = (
    <img src={EmptyStar} alt="empty star" className={classes.star}/>
  );

  return (
    <Rating
      initialRating={rating}
      fullSymbol={fullStar}
      emptySymbol={emptyStar}
      onChange={handleRating}
    />
  );
};

export default RatingComponent;
