import React, { useEffect, useRef, useState } from 'react';
import classes from './index.module.scss';
import Recipe from '@/api/Recipe';
import { Box, IconButton } from '@material-ui/core';
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
              <CardSearch
                key={`${recipe.pk}-${index}`}
                title={recipe?.title}
                image={recipe?.images?.[0]?.url}
                name={recipe?.user?.full_name}
                city={recipe?.user?.city}
                likes={recipe?.likes_number}
                isParsed={recipe?.is_parsed}
                publishStatus={recipe?.publish_status}
                hasVideo={recipe?.video}
                cookingTime={recipe?.cooking_time}
                cookingSkill={recipe?.cooking_skills}
                cookingTypes={recipe?.types}
                user_saved_recipe={recipe?.user_saved_recipe}
                price={recipe?.price}
                token={props.token}
                id={recipe.pk}
                unsalable={true}
              />
            ))}
        </>
      )}
    </div>
  );
};

export const PopularRecipesBlock = props => {
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
        <span className={classes.slider_title}>Popular Recipes</span>
      </Box>
      <div className={classes.slider_subtitle}>Let's go to meet new sensations</div>
      <RecipeSlider recipes={data} scrollRef={scrollRef} />
    </section>
  );
};
