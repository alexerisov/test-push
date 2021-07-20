import React, { useEffect, useState } from 'react';

import Link from "next/link";
import { ButtonUploadRecipe } from '@/components/elements/button';
import { LayoutPage } from "@/components/layouts";
import Pagination from "@material-ui/lab/Pagination";
import CardHighestMeals from "@/components/elements/card-highest-meals";
import Recipe from "@/api/Recipe";

import classes from "./index.module.scss";

import uploadIcon from '../../../public/images/index/icon_upload.svg';

const MyUploadsPage = () => {
  const [savedRecipes, setSavedRecipes] = useState();

  // Pagination params
  const itemsPerPage = 12;
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState();

  const countPages = (count) => {
    const isRemainExists = (count % itemsPerPage) > 0;
    let pages = Math.floor(count / itemsPerPage);
    return isRemainExists ? ++pages : pages;
  };

  useEffect(() => {
    getSavedRecipes();
  }, [page]);

  const getSavedRecipes = async () => {
    try {
      const response = await Recipe.getSavedRecipes(page);
      await setNumberOfPages(countPages(response.data.count));
      await setSavedRecipes(response.data.results);
    }
    catch (e) {
      console.log(e);
    }
  };

  const content = (
    <div className={classes.uploads}>
      <h2 className={classes.uploads__navbar}>
        <Link href="/"><a>Home /</a></Link>
        <span> My Uploads</span>
      </h2>

      <div className={classes.uploads__header}>
        <h2 className={classes.uploads__title}>Uploads</h2>

        <ButtonUploadRecipe />
      </div>

      <div className={classes.uploads__recipes}>
        {savedRecipes &&
        savedRecipes.map(item => (
          <CardHighestMeals
            key={`${item.pk + '1k0'}`}
            title={item.recipe.title}
            image={item.recipe.images[0].url}
            city={item.recipe.city}
            id={item.recipe.pk}
          />)
        )}
      </div>

      <Pagination
        classes={{root: classes.uploads__pagination}}
        count={numberOfPages}
        onChange={(event, number) => setPage(number)}
      />
    </div>
  );

  return (
      <LayoutPage content={content} />
  );
};

export default MyUploadsPage;
