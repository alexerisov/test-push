import React, { useEffect, useState } from 'react';
import classes from './index.module.scss';
import Recipe from '@/api/Recipe';
import { Box, IconButton } from '@material-ui/core';
import { RecipeCard } from '@/components/basic-blocks/recipe-card';
import { ReactComponent as ArrowLeftIcon } from '../../../../../public/icons/Arrow Left 2/Line.svg';
import { ReactComponent as ArrowRightIcon } from '../../../../../public/icons/Arrow Right 2/Line.svg';
import { Carousel } from 'react-responsive-carousel';

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
  const [recipes, setRecipes] = useState([]);
  const [currentSlide, setSlide] = useState(1);

  const arrowsProps = {
    recipes,
    setRecipes,
    currentSlide,
    setSlide
  };

  useEffect(async () => {
    try {
      const weekmenu = await Recipe.getWeekmenu();
      const result = weekmenu.data?.reduce((acc, val) => [...acc, ...val.recipes], []);
      setRecipes(result);
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <section className={classes.container}>
      <Arrows {...arrowsProps} />
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <span className={classes.slider_title}>Browse Weekmenu</span>
      </Box>
      <div className={classes.slider_subtitle}>Let's go to meet new sensations</div>
      {console.log(recipes)}
      <RecipeSlider recipes={recipes} currentSlide={currentSlide} />
    </section>
  );
};
