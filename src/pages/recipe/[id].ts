import Recipe from '@/api/Recipe.js';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getSession } from 'next-auth/react';
import log from 'loglevel';

// page component
import { RecipePage } from '@/components/pages/recipe/RecipePage';
import http from '@/utils/http';
import { GetServerSideProps } from 'next';

export default RecipePage;

export const getServerSideProps: GetServerSideProps = async context => {
  const id = context.params.id;
  const session = await getSession(context);
  if (session) {
    http.defaults.headers.common['Authorization'] = `Bearer ${session?.accessToken}`;
  }
  log.debug('session', session);
  log.debug('lang', session?.user?.language);
  try {
    const recipeResponse = await Recipe.getRecipe(id, context.locale);
    log.debug('recipeResponse', recipeResponse);
    const topRatedResponse = await Recipe.getTopRatedMeals();

    return {
      props: {
        session,
        ...(await serverSideTranslations(context.locale, ['common', 'recipePage', 'recipeClassifications', 'units'])),
        recipe: recipeResponse.data,
        topRatedRecipes: topRatedResponse.data,
        absolutePath: context.req.headers.host
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
