import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import $clamp from 'clamp-js';
import classes from './index.module.scss';
import Recipe from '@/api/Recipe.js';
import { modalActions } from '@/store/actions';
import { connect } from 'react-redux';

const MealOfWeekBlock = props => {
  const description = useRef();

  useEffect(() => {
    $clamp(description.current, { clamp: 3 });
  });

  const recipeId = props?.meal?.pk;

  const [likeRecipe, setLikeRecipe] = useState(false);
  const [likesNumber, setLikesNumber] = useState(false);
  const [ingredients, setIngredients] = useState(false);

  useEffect(() => {
    setLikeRecipe(props?.meal?.user_liked);
    setLikesNumber(props?.meal?.likes_number);
    setIngredients(props?.meal?.ingredients.slice(0, 4));
  }, [props.meal]);

  const openRegisterPopup = name => {
    return () => {
      props.dispatch(modalActions.open(name)).then(result => {
        // result when modal return promise and close
      });
    };
  };

  const onClickLike = () => {
    Recipe.uploadLikesRecipe(recipeId)
      .then(res => {
        if (res.data.like_status === 'deleted') {
          setLikeRecipe(false);
          likesNumber > 0 && setLikesNumber(likesNumber - 1);
        } else {
          setLikeRecipe(true);
          setLikesNumber(likesNumber + 1);
        }
      })
      .catch(err => console.log(err));
  };

  const image = props?.meal?.images[0].url ? props?.meal?.images[0].url : '';
  return (
    <section className={classes.meal}>
      <div className={classes.meal__title}>
        <Link href={`/recipe/${recipeId}`}>
          <h2 className={classes.meal__title__text}>Meal of the week</h2>
        </Link>

        <span className={classes.meal__lineContainer}>
          <span className={classes.meal__yellowLine} />
          <span className={classes.meal__blueСircle} />
        </span>
      </div>
      <div className={classes.meal__content}>
        <div className={classes.meal__special}>Special</div>

        <Link href={`/recipe/${recipeId}`}>
          <div className={classes.meal__images__circle} style={{ backgroundImage: `url(${image})` }}>
            <img src="/images/index/go.svg" className={classes.meal__images__circle_play} />
            <div className={classes.meal__images__circle__back} />
          </div>
        </Link>

        <div className={classes.meal__images__square}>
          <h3 className={classes.meal__recipe__tltle_mobile}>{props?.meal?.title}</h3>
        </div>
        <div className={classes.meal__recipe}>
          <h3 className={classes.meal__recipe__tltle}>{props?.meal?.title}</h3>
          <p
            className={classes.meal__recipe__subtitle}
            dangerouslySetInnerHTML={{ __html: props?.meal?.description }}
            ref={description}></p>
          <div className={classes.meal__recipe__ingredientsTitleContainer}>
            <h4 className={classes.meal__recipe__ingredientsTitle}>Ingredients</h4>
            <a className={classes.meal__recipe__link} href={`/recipe/${props?.meal?.pk}`}>
              View recipe
            </a>
          </div>

          <div className={classes.meal__recipe__ingredientsContainer}>
            {ingredients && ingredients.length !== 0
              ? ingredients.map((ingredient, index) => {
                  return (
                    <div className={classes.meal__recipe__ingredientsItem} key={`${ingredient.recipe}-${index}`}>
                      <p className={classes.meal__recipe__ingredientsName}>{ingredient.title}</p>
                    </div>
                  );
                })
              : 'no Ingredients'}
          </div>

          <h4 className={classes.meal__recipe__ingredientsTitle}>Nutrition value</h4>
          <div className={classes.meal__recipe__nutritionContainer}>
            <div className={classes.meal__recipe__nutritionItem}>
              <p className={classes.meal__recipe__nutritionsQuantity}>
                {props?.meal?.calories ? props?.meal?.calories : '-'}
              </p>
              <p className={classes.meal__recipe__nutritionsName}>Calories</p>
            </div>
            <div className={classes.meal__recipe__nutritionItem}>
              <p className={classes.meal__recipe__nutritionsQuantity}>
                {props?.meal?.proteins ? `${props?.meal?.proteins}%` : '-'}
              </p>
              <p className={classes.meal__recipe__nutritionsName}>Protein</p>
            </div>
            <div className={classes.meal__recipe__nutritionItem}>
              <p className={classes.meal__recipe__nutritionsQuantity}>
                {props?.meal?.fats ? `${props?.meal?.fats}%` : '-'}
              </p>
              <p className={classes.meal__recipe__nutritionsName}>Fat</p>
            </div>
            <div className={classes.meal__recipe__nutritionItem}>
              <p className={classes.meal__recipe__nutritionsQuantity}>
                {props?.meal?.carbohydrates ? props?.meal?.carbohydrates : '-'}
              </p>
              <p className={classes.meal__recipe__nutritionsName}>Carbs</p>
            </div>
          </div>
          <div className={classes.meal__recipe__likes}>
            <button
              className={classes.meal__recipe__likesButton}
              onClick={!props.account.hasToken ? openRegisterPopup('register') : onClickLike}>
              <img
                src={likeRecipe ? '/images/index/Icon awesome-heart.svg' : '/images/index/heart-icon-yellow-null.svg'}
                className={classes.meal__recipe__likesIcon}
              />
              <span className={classes.meal__recipe__likesText}>
                {!likeRecipe ? 'Vote this recipe' : 'There is a vote!'}
              </span>
            </button>
            <div className={classes.meal__recipe__likesQuantity}>
              <img src="/images/index/Icon awesome-heart.svg" className={classes.meal__recipe__likesIconQuantity} />
              <span>{Number(likesNumber)} Votes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default connect(state => ({
  account: state.account
}))(MealOfWeekBlock);
