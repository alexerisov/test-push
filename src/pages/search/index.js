import React, { useState, useEffect } from 'react';
import classes from "./index.module.scss";
import LayoutPage from '@/components/layouts/layout-page';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Recipe from '@/api/Recipe.js';
import CardHighestMeals from "@/components/elements/card-highest-meals";
import {cuisineList, recipeTypes, cookingMethods, dietaryrestrictions, cookingSkill} from '@/utils/datasets';
import { modalActions } from '@/store/actions';
import { connect } from 'react-redux';
import { NoSsr } from '@material-ui/core';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

import { useFormik } from 'formik';
import Pagination from '@material-ui/lab/Pagination';

const StyledAccordion = styled(Accordion)`
  p {
    font-size: 16px;
    font-weight: 600;
  }

  .MuiAccordionSummary-expandIcon.Mui-expanded {
    div {
      div:last-of-type {
        transform: none;
      }
    }
  }
`;

const Recipes = (props) => {

  const router = useRouter();

  const [query, setQuery] = useState();
  const [title, setTitle] = useState();
  const [page, setPage] = useState(1);
  const [data, setData] = useState();
  const [result, setResult] = useState([]);
  const [typeSelection, setTypeSelection] = useState("Food");
  const [pageError, setPageError] = useState(false);

  // formik

  const createQueryParams = (data) => {
    const queryParams = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      queryParams.set(key, value ?? '');
    });
    return queryParams;
  };

  const formik = useFormik({
    initialValues: {
      diet_restrictions: [],
      cooking_methods: [],
      cuisines: [],
      cooking_skills: [],
      types: [],
    },
    onSubmit: (values) => {
      // router.push({
      //     search: `?${createQueryParams(values).toString()}`
      // });
      values.title = title;
      values.page = page;

      if (typeSelection === "Beverages") {
        values.types = [5]
      }

      setQuery(`?${createQueryParams(values).toString()}`)
    }
  });

  const dietaryrestrictionsList = [];
  const cookingMethodsList = [];
  const recipeTypesList = [];
  const cuisineListList = [];
  const cookingSkillList = [];
  
  for (let i = 1; i < Object.keys(dietaryrestrictions).length; i++) {
    dietaryrestrictionsList.push(
      <FormControlLabel
        key={i}
        control={<Checkbox 
          style ={{
            color: "#000000"
          }}
          value={i}
          onChange={(e) => {
            onChangeCheckboxInput(e);
          }}
          name="diet_restrictions" 
          color="primary"
          />
        }
        label={dietaryrestrictions[i]}
      />
    )
  }

  for (let i = 1; i <= Object.keys(cuisineList).length; i++) {
    cuisineListList.push(
      <FormControlLabel
      key={i}
      control={<Checkbox 
        value={i}
        onChange={(e) => {
          onChangeCheckboxInput(e); 
        }}
        name="cuisines" 
        color="primary"
        />
      }
      label={cuisineList[i]}
    />
    )
  }
  
  for (let i = 1; i <= Object.keys(cookingSkill).length; i++) {
    cookingSkillList.push(
      <FormControlLabel
      key={i}
      control={<Checkbox 
        value={i}
        checked={formik.values.check}
        onChange={(e) => {
          onChangeCheckboxInput(e); 
        }}
        name="cooking_skills" 
        color="primary"
        />
      }
      label={cookingSkill[i]}
    />
    )
  }

  for (let i = 1; i <= Object.keys(recipeTypes).length; i++) {
    if (i !== 5) {
      recipeTypesList.push(
        <FormControlLabel
        key={i}
        control={<Checkbox 
          value={i}
          onChange={(e) => {
            onChangeCheckboxInput(e);
          }}
          name="types" 
          color="primary"
          />
        }
        label={recipeTypes[i]}
        />
    )}
  }

  for (let i = 1; i <= Object.keys(cookingMethods).length; i++) {
    cookingMethodsList.push(
      <FormControlLabel
      key={i}
      control={<Checkbox 
        value={i}
        onChange={(e) => {
          onChangeCheckboxInput(e);
        }}
        name="cooking_methods" 
        color="primary"
        />
      }
      label={cookingMethods[i]}
    />
    )
  }

  const onChangeCheckboxInput = (e) => {
    setPage(1);
    setPageError(false);
    formik.handleChange(e);
    formik.handleSubmit();  
  }

  useEffect(() => {
    setTitle(router.query.title);
    setPage(router.query.page ? Number(router.query.page) : 1);
    formik.handleSubmit();
  }, [router]);

  useEffect(() => {
    if (query) {
      Recipe.getSearchResult(query)
        .then((res) => setResult(res.data.results))
        .catch(e => {
          setPageError(true);
          console.log('error', e);
      });
    }
  }, [query])

  useEffect(() => {
      Recipe.getSearchResult(`?title=${title}`)
        .then((res) => {
          setResult(res.data.results);
          setData(res.data);
        })
        .catch(e => {
          console.log('error', e);
      });
  }, [title])

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

  const handleClickClearAll = () => {
    setPageError(false);
    setTypeSelection("Food");
    setPage(1);
    formik.handleReset();
    formik.handleSubmit();
  };

  const setTypeSelectionFood = (event) => {
    event.preventDefault()
    setPage(1);
    setPageError(false);
    setTypeSelection("Food");
    formik.values.types = [];
    formik.handleSubmit();
  };

  const setTypeSelectionBeverages = (event) => {
    event.preventDefault();
    setPage(1);
    setPageError(false);
    setTypeSelection("Beverages");
    formik.handleSubmit();
  };

  const handleChangePage = (event, value) => {
    setPage(value)
    pushNewPage(value)
  };

  const pushNewPage = (page) => {
    router.push(`/search?title=${title}&page=${page}`);
  };

  const content = <div className={classes.search}>
    <div className={classes.search__header}>
      {title ? <p>Search results for : <span>"{title}"</span></p> : <p></p>}
      <button className={classes.search__searchButton} onClick={handleClickSearch('search')}>
        <img src="/images/index/icon_search.svg"/>
      </button>
    </div>
    <div className={classes.search__content}>
      <form className={classes.search__filter} onSubmit={formik.handleSubmit}>
        <div className={classes.search__filterHeader_left}>
          <p className={classes.search__filter__title}>Filter</p>
          <button type="reset" onClick={handleClickClearAll} className={classes.search__clearButton}>Clear all</button>
        </div>
        <div>
          <button
            type="submit"
            className={`${classes.search__filter__button} ${(typeSelection === "Food") && classes.search__filter__button_active}`}
            onClick={(event) => setTypeSelectionFood(event)}>
            Food
          </button>
          <button
            type="submit"
            className={`${classes.search__filter__button} ${(typeSelection === "Beverages") && classes.search__filter__button_active}`}
            onClick={(event) => setTypeSelectionBeverages(event)}>
            Beverages
          </button>
        </div>
        <NoSsr>
        {(typeSelection !== "Beverages") && <StyledAccordion>
          <AccordionSummary
            expandIcon={
            <div className={classes.search__clickList}>
              <div></div>
              <div className={classes.search__clickList__active}></div>
            </div>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.search__filter__title}>Type</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.search__filter__list}>
              {recipeTypesList}
            </div>
          </AccordionDetails>
        </StyledAccordion>}
        <StyledAccordion>
          <AccordionSummary
            expandIcon={
              <div className={classes.search__clickList}>
                <div></div>
                <div className={classes.search__clickList__active}></div>
              </div>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.search__filter__title}>Cuisines</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.search__filter__list}>
              {cuisineListList}
            </div>
          </AccordionDetails>
        </StyledAccordion>
        <StyledAccordion>
          <AccordionSummary
            expandIcon={
              <div className={classes.search__clickList}>
                <div></div>
                <div className={classes.search__clickList__active}></div>
              </div>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.search__filter__title}>Cooking Skills</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.search__filter__list}>
              {cookingSkillList}
            </div>
          </AccordionDetails>
        </StyledAccordion>
        <StyledAccordion>
          <AccordionSummary
            expandIcon={
              <div className={classes.search__clickList}>
                <div></div>
                <div className={classes.search__clickList__active}></div>
              </div>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.search__filter__title}>Cooking Method</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.search__filter__list}>
              {cookingMethodsList}
            </div>
          </AccordionDetails>
        </StyledAccordion>
        <StyledAccordion>
          <AccordionSummary
            expandIcon={
              <div className={classes.search__clickList}>
                <div></div>
                <div className={classes.search__clickList__active}></div>
              </div>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.search__filter__title}>Dietary Restrictions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.search__filter__list}>
              {dietaryrestrictionsList}
            </div>
          </AccordionDetails>
        </StyledAccordion>
        </NoSsr>
      </form>
      <div className={classes.search__result}>
        <div className={classes.search__result__container}>
          {
            (result.length !== 0) ? result.map((recipe, index) => {
              return <CardHighestMeals
                        key={`${recipe.pk}-${index}`}
                        title={recipe?.title}
                        image={recipe?.images[0]?.url}
                        name={recipe?.user?.full_name}
                        city={recipe?.user?.city}
                        id={recipe.pk}
                      />;
            }) : <p className={classes.search__NoResult}>No results</p>
          }
        </div>
        <div>
          {data && <Pagination count={Math.ceil(data.count / 10)} color="primary"
            page={page && page} onChange={(event, value) => {
              handleChangePage(event, value)
            }}
          />}
        </div>
      </div>
    </div>
  </div>

  return (
    <LayoutPage content={content} />
  );
};
  
export default (connect(state => ({
  search: state.search,
}))(Recipes));