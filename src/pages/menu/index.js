import React from 'react';
import Link from 'next/link';
import classes from './index.module.scss';
import LayoutPage from '@/components/layouts/layout-page';
import { CardMenu } from '@/components/elements/card';
import { modalActions } from '@/store/actions';
import { useDispatch } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const Menu = () => {
  const dispatch = useDispatch();
  const mobile = useMediaQuery('(max-width: 768px)');

  const menuItem = [
    {
      src: '/images/index/menuImages/BREAKFAST.jpg',
      title: 'BREAKFAST',
      link: '/search?types=1'
    },
    {
      src: '/images/index/menuImages/LUNCH.jpg',
      title: 'LUNCH',
      link: '/search?types=2'
    },
    {
      src: '/images/index/menuImages/DINNER.jpg',
      title: 'DINNER',
      link: '/search?types=3'
    },
    {
      src: '/images/index/menuImages/APPETIZER-SNACKS.jpg',
      title: 'APPETIZER & SNACKS',
      link: '/search?types=6'
    },
    {
      src: '/images/index/menuImages/DRINKS.jpg',
      title: 'DRINKS',
      link: '/search?types=5'
    },
    {
      src: '/images/index/menuImages/DESSERTS.jpg',
      title: 'DESSERTS',
      link: '/search?types=4'
    },
    {
      src: '/images/index/menuImages/SALAD.jpg',
      title: 'SALAD',
      link: '/search?types=7'
    },
    {
      src: '/images/index/menuImages/BREAD.jpg',
      title: 'BREAD',
      link: '/search?types=8'
    }
  ];

  const handleClickSearch = name => {
    return () => {
      dispatch(modalActions.open(name)).then(result => {
        // result when modal return promise and close
      });
    };
  };

  const content = (
      <div className={classes.menu}>
        {!mobile && <button className={classes.btnSearch} onClick={handleClickSearch('search')}>
          <img src="/images/index/icon_search.svg" className={classes.btnSearch__icon} />
        </button>}

        <div className={classes.menu__wrapper}>
          <h2 className={classes.menu__navbar}>
            <Link href="/">
              <a className={classes.menu__navbar__link}>Home / </a>
            </Link>
            <span>Menu</span>
          </h2>
          <h1 className={classes.menu__title}>Menu</h1>
          <div className={classes.menu__content}>
            {menuItem.map((item, index) => {
              return <CardMenu key={index} title={item.title} src={item.src} link={item.link} />;
            })}
          </div>
        </div>
      </div>
  );

  return <LayoutPage content={content} />;
};

export default Menu;
