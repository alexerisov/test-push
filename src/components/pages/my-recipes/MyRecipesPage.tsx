import React, { useEffect, useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Link from 'next/link';
import { ButtonUpload } from '@/components/elements/button';
import Pagination from '@material-ui/lab/Pagination';
import CardHighestMeals from '@/components/elements/card-highest-meals';

import Recipe from '@/api/Recipe';

import s from './MyRecipesPage.module.scss';
import LayoutPageNew from '@/components/layouts/layout-page-new';
import UploadIcon from '~public/icons/File Upload/Shape.svg';
import { Button } from '@material-ui/core';
import { useTranslation } from 'next-i18next';

export const MyRecipesPage = () => {
  const { t } = useTranslation('searchPage');
  const matches = useMediaQuery('(max-width: 767.95px)');
  const [uploadRecipes, setUploadRecipes] = useState();

  // Pagination params
  const itemsPerPage = matches ? 6 : 12;
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState();

  const countPages = count => {
    const isRemainExists = count % itemsPerPage > 0;
    let pages = Math.floor(count / itemsPerPage);
    return isRemainExists ? ++pages : pages;
  };

  useEffect(() => {
    getUploadRecipes();
  }, [page, itemsPerPage]);

  const getUploadRecipes = async () => {
    try {
      const response = await Recipe.getUploadRecipes(itemsPerPage, page);
      await setNumberOfPages(countPages(response.data.count));
      await setUploadRecipes(response.data.results);
    } catch (e) {
      console.log(e);
    }
  };

  const content = (
    <div className={s.uploads}>
      <h2 className={s.uploads__navbar}>
        <Link href="/">
          <a className={s.uploads__navbar__link}>Home /</a>
        </Link>
        <span> My Recipes</span>
      </h2>

      <div className={s.uploads__header}>
        <h2 className={s.uploads__title}>My Recipes</h2>

        <Button href="'/recipe/upload'" className={s.uploadButton} variant="outlined" color="primary">
          <UploadIcon />
          {t('searchPage:uploadRecipeButton')}
        </Button>
      </div>

      <div className={s.uploads__recipes}>
        {uploadRecipes?.length ? (
          uploadRecipes.map(item => (
            <CardHighestMeals
              key={`${item.pk + '1k0'}`}
              title={item.title}
              name={item.user.full_name}
              image={item.images?.[0]?.url}
              city={item.city}
              id={item.pk}
              likes={item?.['likes_number']}
              saleStatus={item?.sale_status}
              publishStatus={item?.publish_status}
              reviewStatus={item?.status}
            />
          ))
        ) : (
          <span>No upload recipes yet!</span>
        )}
      </div>

      {uploadRecipes?.length !== 0 && (
        <Pagination
          s={{ root: s.uploads__pagination }}
          count={numberOfPages}
          size={matches ? 'small' : 'large'}
          onChange={(event, number) => setPage(number)}
          defaultPage={1}
          siblingCount={matches ? 0 : 1}
        />
      )}
    </div>
  );

  return <LayoutPageNew content={content} />;
};
