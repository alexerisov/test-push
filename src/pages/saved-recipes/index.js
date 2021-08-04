import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled from 'styled-components';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {NoSsr} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import Pagination from "@material-ui/lab/Pagination";

import { LayoutPage } from "@/components/layouts";
import CardHighestMeals from "@/components/elements/card-highest-meals";

import Recipe from "@/api/Recipe";
import savedRecipesActions from '@/store/savedRecipes/actions';
import { DEFAULT_VALUE_TAB_STATE } from "@/utils/constants";

import styles from "./index.module.scss";
import {useDispatch, useSelector} from "react-redux";

const StyledTabs = styled(Tabs)`
    width: 100%;
    font: normal normal 600 20px/58px Montserrat;
    padding: 0 25px 0 17px;
    background: white 0 0 no-repeat padding-box;
    box-shadow: 0 3px 6px #00000029;
    border-radius: 13px;
    display: flex;
    gap: 40px;
    margin: 0 0 40px 0;
  
    .MuiTabs-flexContainer {
      justify-content: space-between;
    }

    .MuiTabs-indicator {
      background-color: #FFAA00;
      height: 6px;
      border-radius: 13px;
    }
`;

const StyledTab = styled(Tab)`
  cursor: pointer;
  
  span {
    color: #000000;
    font-weight: 600;
    font-size: 20px;
    line-height: 58px;
    padding: 15px 0 15px 0;
    text-transform: none;
  }
`;

const SavedRecipesPage = () => {
  const dispatch = useDispatch();
  const savedRecipes = useSelector(state => state.savedRecipes.data);
  const [query, setQuery] = useState(new URLSearchParams(''));

  // Pagination params
  const itemsPerPage = 6;
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState();

  const countPages = (count) => {
    const isRemainExists = (count % itemsPerPage) > 0;
    let pages = Math.floor(count / itemsPerPage);
    return isRemainExists ? ++pages : pages;
  };

  // Tabs params
  const [valueTab, setValueTab] = useState(DEFAULT_VALUE_TAB_STATE);
  const handleChangeOfTabs = (event, newValue) => {
    setValueTab(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  useEffect(() => {
    if (query) {
      dispatch(savedRecipesActions.startSavedRecipesRequests());
      dispatch(savedRecipesActions.getSavedRecipes(query));
    }
  }, [query]);

  useEffect(() => {
    setNumberOfPages(countPages(savedRecipes.count));
  }, [savedRecipes]);

  useEffect(() => {
    const queryParams = new URLSearchParams();
    queryParams.set('page_size', String(itemsPerPage));
    queryParams.set('page', String(page));

    setQuery(queryParams);
  }, [page]);

  const content = (
    <div className={styles.savedRecipes}>
      <h2 className={styles.savedRecipes__navbar}>
        <Link href="/"><a className={styles.savedRecipes__navbar__link}>Home /</a></Link>
        <span> Saved Recipes</span>
      </h2>

      <h2 className={styles.savedRecipes__title}>Saved Recipes</h2>

      <NoSsr>
        <StyledTabs value={valueTab} onChange={handleChangeOfTabs} aria-label="simple tabs example">
          <StyledTab label={`All (${savedRecipes?.results ? savedRecipes.count : 0})`} {...a11yProps(0)} />
        </StyledTabs>
      </NoSsr>

      <h3 className={styles.savedRecipes__subtitle}>{`All (${savedRecipes?.results ? savedRecipes.count : 0})`}</h3>

      <div className={styles.savedRecipes__wrapper}>
        <div className={styles.savedRecipes__container}>
          {savedRecipes?.results?.length
            ?
            savedRecipes.results.map((result) => {
              return <CardHighestMeals
                key={result.recipe.pk}
                image={result.recipe?.images[0]?.url}
                title={result.recipe?.title}
                rating={result.recipe?.avg_rating}
                name={result.recipe?.user?.full_name}
                city={result.recipe?.user?.city}
                likes={result.recipe?.likes_number}
                id={result.recipe.pk}
                isSavedByUser={result.recipe.user_saved_recipe}
              />;
            })
            :
            <span>No saved recipes yet!</span>
          }
        </div>

        {savedRecipes?.results?.length > 0 &&
        <Pagination
          classes={{root: styles.sectionRecipes__pagination}}
          count={numberOfPages}
          page={page}
          onChange={(event, number) => setPage(number)}
        />}
      </div>
    </div>
  );

  return <LayoutPage content={content} />;
};

export default SavedRecipesPage;
