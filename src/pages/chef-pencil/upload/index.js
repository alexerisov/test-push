import React from 'react';
import { connect } from 'react-redux';

import LayoutPage from '@/components/layouts/layout-page';
import { FormCreateChefPencil } from '@/components/forms';

function CreateRecipe () {

  return (
    <LayoutPage content={<FormCreateChefPencil />} />
  );
}

export default connect()(CreateRecipe);
