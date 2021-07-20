import React from 'react';
import classes from "./index.module.scss";
import Recipe from '@/api/Recipe';

const Carousel = () => {
    const FIRST_POSITION = 0;
    const [itemList, setItemList] = React.useState([]);
    const [position, setPosition] = React.useState(FIRST_POSITION);

    const prevClick = () => {
        if (position === FIRST_POSITION ) {
            setPosition(itemList.length - 1);
        } else {
            setPosition(position - 1);
        }
    };

    const nextClick = () => {
        if (position === (itemList.length - 1)) {
            setPosition(FIRST_POSITION);
        } else {
            setPosition(position + 1);
        }
    };

    React.useEffect(() => {
      Recipe.getHomepageCarouselItems()
      .then((data) => {
        setItemList(data.data);
      });
    }, []);

    React.useEffect(() => {
        const timer = setInterval(() => {
            nextClick();
        }, 2000);

        return () => clearInterval(timer);
    });

    return (
        <div className={classes.carousel__wrap}>
            <button className={classes.carousel__btn__prev} onClick={() => prevClick()}>
                <i className={classes.carousel__btn_arrow__left} />
            </button>
            <div className={classes.carousel__container}>
                {
                    itemList.map((item, index) => {
                        return  <div
                                    key={`carousel-item-${index}`}
                                    className={classes.carousel__item}
                                    style={{
                                        backgroundImage: `url(${item.image})`,
                                        display: `${index == position ? 'block' : 'none'}`,
                                    }}
                                >
                                </div>;
                    })
                }
            </div>
            <button className={classes.carousel__btn__next} onClick={() => nextClick()}>
                <i className={classes.carousel__btn_arrow__right} />
            </button>
        </div>
    );
};

export default Carousel;