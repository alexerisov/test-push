import React from 'react';

import { FormCreateChefPencil } from '@/components/forms';
import { withRouter } from 'next/router';
import LayoutPageNew from '@/components/layouts/layout-page-new';

function CreatePencil() {
  return <LayoutPageNew content={<FormCreateChefPencil />} />;
}

export default withRouter(CreatePencil);
