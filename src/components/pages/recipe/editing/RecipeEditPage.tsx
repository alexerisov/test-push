import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { FormEditRecipe } from '@/components/forms';
import LayoutPageNew from '@/components/layouts/layout-page-new';

export const RecipeEditPage = () => {
  const router = useRouter();

  const [recipeId, setRecipeId] = useState();

  useEffect(() => {
    setRecipeId(router.query.id);
  }, [router]);

  return <LayoutPageNew content={recipeId && <FormEditRecipe recipeId={recipeId} />} />;
};
