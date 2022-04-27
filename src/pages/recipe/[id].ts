// type
import type { GetServerSideProps } from 'next';

import Recipe from '@/api/Recipe.js';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getSession } from 'next-auth/react';
import log from 'loglevel';
import http from '@/utils/http';

// page component
import { RecipePage } from '@/components/pages/recipe/RecipePage';

export default RecipePage;

export const getServerSideProps: GetServerSideProps = async context => {
  const id = context.params.id;
  const session = await getSession(context);
  if (session) {
    http.defaults.headers.common['Authorization'] = `Bearer ${session?.accessToken}`;
  }
  try {
    const recipeResponse = await Recipe.getRecipe(id, context.locale);
    const topRatedResponse = await Recipe.getTopRatedMeals(context.locale);

    return {
      props: {
        session,
        ...(await serverSideTranslations(context.locale, [
          'common',
          'recipePage',
          'recipeClassifications',
          'units',
          'errors',
          'orderSummary'
        ])),
        recipe: recipeResponse?.data,
        topRatedRecipes: topRatedResponse?.data,
        host: context.req.headers.host
      }
    };
  } catch (e) {
    log.error(e);

    return {
      props: {
        notFound: true
      }
    };
  }
};
