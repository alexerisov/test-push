import React from 'react';
import classes from "./index.module.scss";

const MealOfWeekBlock = () => {
    return (
      <section className={classes.meal}>
        <div className={classes.meal__special}>Special</div>
        <div className={classes.meal__title}>
          <h2>Meal of the week</h2>
          <span className={classes.meal__lineContainer}>
            <span className={classes.meal__yellowLine} />
            <span className={classes.meal__blueСircle} />
          </span>
        </div>
        <div className={classes.meal__content}>
          <img src="/images/index/meal pic.png" className={classes.meal__images}/>
          <div className={classes.meal__recipe}>
            <h3 className={classes.meal__recipe__tltle}>Chicken Griller</h3>
            <p className={classes.meal__recipe__subtitle}>
              These popular bacon-wrapped chicken entrees are fantastic on grill,
              but they can also be baked on the griller. look for them in the meat section.
            </p>

            <h4 className={classes.meal__recipe__ingredientsTitle}>Ingredients</h4>
            <div className={classes.meal__recipe__ingredientsContainer}>
              <div className={classes.meal__recipe__ingredientsItem}>
                <p className={classes.meal__recipe__ingredientsName}>Chicken</p>
                <p className={classes.meal__recipe__ingredientsQuantity}>4 chicken breast</p>
              </div>
              <div className={classes.meal__recipe__ingredientsItem}>
                <p className={classes.meal__recipe__ingredientsName}>Chicken</p>
                <p className={classes.meal__recipe__ingredientsQuantity}>4 chicken breast</p>
              </div>
              <div className={classes.meal__recipe__ingredientsItem}>
                <p className={classes.meal__recipe__ingredientsName}>Chicken</p>
                <p className={classes.meal__recipe__ingredientsQuantity}>4 chicken breast</p>
              </div>
              <div className={classes.meal__recipe__ingredientsItem}>
                <p className={classes.meal__recipe__ingredientsName}>Chicken</p>
                <p className={classes.meal__recipe__ingredientsQuantity}>4 chicken breast</p>
              </div>
            </div>

            <h4 className={classes.meal__recipe__ingredientsTitle}>Nutrition value</h4>
            <div className={classes.meal__recipe__nutritionContainer}>
              <div className={classes.meal__recipe__nutritionItem}>
                <p className={classes.meal__recipe__nutritionsQuantity}>20</p>
                <p className={classes.meal__recipe__nutritionsName}>Calories</p>
              </div>
              <div className={classes.meal__recipe__nutritionItem}>
                <p className={classes.meal__recipe__nutritionsQuantity}>16%</p>
                <p className={classes.meal__recipe__nutritionsName}>Protein</p>
              </div>
              <div className={classes.meal__recipe__nutritionItem}>
                <p className={classes.meal__recipe__nutritionsQuantity}>25%</p>
                <p className={classes.meal__recipe__nutritionsName}>Fat</p>
              </div>
              <div className={classes.meal__recipe__nutritionItem}>
                <p className={classes.meal__recipe__nutritionsQuantity}>20</p>
                <p className={classes.meal__recipe__nutritionsName}>Carbs</p>
              </div>
            </div>
          </div>
        </div>
        <img src="/images/index/bg_wheat.png" className={classes.meal__ear}/>
      </section>
    );
  };
  
export default MealOfWeekBlock;