import React, { useEffect, useState } from 'react';
import classes from './index.module.scss';
import { Box, IconButton } from '@material-ui/core';
import ArrowLeftIcon from '~public/icons/Arrow Left 2/Line.svg';
import ArrowRightIcon from '~public/icons/Arrow Right 2/Line.svg';
import { BasicIcon } from '@/components/basic-elements/basic-icon';
import { CardSearch } from '@/components/elements/card';
import { useTranslation } from 'next-i18next';

const Arrows = props => {
  const { currentWeek, handleChangeWeek, weeksAmount } = props;
  return (
    <div className={classes.slider_arrows_container}>
      <IconButton
        className={classes.slider_arrows_button}
        disabled={currentWeek === 0}
        onClick={() => handleChangeWeek(currentWeek - 1)}>
        <BasicIcon icon={ArrowLeftIcon} color="#FFAA00" />
      </IconButton>
      <IconButton
        className={classes.slider_arrows_button}
        disabled={currentWeek === weeksAmount - 1}
        onClick={() => handleChangeWeek(currentWeek + 1)}>
        <BasicIcon icon={ArrowRightIcon} color="#FFAA00" />
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
              <CardSearch key={`${recipe.pk}-${index}`} recipe={recipe} disableBorder={true} />
            ))}
        </>
      )}
    </div>
  );
};

export const Weekmenu = props => {
  const { t } = useTranslation('searchPage');
  const { data } = props;
  const [recipes, setRecipes] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(0);
  const currentWeekRecipes = recipes?.[currentWeek];

  useEffect(() => {
    const recipesArray = data?.map(el => el.recipes);
    setRecipes(recipesArray);
    setCurrentWeek(0);
  }, [data]);

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
    <div>
      <section className={classes.container}>
        <Arrows {...arrowsProps} />
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <span className={classes.slider_title}>{t('weekmenuTitle')}</span>
        </Box>
        <RecipeSlider recipes={currentWeekRecipes} currentWeek={currentWeek} />
      </section>
    </div>
  );
};
