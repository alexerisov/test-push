import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

import LayoutPage from '@/components/layouts/layout-page';
import { FormCreateChefPencil } from '@/components/forms';
import ChefPencil from '@/api/ChefPencil';

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

        const newData = {
          title: response?.data.title,
          html_content: response?.data?.html_content,
          image: response?.data?.image,
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
