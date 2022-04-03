import React from 'react';
import classes from './index.module.scss';
import CardHighestMeals from '@/components/elements/card-highest-meals';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '@/components/elements/tab-panel-cuisines';
import styled from 'styled-components';
import { NoSsr } from '@material-ui/core';

import Recipe from '@/api/Recipe.js';

const StyledTabs = styled(Tabs)`
  width: max-content;
  font: normal normal 600 20px/58px Montserrat;
  padding: 0 25px 0 143px;
  background: white 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 13px;
  display: flex;
  flex-direction: row;
  gap: 40px;
  margin: 0 0 51px 0;

  .MuiTabs-indicator {
    background-color: #ffaa00;
    height: 6px;
    border-radius: 13px;
  }
`;

const StyledTab = styled(Tab)`
  span {
    color: #000000;
    font-weight: 600;
    font-size: 20px;
    line-height: 58px;
    padding: 15px 0 15px 0;
    text-transform: none;
  }
`;

const StyledTabPanel = styled(TabPanel)`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  max-width: 1054px;
  gap: 20px;
  margin: 0 auto;
`;

const FavoriteCuisinesBlock = () => {
  const lengthFavoriteCuisinesMenu = 6;
  const DEFAULT_VALUE_TAB_STATE = 0;
  // To do change method indentifing coisines ID
  const cousineID = {
    0: 7,
    1: 8,
    2: 18,
    3: 16,
    4: 15,
    5: 17,
    6: 10
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }

  const [valueTab, setValueTab] = React.useState(DEFAULT_VALUE_TAB_STATE);
  const [cards, setCards] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  const slideTabRight = () => {
    valueTab < lengthFavoriteCuisinesMenu && setValueTab(valueTab + 1);
  };

  const slideTabLeft = () => {
    valueTab > DEFAULT_VALUE_TAB_STATE && setValueTab(valueTab - 1);
  };

  React.useEffect(() => {
    Recipe.getFavoriteCuisines(cousineID[valueTab]).then(data => {
      setCards(data.data);
    });
  }, [valueTab]);

  return (
    <section className={classes.cuisines}>
      <div className={classes.cuisines__title}>
        <h2>Your favorite cuisines</h2>
        <span className={classes.cuisines__lineContainer}>
          <span className={classes.cuisines__yellowLine} />
          <span className={classes.cuisines__blueСircle} />
        </span>
      </div>
      <div className={classes.cuisines__menu}>
        <NoSsr>
          <StyledTabs value={valueTab} onChange={handleChange} aria-label="simple tabs example">
            <StyledTab label="Indian" {...a11yProps(0)} />
            <StyledTab label="Indonesian" {...a11yProps(1)} />
            <StyledTab label="Turkish" {...a11yProps(2)} />
            <StyledTab label="Thai" {...a11yProps(3)} />
            <StyledTab label="Spanish" {...a11yProps(4)} />
            <StyledTab label="Moroccan" {...a11yProps(5)} />
            <StyledTab label="Japanese" {...a11yProps(6)} />
          </StyledTabs>
        </NoSsr>
        <button className={classes.cuisines__slideButton} onClick={slideTabLeft}>
          <div className={classes.cuisines__slideButtonArrow_left} />
        </button>
        <button className={classes.cuisines__slideButton} onClick={slideTabRight}>
          <div className={classes.cuisines__slideButtonArrow_right} />
        </button>
      </div>
      <NoSsr>
        <StyledTabPanel value={valueTab} index={0}>
          {cards.map(card => {
            return (
              <CardHighestMeals
                key={card.pk}
                image={card?.images?.[0]?.url}
                title={card?.title}
                rating={card?.avg_rating}
                name={card?.user?.full_name}
                city={card?.user?.city}
                likes={card?.likes_number}
                id={card.pk}
              />
            );
          })}
        </StyledTabPanel>
        <StyledTabPanel value={valueTab} index={1}>
          {cards.map(card => {
            return (
              <CardHighestMeals
                key={card.pk}
                image={card?.images?.[0]?.url}
                title={card?.title}
                rating={card?.avg_rating}
                name={card?.user?.full_name}
                city={card?.user?.city}
                likes={card?.likes_number}
                id={card.pk}
              />
            );
          })}
        </StyledTabPanel>
        <StyledTabPanel value={valueTab} index={2}>
          {cards.map(card => {
            return (
              <CardHighestMeals
                key={card.pk}
                image={card?.images?.[0]?.url}
                title={card?.title}
                rating={card?.avg_rating}
                name={card?.user?.full_name}
                city={card?.user?.city}
                likes={card?.likes_number}
                id={card.pk}
              />
            );
          })}
        </StyledTabPanel>
        <StyledTabPanel value={valueTab} index={3}>
          {cards.map(card => {
            return (
              <CardHighestMeals
                key={card.pk}
                image={card?.images?.[0]?.url}
                title={card?.title}
                rating={card?.avg_rating}
                name={card?.user?.full_name}
                city={card?.user?.city}
                likes={card?.likes_number}
                id={card.pk}
              />
            );
          })}
        </StyledTabPanel>
        <StyledTabPanel value={valueTab} index={4}>
          {cards.map(card => {
            return (
              <CardHighestMeals
                key={card.pk}
                image={card?.images?.[0]?.url}
                title={card?.title}
                rating={card?.avg_rating}
                name={card?.user?.full_name}
                city={card?.user?.city}
                likes={card?.likes_number}
                id={card.pk}
              />
            );
          })}
        </StyledTabPanel>
        <StyledTabPanel value={valueTab} index={5}>
          {cards.map(card => {
            return (
              <CardHighestMeals
                key={card.pk}
                image={card?.images?.[0]?.url}
                title={card?.title}
                rating={card?.avg_rating}
                name={card?.user?.full_name}
                city={card?.user?.city}
                likes={card?.likes_number}
                id={card.pk}
              />
            );
          })}
        </StyledTabPanel>
        <StyledTabPanel value={valueTab} index={6}>
          {cards.map(card => {
            return (
              <CardHighestMeals
                key={card.pk}
                image={card?.images?.[0]?.url}
                title={card?.title}
                rating={card?.avg_rating}
                name={card?.user?.full_name}
                city={card?.user?.city}
                likes={card?.likes_number}
                id={card.pk}
              />
            );
          })}
        </StyledTabPanel>
      </NoSsr>
    </section>
  );
};

export default FavoriteCuisinesBlock;
