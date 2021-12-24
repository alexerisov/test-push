import React, { useEffect, useState } from 'react';
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

const StyledSlider = styled(Slider)`
  display: flex;
  flex-direction: row;
  width: auto;
`;

const Arrows = props => {
  const { recipes, setSlide, currentSlide } = props;
  return (
    <div className={classes.slider_arrows_container}>
      <IconButton
        className={classes.arrows_button}
        size="22px"
        onClick={() => setSlide((currentSlide - 5) % recipes?.length)}>
        <ArrowLeftIcon />
      </IconButton>
      <IconButton
        className={classes.arrows_button}
        size="22px"
        onClick={() => setSlide((currentSlide + 5) % recipes?.length)}>
        <ArrowRightIcon />
      </IconButton>
    </div>
  );
};

const RecipeSlider = props => {
  const { recipes, currentSlide } = props;

  const tablet = useMediaQuery('(max-width: 1025px)');
  const mobile = useMediaQuery('(max-width: 576px)');

  const displayCount = 5;

  return (
    <div className={classes.slider_body}>
      <Carousel
        showArrows={false}
        showThumbs={false}
        centerMode
        swipeable={false}
        emulateTouch={false}
        infiniteLoop
        centerSlidePercentage={100 / displayCount}
        showStatus={false}
        showIndicators={false}
        onClickThumb={() => console.log('clicked')}
        onClickItem={() => console.log('clicked')}
        selectedItem={currentSlide}>
        {recipes?.length > 0 && recipes.map(recipe => <RecipeCard key={recipe.pk} recipe={recipe} />)}
      </Carousel>
    </div>
  );
};

export const WeekMenuBlock = () => {
  // const { weekmenu } = props;
  const [recipes, setRecipes] = useState([]);
  const [currentSlide, setSlide] = useState(0);

  // const recipesArray = weekmenu?.map(el => el.recipes)?.flat();

  useEffect(async () => {
    try {
      const weekmenu = await Recipe.getWeekmenu('');
      const recipesArray = weekmenu?.data?.map(el => el.recipes);
      setRecipes(recipesArray?.flat()?.filter(el => el?.pk));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const arrowsProps = {
    recipes,
    setRecipes,
    currentSlide,
    setSlide
  };

  return (
    <section className={classes.container}>
      <Arrows {...arrowsProps} />
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <span className={classes.slider_title}>Browse Weekmenu</span>
      </Box>
      <div className={classes.slider_subtitle}>Let's go to meet new sensations</div>
      <RecipeSlider recipes={recipes} />
    </section>
  );
};
