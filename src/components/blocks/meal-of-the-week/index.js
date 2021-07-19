import React, { useState, useEffect } from 'react';
import classes from "./index.module.scss";
import Recipe from '@/api/Recipe.js';

const MealOfWeekBlock = (props) => {

  const recipeId = props?.meal?.pk;

  const [likeRecipe, setLikeRecipe] = useState(false);

  useEffect(() => {
    setLikeRecipe(props?.meal?.user_liked);
  }, [props.meal])

  const onClickLike = () => {
    Recipe.uploadLikesRecipe(recipeId)
    .then(() => {
      setLikeRecipe(true);
    })
    .catch((err) => console.log(err));
  };

  const image = props?.meal?.images[0].url ? props?.meal?.images[0].url : '';
    return (
      <section className={classes.meal}>
        
        <div className={classes.meal__title}>
          <h2>Meal of the week</h2>
          <span className={classes.meal__lineContainer}>
            <span className={classes.meal__yellowLine} />
            <span className={classes.meal__blueСircle} />
          </span>
        </div>
        <div className={classes.meal__content}>
          <div className={classes.meal__special}>Special</div>
          <div
            className={classes.meal__images__circle}
            style={{backgroundImage: `url(${image})`}}
          ></div>
          <div className={classes.meal__images__square}></div>
          <div className={classes.meal__recipe}>
            <h3 className={classes.meal__recipe__tltle}>{props?.meal?.title}</h3>
            <p
              className={classes.meal__recipe__subtitle}
              dangerouslySetInnerHTML={{__html: props?.meal?.description}}>
            </p>
            <div className={classes.meal__recipe__ingredientsTitleContainer}>
              <h4 className={classes.meal__recipe__ingredientsTitle}>Ingredients</h4>
              <a className={classes.meal__recipe__link} href={`/recipe/${props?.meal?.pk}`}>
                View all
              </a>
            </div>
            
            <div className={classes.meal__recipe__ingredientsContainer}>
              {
                props?.meal?.ingredients.length !== 0
                ?
                props?.meal?.ingredients.map((ingredient, index) => {
                  return <div className={classes.meal__recipe__ingredientsItem} key={`${ingredient.recipe}-${index}`}>
                          <p className={classes.meal__recipe__ingredientsName}>{ingredient.title}</p>
                          <p className={classes.meal__recipe__ingredientsQuantity}>{ingredient.quantity}</p>
                        </div>;
                })
                : 'no Ingredients'
              }
              
              
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
              <button className={classes.meal__recipe__likesButton} onClick={onClickLike} >
                <img src="/images/index/Icon awesome-heart.svg" className={classes.meal__recipe__likesIcon}/>
                <span className={classes.meal__recipe__likesText}>{!likeRecipe ? "Vote this recipe" : "There is a vote!"}</span>
              </button>
              <div className={classes.meal__recipe__likesQuantity}>
                <img src="/images/index/Icon awesome-heart.svg" className={classes.meal__recipe__likesIconQuantity}/>
                <span>{props?.meal?.likes_number ?? 0} Votes</span>
              </div>
            </div>
          </div>
        </div>
        <img src="/images/index/bg_wheat.png" className={classes.meal__ear}/>
      </section>
    );
  };
  
export default MealOfWeekBlock;