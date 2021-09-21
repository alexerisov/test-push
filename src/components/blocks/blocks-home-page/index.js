import React, { useState, useEffect } from 'react';
import classes from './index.module.scss';

import AdvertisingBlocks from '@/api/AdvertisingBlocks';
import BannerBlocksHomePage from '@/components/elements/banner-blocks-home-page';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import styled from 'styled-components';

const StyledCarousel = styled(Carousel)`
  .carousel-slider {
    overflow: visible;
  }

  .control-dots {
    bottom: -50px;
    opacity: 0;

    .dot {
      background-color: #ffaa00;
      box-shadow: none;
    }
  }

  :hover {
    .control-dots {
      opacity: 1;
  }
`;

const BlocksHomePage = props => {
  const [blocks, setBlocks] = useState();

  useEffect(() => {
    AdvertisingBlocks.getBlocks().then(res => {
      setBlocks(res.data);
    });
  }, []);

  return blocks ? (
    <div className={classes.blocks}>
      <StyledCarousel
        infiniteLoop={true}
        showIndicators={true}
        showStatus={false}
        axis={'horizontal'}
        swipeable={true}
        interval="5000"
        stopOnHover={true}
        autoPlay={true}
        showThumbs={false}
        className={classes.carousel}
        renderArrowPrev={onClickHandler => (
          <button type="button" onClick={onClickHandler} className={classes.carousel__prev}>
            <NavigateBeforeIcon fontSize={'large'} />
          </button>
        )}
        renderArrowNext={onClickHandler => (
          <button type="button" onClick={onClickHandler} className={classes.carousel__next}>
            <NavigateNextIcon fontSize={'large'} />
          </button>
        )}>
        {blocks.map((item, index) => {
          return <BannerBlocksHomePage item={item} key={index} />;
        })}
      </StyledCarousel>
    </div>
  ) : (
    <div className={classes.blocks_none} />
  );
};

export default BlocksHomePage;
