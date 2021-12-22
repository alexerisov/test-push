import React, { useEffect, useState, useRef } from 'react';
import classes from './index.module.scss';
import CardHighestMeals from '@/components/elements/card-highest-meals';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Recipe from '@/api/Recipe.js';

const HighestRatedMealsBlock = () => {
  const titleElement = useRef();

  const CARDS_QUANTITY = 6;
  const POSITION = {
    first: 0,
    second: 1,
    third: 2
  };

  const [recipes, setRecipes] = useState([]);
  const [position, setPosition] = useState(POSITION.first);
  const [recipesPart, setRecipesPart] = useState([]);
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);

  useEffect(() => {
    Recipe.getTopRatedMeals().then(data => {
      setRecipes(data.data);
    });
  }, []);

  useEffect(() => {
    const newRecipesPart = recipes.filter((item, index) => {
      return index < position * CARDS_QUANTITY + CARDS_QUANTITY && index >= position * CARDS_QUANTITY;
    });
    setRecipesPart(newRecipesPart);
    if (position === POSITION.first) {
      setStep1(true);
      setStep2(false);
      setStep3(false);
    } else if (position === POSITION.second) {
      setStep1(false);
      setStep2(true);
      setStep3(false);
    } else {
      setStep1(false);
      setStep2(false);
      setStep3(true);
    }
  }, [position, recipes]);

  const scrollToTopViewMealTitle = () => {
    titleElement.current.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });
  };

  const onClickReturn = () => {
    if (position > POSITION.first) {
      setPosition(position - 1);
      scrollToTopViewMealTitle();
    }
  };

  const onClickForward = () => {
    if (position < POSITION.third) {
      setPosition(position + 1);
      scrollToTopViewMealTitle();
    }
  };

  const onClickPosition = e => {
    setPosition(+e.currentTarget.id);
  };

  return (
    <section className={classes.ratedMeals}>
      <div className={classes.ratedMeals__title}>
        <h2 ref={titleElement}>Top Voted Meals</h2>
        <span className={classes.ratedMeals__lineContainer}>
          <span className={classes.ratedMeals__yellowLine} />
          <span className={classes.ratedMeals__blueСircle} />
        </span>
      </div>
      <div className={classes.container}>
        {recipesPart.map((recipe, index) => {
          return (
            <CardHighestMeals
              key={`${recipe.pk}-${index}`}
              title={recipe?.title}
              image={recipe?.images?.[0]?.url}
              name={recipe?.user?.full_name}
              city={recipe?.user?.city}
              likes={recipe?.likes_number}
              id={recipe.pk}
            />
          );
        })}
      </div>
      <div className={classes.containerButtons}>
        <ArrowBackIcon
          style={{
            color: '#FFAA00',
            fontSize: 24,
            cursor: 'pointer',
            marginRight: '34px'
          }}
          onClick={onClickReturn}
        />
        <button
          className={step1 ? classes.button_type_lineLong : classes.button_type_lineShort}
          onClick={onClickPosition}
          id={POSITION.first}></button>
        <button
          className={step2 ? classes.button_type_lineLong : classes.button_type_lineShort}
          onClick={onClickPosition}
          id={POSITION.second}></button>
        <button
          className={step3 ? classes.button_type_lineLong : classes.button_type_lineShort}
          onClick={onClickPosition}
          id={POSITION.third}></button>
        <ArrowForwardIcon
          style={{
            color: '#FFAA00',
            fontSize: 24,
            cursor: 'pointer',
            marginLeft: '34px'
          }}
          onClick={onClickForward}
        />
      </div>
    </section>
  );
};

export default HighestRatedMealsBlock;
