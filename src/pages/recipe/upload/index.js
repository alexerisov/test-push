import React from 'react';
import { connect } from 'react-redux';

import LayoutPage from '@/components/layouts/layout-page';
import { FormCreateRecipe } from '@/components/forms';

function CreateRecipe() {
  return <LayoutPage content={<FormCreateRecipe />} />;
}

export default connect()(CreateRecipe);
