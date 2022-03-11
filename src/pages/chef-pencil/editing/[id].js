import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

import LayoutPage from '@/components/layouts/layout-page';
import { FormCreateChefPencil } from '@/components/forms';
import ChefPencil from '@/api/ChefPencil';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function CreateRecipe() {
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
    <LayoutPage
      content={pencilId && initData && <FormCreateChefPencil initData={initData} isEditing id={pencilId} />}
    />
  );
}

export default connect()(CreateRecipe);
