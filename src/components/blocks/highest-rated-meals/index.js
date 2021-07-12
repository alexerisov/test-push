import React from 'react';
import classes from "./index.module.scss";
import CardHighestMeals from "@/components/elements/card-highest-meals";
import Recipe from '@/api/Recipe.js';

const HighestRatedMealsBlock = () => {

  const [recipes, setRecipes] = React.useState([]);

  React.useEffect(() => {
    Recipe.getTopRatedMeals()
    .then((data) => {
      setRecipes(data.data);
    });
  },[]);

    return (
      <section className={classes.ratedMeals}>
        <div className={classes.ratedMeals__title}>
          <h2>Our top highest rated meals</h2>
          <span className={classes.ratedMeals__lineContainer}>
            <span className={classes.ratedMeals__yellowLine} />
            <span className={classes.ratedMeals__blueСircle} />
          </span>
        </div>
        <div className={classes.container}>
          {
            recipes.map((recipe, index) => {
              return <CardHighestMeals
                        key={`${recipe.pk}-${index}`}
                        title={recipe?.title}
                        image={recipe?.images[0]?.tag}
                        name={recipe?.user?.full_name}
                        city={recipe?.user?.city}
                        id={recipe.pk}
                      />;
            })
          }
        </div>
      </section>
    );
  };
  
export default HighestRatedMealsBlock;