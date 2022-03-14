import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

import LayoutPage from '@/components/layouts/layout-page';
import { FormEditRecipe } from '@/components/forms';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function EditRecipe(props) {
  const router = useRouter();

  const [recipeId, setRecipeId] = useState();

  useEffect(() => {
    setRecipeId(router.query.id);
  }, [router]);

  return <LayoutPage content={recipeId && <FormEditRecipe recipeId={recipeId} />} />;
}

export default connect()(EditRecipe);

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'common',
      'uploadRecipe',
      'addIngredientModal',
      'addNutritionModal',
      'addStepModal'
    ]))
  }
});
