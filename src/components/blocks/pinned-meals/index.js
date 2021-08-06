import React, { useEffect, useState} from 'react';
import classes from "./index.module.scss";
import CardPinnedMeals from "@/components/elements/card-pinned-meals";
import Recipe from '@/api/Recipe.js';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import styled from 'styled-components';
import { NoSsr } from '@material-ui/core';

const StyledSlider = styled(Slider)`
  display: flex;
  gap: 0 18px;
  flex-direction: row;
  width: auto;
`;

const PinnedMeals = () => {

  const [meals, setMeals] = useState([]);
  // const [mealsArr, setMealsArr] = useState([]);

  const mealsArr = []

  useEffect(() => {
    getArrayPinnedMeals();
  }, []);

  const getArrayPinnedMeals = async () => {
    try {
      const response = await Recipe.getPinnedMeals();
      setMeals(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  meals.forEach((item, index) => {
    mealsArr.push(
      <Slide key={index} index={index} style={{paddingBottom: 0}}>
          <CardPinnedMeals
            key={item.pk}
            pk={item.pk}
            title={item.title}
            raitingValue={item.avg_rating}
            avatar={item?.images[0]?.url}
            id={item?.pk}
          />
      </Slide>
    )
  })

  return ( <section className={classes.container}>
      <CarouselProvider
        naturalSlideWidth={200}
        naturalSlideHeight={0}
        totalSlides={meals.length}
      >
        <Slider>
        {mealsArr}
        </Slider>
      </CarouselProvider>
    </section>
  );
};
  
export default PinnedMeals;