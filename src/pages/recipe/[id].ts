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

export default connect((state: RootState) => ({
  account: state.account
}))(RecipePage);

export async function getServerSideProps(context) {
  const id = context.params.id;
  const session = await getSession(context);
  setBearer(session?.jwt);
  let recipeResponse;
  try {
    if (session) {
      recipeResponse = await Recipe.getRecipe(id, LANGUAGES[session?.user?.language]);
    } else {
      recipeResponse = await Recipe.getRecipe(id);
    }
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
