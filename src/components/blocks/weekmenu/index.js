import React, { useEffect, useState } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import classes from './index.module.scss';
import { CardSearch } from '@/components/elements/card';
import styled from 'styled-components';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { PUBLISH_STATUS } from '@/utils/datasets';

const StyledSlider = styled(Slider)`
  display: flex;
  flex-direction: row;
  width: auto;
`;

const Weekmenu = ({ result, token }) => {
  const [widthWindow, setWidthWindow] = useState();
  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    setWidthWindow(innerWidth);
  }, []);

  const visibleSlides = () => {
    if (widthWindow > 1400) {
      return 3.5;
    } else if (widthWindow <= 1400) {
      return 2.5;
    }
  };
  return (
    <div className={classes.weekmenu}>
      <CarouselProvider
        naturalSlideWidth={265}
        naturalSlideHeight={350}
        step={2}
        visibleSlides={visibleSlides()}
        totalSlides={result.length}>
        <div className={classes.weekmenu__row}>
          <h2 className={classes.weekmenu__title}>Weekmenu</h2>
          <div className={classes.weekmenu__controls}>
            <ButtonBack>
              <img src="icons/Arrow Left 2/Line.svg" alt="arrow-back" />
            </ButtonBack>
            <ButtonNext>
              <img src="icons/Arrow Right 2/Line.svg" alt="arrow-next" />
            </ButtonNext>
          </div>
        </div>
        <StyledSlider>
          {result && result.length !== 0 ? (
            result.map((recipe, index) => {
              if (result.filter(el => el.publishStatus === PUBLISH_STATUS.published))
                return (
                  <Slide key={`${recipe.pk}-${index}`}>
                    <CardSearch
                      token={token}
                      title={recipe?.title}
                      image={recipe?.images[0]?.url}
                      name={recipe?.user?.full_name}
                      city={recipe?.user?.city}
                      likes={recipe?.likes_number}
                      isParsed={recipe?.is_parsed}
                      publishStatus={recipe?.publish_status}
                      hasVideo={recipe?.video}
                      cookingTime={recipe?.cooking_time}
                      cookingSkill={recipe?.cooking_skills}
                      cookingTypes={recipe?.types}
                      price={recipe?.price}
                      id={recipe.pk}
                    />
                  </Slide>
                );
            })
          ) : (
            <p className={classes.search__NoResult}>No Recipes Found</p>
          )}
        </StyledSlider>
      </CarouselProvider>
    </div>
  );
};

export default Weekmenu;
