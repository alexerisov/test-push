import { connect } from 'react-redux';
import Recipe from '@/api/Recipe.js';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { RootState } from '@/store/store';
import { getSession } from 'next-auth/react';

// page component
import { RecipePage } from '@/components/pages/recipe/RecipePage';
import http from '@/utils/http';
import { LANGUAGES } from '@/utils/datasets';
import { setBearer } from '@/utils/setBearer';

export default RecipePage;

export async function getServerSideProps(context) {
  const id = context.params.id;
  const session = await getSession(context);
  if (session) {
    http.defaults.headers.common['Authorization'] = `Bearer ${session?.jwt}`;
  }
  console.log('session', session);
  console.log('lang', session?.user?.language);
  try {
    const recipeResponse = await Recipe.getRecipe(id, context.locale);
    console.log('recipeResponse', recipeResponse);
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
    console.error(e);

    return {
      props: {
        notFound: true
      }
    };
  }
}
