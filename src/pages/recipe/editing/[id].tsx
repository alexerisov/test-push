import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

import { FormEditRecipe } from '@/components/forms';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import LayoutPageNew from '@/components/layouts/layout-page-new';
import { getSession } from 'next-auth/react';
import Recipe from '@/api/Recipe';

function EditRecipe(props) {
  const router = useRouter();

  const [recipeId, setRecipeId] = useState();

  useEffect(() => {
    setRecipeId(router.query.id);
  }, [router]);

  return <LayoutPageNew content={recipeId && <FormEditRecipe recipeId={recipeId} />} />;
}

export default connect()(EditRecipe);

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
          'addStepModal'
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
