import React, { useState, useEffect } from 'react';
import classes from "./index.module.scss";
import LayoutPage from '@/components/layouts/layout-page';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import Recipe from '@/api/Recipe.js';
import CardHighestMeals from "@/components/elements/card-highest-meals";
import {cuisineList, recipeTypes, cookingMethods, dietaryrestrictions, cookingSkill} from '@/utils/datasets';
import { modalActions } from '@/store/actions';
import { connect } from 'react-redux';


import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';

const Recipes = (props) => {

  const router = useRouter();

  const [query, setQuery] = useState();
  const [result, setResult] = useState([]);

  const dietaryrestrictionsList = [];
  const cookingMethodsList = [];
  const recipeTypesList = [];
  const cuisineListList = [];
  const cookingSkillList = [];
  
  for (let i = 1; i <= 14 ; i++) {
    dietaryrestrictionsList.push(
      <div>
        <input type="checkbox"></input>
        <label>{dietaryrestrictions[i]}</label>
      </div>
    )
  }

  for (let i = 1; i <= 18 ; i++) {
    cuisineListList.push(
      <div>
        <input type="checkbox"></input>
        <label>{cuisineList[i]}</label>
      </div>
    )
  }
  
  for (let i = 1; i <= 3 ; i++) {
    cookingSkillList.push(
      <div>
        <input type="checkbox"></input>
        <label>{cookingSkill[i]}</label>
      </div>
    )
  }

  for (let i = 1; i <= 8 ; i++) {
    recipeTypesList.push(
      <div>
        <input type="checkbox"></input>
        <label>{recipeTypes[i]}</label>
      </div>
    )
  }

  for (let i = 1; i <= 11 ; i++) {
    cookingMethodsList.push(
      <div>
        <input type="checkbox"></input>
        <label>{cookingMethods[i]}</label>
      </div>
    )
  }

  useEffect(() => {
    setQuery(router.query.query);
  }, [router]);

  useEffect(() => {
    Recipe.getSearchResult(query)
      .then((res) => setResult(res.data.results))
      .catch(e => {
        console.log('error', e);
      });
  }, [query])

  // formik

  const formik = useFormik({
    initialValues: {
      picked: '',
    },
    onSubmit: (values) => {
      console.log(values)
    }
  });

  // search banner

  const handleClickSearch = (name) => {
    return () => {
      props.dispatch(
        modalActions.open(name),
      ).then(result => {
        // result when modal return promise and close
      });
    };
  };

  const content = <div className={classes.search}>
    <div className={classes.search__header}>
      <p>Search results for : <span>"{query}"</span></p>
      <button className={classes.search__searchButton} onClick={handleClickSearch('search')}>
        <img src="/images/index/icon_search.svg"/>
      </button>
    </div>
    <div className={classes.search__filterHeader}>
      <div className={classes.search__filterHeader_left}>
        <p>Filter</p>
        <p>Clear all</p>
      </div>
      <p>Sort by</p>
    </div>
    <div className={classes.search__content}>
      <form className={classes.search__filter}>
        <div>
          <button className={classes.search__filter__button}>Food</button>
          <button className={classes.search__filter__button}>Beverages</button>
        </div>
        
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Type</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.search__filter__list}>
              {recipeTypesList}
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Cuisines</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.search__filter__list}>
              {cuisineListList}
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Cooking Skills</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.search__filter__list}>
              {cookingSkillList}
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Cooking Method</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.search__filter__list}>
              {cookingMethodsList}
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Dietary Restrictions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.search__filter__list}>
              {dietaryrestrictionsList}
            </div>
          </AccordionDetails>
        </Accordion>
      </form>
      <div className={classes.search__result}>
        {
          result && result.map((recipe, index) => {
            return <CardHighestMeals
                      key={`${recipe.pk}-${index}`}
                      title={recipe?.title}
                      image={recipe?.images[0]?.url}
                      name={recipe?.user?.full_name}
                      city={recipe?.user?.city}
                      id={recipe.pk}
                    />;
          })
        }
      </div>
    </div>
  </div>

  return (
    <LayoutPage content={content} />
  );
};
  
export default connect()(Recipes);