import { connect } from 'react-redux';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// page component
import { RecipeUploadPage } from '@/components/pages/recipe/upload/RecipeUploadPage';

export default connect()(RecipeUploadPage);

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'common',
      'uploadRecipe',
      'addIngredientModal',
      'addNutritionModal',
      'addStepModal',
      'recipeClassifications',
      'units',
      'errors'
    ]))
  }
});
