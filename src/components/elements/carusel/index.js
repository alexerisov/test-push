import React from 'react';
import classes from "./carusel.module.scss";
import Recipe from '@/api/Recipe';

const slideWidth = 30;

const sleep = (ms = 0) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const CarouselSlideItem = ({pos, idx, activeIdx, itemList}) => {

    const createItem = (position, idx) => {
      const item = {
          styles: {
              transform: `translateX(${position * slideWidth}rem)`,
          },
          image: itemList[idx].image,
      };

      switch (position) {
          case length - 1:
              item.styles = {...item.styles, opacity: 0};
              break;
          case length + 1:
              item.styles = {...item.styles, opacity: 0};
              break;
          case length:
              break;
          default:
              item.styles = {...item.styles};
              break;
      }

      return item;
    };
    const item = createItem(pos, idx, activeIdx);

    return (
        <li className={classes.carousel__slideItem} style={item.styles}>
            <div className={classes.carousel__slideItemImgLink}>
                <img src={item.image} alt='Banner' />
            </div>
        </li>
    );
};

const Carousel = () => {
    const [itemList, setItemList] = React.useState([]);
    const [items, setItems] = React.useState([]);
    const [isTicking, setIsTicking] = React.useState(false);
    const [activeIdx, setActiveIdx] = React.useState(0);
    const bigLength = items.length;

    const prevClick = (jump = 1) => {
        if (!isTicking) {
            setIsTicking(true);
            setItems((prev) => {
                return prev.map((_, i) => prev[(i + jump) % bigLength]);
            });
        }
    };

    const nextClick = (jump = 1) => {
        if (!isTicking) {
            setIsTicking(true);
            setItems((prev) => {
                return prev.map(
                    (_, i) => prev[(i - jump + bigLength) % bigLength],
                );
            });
        }
    };

    React.useEffect(() => {
      Recipe.getHomepageBanners()
      .then((data) => {
        setItemList(data.data);
      });
    }, []);

    React.useEffect(() => {
      setItems(Array.from(Array(itemList.length).keys()));
    }, [itemList]);

    React.useEffect(() => {
        if (isTicking) sleep(300).then(() => setIsTicking(false));
    }, [isTicking]);

    return (
        <div className={classes.carousel__wrap}>
            <div className={classes.carousel__inner}>
                <button className={classes.carousel__btn__prev} onClick={() => prevClick()}>
                    <i className={classes.carousel__btn_arrow__left} />
                </button>
                <div className={classes.carousel__container}>
                    <ul className={classes.carousel__slide_list}>
                        {items.map((pos, i) => (
                            <CarouselSlideItem
                                key={i}
                                idx={i}
                                pos={pos}
                                activeIdx={activeIdx}
                                itemList={itemList}
                            />
                        ))}
                    </ul>
                </div>
                <button className={classes.carousel__btn__next} onClick={() => nextClick()}>
                    <i className={classes.carousel__btn_arrow__right} />
                </button>
            </div>
        </div>
    );
};

export default Carousel;