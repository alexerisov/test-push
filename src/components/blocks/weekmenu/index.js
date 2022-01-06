import React, { useEffect, useState } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import classes from './index.module.scss';
import { CardSearch } from '@/components/elements/card';
import styled from 'styled-components';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { PUBLISH_STATUS } from '@/utils/datasets';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const StyledSlider = styled(Slider)`
  display: flex;
  flex-direction: row;
  width: auto;
`;

const Weekmenu = ({ weekmenu, token }) => {
  const tablet = useMediaQuery('(max-width: 1025px)');
  const mobile = useMediaQuery('(max-width: 576px)');

  return (
    <div className={classes.weekmenu}>
      <CarouselProvider
        naturalSlideWidth={261}
        naturalSlideHeight={339}
        step={mobile ? 1 : tablet ? 2 : 2}
        visibleSlides={mobile ? 1.1 : tablet ? 2 : 2.8}
        totalSlides={weekmenu?.length}>
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
          {weekmenu && weekmenu?.length !== 0
            ? weekmenu?.map((recipe, index) => {
                return (
                  <Slide key={`${recipe.pk}-${index}`}>
                    <CardSearch
                      token={token}
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
                      price={recipe?.price}
                      id={recipe.pk}
                    />
                  </Slide>
                );
              })
            : null}
        </StyledSlider>
      </CarouselProvider>
    </div>
  );
};

export default Weekmenu;
