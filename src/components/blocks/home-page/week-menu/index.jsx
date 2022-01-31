import React, { useEffect, useState } from 'react';
import classes from './index.module.scss';
import Recipe from '@/api/Recipe';
import { Box, IconButton, List } from '@material-ui/core';
import { RecipeCard } from '@/components/basic-blocks/recipe-card';
import { ReactComponent as ArrowLeftIcon } from '../../../../../public/icons/Arrow Left 2/Line.svg';
import { ReactComponent as ArrowRightIcon } from '../../../../../public/icons/Arrow Right 2/Line.svg';
import { Carousel } from 'react-responsive-carousel';
import { ButtonBack, ButtonNext, CarouselProvider, Slide, Slider } from 'pure-react-carousel';
import { CardSearch } from '@/components/elements/card';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import styled from 'styled-components';
import Cookies from 'cookies';
import { BasicIcon } from '@/components/basic-elements/basic-icon';

const StyledSlider = styled(Slider)`
  display: flex;
  flex-direction: row;
  width: auto;
`;

const Arrows = props => {
  const { currentWeek, handleChangeWeek, weeksAmount } = props;
  return (
    <div className={classes.slider_arrows_container}>
      <IconButton
        className={classes.arrows_button}
        disabled={currentWeek === 0}
        onClick={() => handleChangeWeek(currentWeek - 1)}>
        <BasicIcon icon={ArrowLeftIcon} />
      </IconButton>
      <IconButton
        className={classes.arrows_button}
        disabled={currentWeek === weeksAmount - 1}
        onClick={() => handleChangeWeek(currentWeek + 1)}>
        <BasicIcon icon={ArrowRightIcon} />
      </IconButton>
    </div>
  );
};

const RecipeSlider = props => {
  const { recipes, currentWeek } = props;

  return (
    <div className={classes.slider_body}>
      {recipes?.length > 0 && (
        <>
          {recipes
            .filter(el => el?.pk)
            .map((recipe, index) => (
              <RecipeCard key={`${currentWeek}${index}${recipe?.pk}`} recipe={recipe} />
            ))}
        </>
      )}
    </div>
  );
};

export const WeekMenuBlock = props => {
  const { data } = props;
  const [recipes, setRecipes] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(0);
  const currentWeekRecipes = recipes?.[currentWeek];
  useEffect(async () => {
    try {
      const recipesArray = data?.map(el => el.recipes);
      setRecipes(recipesArray);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleChangeWeek = newWeekIndex => {
    if (0 <= newWeekIndex && newWeekIndex < recipes?.length) {
      const slider = document.getElementsByClassName(classes.slider_body)?.[0];
      slider.scrollLeft = 0;
      setCurrentWeek(newWeekIndex);
    }
  };

  const arrowsProps = {
    currentWeek,
    weeksAmount: recipes?.length,
    handleChangeWeek
  };

  return (
    <section className={classes.container}>
      <Arrows {...arrowsProps} />
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <span className={classes.slider_title}>Browse Weekmenu</span>
      </Box>
      <div className={classes.slider_subtitle}>Let's go to meet new sensations</div>
      <RecipeSlider recipes={currentWeekRecipes} currentWeek={currentWeek} />
    </section>
  );
};
