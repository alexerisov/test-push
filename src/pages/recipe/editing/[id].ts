import { connect } from 'react-redux';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getSession } from 'next-auth/react';
import Recipe from '@/api/Recipe';

// page component
import { RecipeEditPage } from '@/components/pages/recipe/editing/RecipeEditPage';

export default connect()(RecipeEditPage);

export async function getServerSideProps(context) {
  const id = context.params.id;

  try {
    const session = await getSession(context);
    const recipeResponse = await Recipe.getRecipe(id);

    if (recipeResponse?.data?.user?.pk !== session.user.pk) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      };
    }

    return {
      props: {
        session,
        ...(await serverSideTranslations(context.locale, [
          'common',
          'uploadRecipe',
          'addIngredientModal',
          'addNutritionModal',
          'addStepModal',
          'recipeClassifications'
        ])),
        recipe: recipeResponse.data,
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