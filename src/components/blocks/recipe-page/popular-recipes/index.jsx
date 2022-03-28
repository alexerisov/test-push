import React, { useEffect, useRef, useState } from 'react';
import classes from './index.module.scss';
import Recipe from '@/api/Recipe';
import { Box, IconButton } from '@material-ui/core';
import { RecipeCard } from '@/components/basic-blocks/recipe-card';
import ArrowLeftIcon from '~public/icons/Arrow Left 2/Line.svg';
import ArrowRightIcon from '~public/icons/Arrow Right 2/Line.svg';
import { Carousel } from 'react-responsive-carousel';
import { ButtonBack, ButtonNext, CarouselProvider, Slide, Slider } from 'pure-react-carousel';
import { CardSearch } from '@/components/elements/card';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import styled from 'styled-components';
import Cookies from 'cookies';
import { BasicIcon } from '@/components/basic-elements/basic-icon';
import { useTranslation } from 'next-i18next';

const StyledSlider = styled(Slider)`
  display: flex;
  flex-direction: row;
  width: auto;
`;

const Arrows = props => {
  const { handleArrowsButton, scrollRef, isRightButtonDisabled, isLeftButtonDisabled } = props;
  return (
    <div className={classes.slider_arrows_container}>
      <IconButton className={classes.arrows_button} size="22px" disabled={0} onClick={() => handleArrowsButton('left')}>
        <BasicIcon icon={ArrowLeftIcon} />
      </IconButton>
      <IconButton
        className={classes.arrows_button}
        size="22px"
        disabled={0}
        onClick={() => handleArrowsButton('right')}>
        <BasicIcon icon={ArrowRightIcon} />
      </IconButton>
    </div>
  );
};

const RecipeSlider = props => {
  const { recipes, scrollRef } = props;

  return (
    <div className={classes.slider_body} ref={scrollRef}>
      {recipes?.length > 0 && (
        <>
          {recipes
            .filter(el => el?.pk)
            .map((recipe, index) => (
              <CardSearch key={`${recipe.pk}-${index}`} recipe={recipe} />
            ))}
        </>
      )}
    </div>
  );
};

export const PopularRecipesBlock = props => {
  const { t } = useTranslation('recipePage');
  const { data } = props;

  const scrollRef = useRef(null);

  const handleArrowsButton = direction => {
    const directions = {
      left: -2,
      right: 2
    };
    const cardGap = 20;
    const cardsAmount = data?.length;
    const fullWidth = scrollRef.current.scrollWidth;
    const cardWidth = (fullWidth - (cardsAmount - 1) * cardGap) / cardsAmount;
    scrollRef.current.scrollLeft += cardWidth * directions[direction];
  };

  const arrowsProps = {
    handleArrowsButton,
    scrollRef
  };

  return (
    <section className={classes.container}>
      <Arrows {...arrowsProps} />
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <span className={classes.slider_title}>{t('popularRecipes.title')}</span>
      </Box>
      <div className={classes.slider_subtitle}>{t('popularRecipes.subtitle')}</div>
      <RecipeSlider recipes={data} scrollRef={scrollRef} />
    </section>
  );
};
