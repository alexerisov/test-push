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
      <IconButton className={classes.arrows_button} size="22px" onClick={() => setSlide(currentSlide - 5)}>
        <ArrowLeftIcon />
      </IconButton>
      <IconButton className={classes.arrows_button} size="22px" onClick={() => setSlide(currentSlide + 5)}>
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
      {recipes?.length > 0 && (
        <Carousel
          showArrows={false}
          showThumbs={false}
          centerMode
          swipeable={false}
          emulateTouch={false}
          centerSlidePercentage={100 / displayCount}
          showStatus={false}
          showIndicators={false}
          onClickThumb={() => console.log('clicked')}
          onClickItem={() => console.log('clicked')}
          selectedItem={currentSlide}>
          {recipes.map((recipe, index) => (
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
            />
          ))}
        </Carousel>
      )}
    </div>
  );
};

export const PopularRecipesBlock = () => {
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
        <span className={classes.slider_title}>Popular Recipes</span>
      </Box>
      <div className={classes.slider_subtitle}>Let's go to meet new sensations</div>
      <RecipeSlider recipes={recipes} currentSlide={currentSlide} />
    </section>
  );
};
