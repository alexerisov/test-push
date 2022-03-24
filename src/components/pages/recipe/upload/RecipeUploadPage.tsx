import React from 'react';
import { FormCreateRecipe } from '@/components/forms';
import LayoutPageNew from '@/components/layouts/layout-page-new';

export const RecipeUploadPage = () => {
  return <LayoutPageNew content={<FormCreateRecipe />} />;
};
