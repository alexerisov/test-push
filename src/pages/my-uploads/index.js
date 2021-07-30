import React, { useEffect, useState } from 'react';
import { withRouter } from "next/router";

import Link from "next/link";
import { ButtonUploadRecipe } from '@/components/elements/button';
import { LayoutPage } from "@/components/layouts";
import Pagination from "@material-ui/lab/Pagination";
import CardHighestMeals from "@/components/elements/card-highest-meals";
import Recipe from "@/api/Recipe";
import { RedirectWithoutAuthAndByCheckingUserType } from "@/utils/authProvider";
import { CHEF_TYPE } from "@/utils/constants";

import classes from "./index.module.scss";

const MyUploadsPage = () => {
  const [uploadRecipes, setUploadRecipes] = useState();

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
    getUploadRecipes();
  }, [page]);

  const getUploadRecipes = async () => {
    try {
      const response = await Recipe.getUploadRecipes(12, page);
      await setNumberOfPages(countPages(response.data.count));
      await setUploadRecipes(response.data.results);
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
        {uploadRecipes &&
        uploadRecipes.map(item => (
          <CardHighestMeals
            key={`${item.pk + '1k0'}`}
            title={item.title}
            image={item.images[0]?.url}
            city={item.city}
            id={item.pk}
            likes={item?.['likes_number']}
            publishStatus={item?.publish_status}
            reviewStatus={item?.status}
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

  return <LayoutPage content={content} />;
};

export default withRouter(RedirectWithoutAuthAndByCheckingUserType(MyUploadsPage, CHEF_TYPE));
