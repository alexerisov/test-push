import React from 'react';
import { connect } from 'react-redux';

import LayoutPage from '@/components/layouts/layout-page';
import { FormCreateRecipe } from '@/components/forms';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function CreateRecipe() {
  return <LayoutPage content={<FormCreateRecipe />} />;
}

export default connect()(CreateRecipe);

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'uploadRecipe', 'addIngredientModal']))
  }
});
