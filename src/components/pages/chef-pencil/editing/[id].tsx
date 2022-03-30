import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { FormCreateChefPencil } from '@/components/forms';
import ChefPencil from '@/api/ChefPencil';
import LayoutPageNew from '@/components/layouts/layout-page-new';

export const ChefPencilEditPage = () => {
  const router = useRouter();
  const [pencilId, setPencilId] = useState();
  const [initData, setInitData] = useState();

  useEffect(() => {
    setPencilId(router.query.id);
  }, [router]);

  useEffect(async () => {
    if (pencilId) {
      try {
        const response = await ChefPencil.getTargetChefPencil(pencilId);

        // to get main image and create new array of pencil images in right order
        const clonedPencilImages = [...response?.data?.images];
        const mainImage = clonedPencilImages?.find(item => item.main_image);
        const pencilImages = clonedPencilImages?.filter(item => !item.main_image);

        const newData = {
          title: response?.data.title,
          html_content: response?.data?.html_content,
          images: [mainImage, ...pencilImages],
          error: null
        };

        setInitData(newData);
      } catch (e) {
        console.error(e);
      }
    }
  }, [pencilId]);

  return (
    <LayoutPageNew
      content={pencilId && initData && <FormCreateChefPencil initData={initData} isEditing id={pencilId} />}
    />
  );
};