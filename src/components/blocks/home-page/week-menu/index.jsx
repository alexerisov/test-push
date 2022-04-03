import React, { useEffect, useState } from 'react';
import classes from './index.module.scss';
import { Box, IconButton } from '@material-ui/core';
import { RecipeCard } from '@/components/basic-blocks/recipe-card';
import ArrowLeftIcon from '~public/icons/Arrow Left 2/Line.svg';
import ArrowRightIcon from '~public/icons/Arrow Right 2/Line.svg';
import { Slider } from 'pure-react-carousel';
import styled from 'styled-components';
import { BasicIcon } from '@/components/basic-elements/basic-icon';
import { useTranslation } from 'next-i18next';

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
  const { t } = useTranslation('homePage');
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
        <span className={classes.slider_title}>{t('weekmenuBlock.title')}</span>
      </Box>
      <div className={classes.slider_subtitle}>{t('weekmenuBlock.subtitle')}</div>
      <RecipeSlider recipes={currentWeekRecipes} currentWeek={currentWeek} />
    </section>
  );
};
