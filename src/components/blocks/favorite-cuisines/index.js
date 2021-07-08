import React from 'react';
import classes from "./index.module.scss";
import CardFavoriteCuisines from "@/components/elements/card-favorite-cuisines";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '@/components/elements/tab-panel-cuisines';
import styled from 'styled-components';
import { NoSsr } from '@material-ui/core';

import PropTypes from 'prop-types';

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

    .PrivateTabIndicator-colorSecondary-3 {
      background-color: #FFAA00;
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

  StyledTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const [valueTab, setValueTab] = React.useState(DEFAULT_VALUE_TAB_STATE);

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  const slideTabRight = () => {
    (valueTab < lengthFavoriteCuisinesMenu ) && setValueTab(valueTab + 1);
  }

  const slideTabLeft = () => {
    (valueTab > DEFAULT_VALUE_TAB_STATE ) && setValueTab(valueTab - 1);
  }

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
        <CardFavoriteCuisines />
        <CardFavoriteCuisines />
        <CardFavoriteCuisines />
      </StyledTabPanel>
      <StyledTabPanel value={valueTab} index={1}>
        <CardFavoriteCuisines />
        <CardFavoriteCuisines />
      </StyledTabPanel>
      <StyledTabPanel value={valueTab} index={2}>
        <CardFavoriteCuisines />
      </StyledTabPanel>
      <StyledTabPanel value={valueTab} index={3}>
        <CardFavoriteCuisines />
        <CardFavoriteCuisines />
        <CardFavoriteCuisines />
      </StyledTabPanel>
      <StyledTabPanel value={valueTab} index={4}>
        <CardFavoriteCuisines />
      </StyledTabPanel>
      <StyledTabPanel value={valueTab} index={5}>
        <CardFavoriteCuisines />
        <CardFavoriteCuisines />
      </StyledTabPanel>
      <StyledTabPanel value={valueTab} index={6}>
        <CardFavoriteCuisines />
        <CardFavoriteCuisines />
        <CardFavoriteCuisines />
        <CardFavoriteCuisines />
      </StyledTabPanel>
      </NoSsr>
    </section>
  );
  };
  
export default FavoriteCuisinesBlock;