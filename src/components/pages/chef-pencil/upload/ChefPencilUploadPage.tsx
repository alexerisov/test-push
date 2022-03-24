import React from 'react';

import { FormCreateChefPencil } from '@/components/forms';
import LayoutPageNew from '@/components/layouts/layout-page-new';

export const ChefPencilUploadPage = () => {
  return <LayoutPageNew content={<FormCreateChefPencil />} />;
};
