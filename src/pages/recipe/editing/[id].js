import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

import { FormEditRecipe } from '@/components/forms';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import LayoutPageNew from '@/components/layouts/layout-page-new';

function EditRecipe(props) {
  const router = useRouter();

  const [recipeId, setRecipeId] = useState();

  useEffect(() => {
    setRecipeId(router.query.id);
  }, [router]);

  return <LayoutPageNew content={recipeId && <FormEditRecipe recipeId={recipeId} />} />;
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
