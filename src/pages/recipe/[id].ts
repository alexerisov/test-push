import { connect } from 'react-redux';
import Recipe from '@/api/Recipe.js';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { RootState } from '@/store/store';
import { getSession } from 'next-auth/react';
import * as Sentry from '@sentry/nextjs';

// page component
import { RecipePage } from '@/components/pages/recipe/RecipePage';
import http from '@/utils/http';
import { LANGUAGES } from '@/utils/datasets';
import { setBearer } from '@/utils/setBearer';

export default RecipePage;

export async function getServerSideProps(context) {
  const id = context.params.id;
  const session = await getSession(context);
  setBearer(session?.jwt);
  let recipeResponse;

  try {
    if (session) {
      const recipeResponse = await Recipe.getRecipe(id, LANGUAGES[session?.user?.language]);
    } else {
      recipeResponse = await Recipe.getRecipe(id);
    }
    const topRatedResponse = await Recipe.getTopRatedMeals();

    return {
      props: {
        session,
        ...(await serverSideTranslations(context.locale, ['common', 'recipePage', 'recipeClassifications'])),
        recipe: recipeResponse.data,
        topRatedRecipes: topRatedResponse.data,
        absolutePath: context.req.headers.host
      }
    };
  } catch (e) {
    console.error(e);
    Sentry.captureException(e);

    return {
      props: {
        notFound: true
      }
    };
  }
}
