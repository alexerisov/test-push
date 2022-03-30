import { connect } from 'react-redux';
import Recipe from '@/api/Recipe.js';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { RootState } from '@/store/store';
import { getSession } from 'next-auth/react';

// page component
import { RecipePage } from '@/components/pages/recipe/RecipePage';
import http from '@/utils/http';
import { LANGUAGES } from '@/utils/datasets';

export default connect((state: RootState) => ({
  account: state.account
}))(RecipePage);

export async function getServerSideProps(context) {
  const id = context.params.id;
  const session = await getSession(context);
  if (session) {
    http.defaults.headers.common['Authorization'] = `Bearer ${session.jwt}`;
  }
  try {
    let recipeResponse = await Recipe.getRecipe(id);
    if (session?.user?.language !== recipeResponse.data.language.toLowerCase()) {
      recipeResponse = await Recipe.getRecipe(id, LANGUAGES[session?.user?.language]);
      console.log('translatedrecipe', recipeResponse.data);
    }
    console.log('recipe', recipeResponse.data.language);
    const weekmenuResponse = await Recipe.getWeekmenu('');
    const topRatedResponse = await Recipe.getTopRatedMeals();

    return {
      props: {
        session,
        ...(await serverSideTranslations(context.locale, ['common', 'recipePage', 'recipeClassifications'])),
        recipe: recipeResponse.data,
        weekmenu: weekmenuResponse.data,
        topRatedRecipes: topRatedResponse.data,
        absolutePath: context.req.headers.host,
        notFound: false
      }
    };
  } catch (e) {
    console.error(e);

    return {
      props: {
        ...(await serverSideTranslations(context.locale, ['common'])),
        notFound: true
      }
    };
  }
}
