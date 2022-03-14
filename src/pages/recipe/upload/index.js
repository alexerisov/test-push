import React from 'react';
import { connect } from 'react-redux';

import { FormCreateRecipe } from '@/components/forms';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import LayoutPageNew from '@/components/layouts/layout-page-new';

function CreateRecipe() {
  return <LayoutPageNew content={<FormCreateRecipe />} />;
}

export default connect()(CreateRecipe);

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
