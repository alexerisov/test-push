import React from 'react';

import LayoutPage from '@/components/layouts/layout-page';
import { FormCreateChefPencil } from '@/components/forms';
import { withRouter } from 'next/router';
import { RedirectWithoutAuthAndByCheckingUserType } from '@/utils/authProvider';
import { CHEF_TYPE } from '@/utils/constants';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function CreatePencil() {
  return <LayoutPage content={<FormCreateChefPencil />} />;
}

export default withRouter(RedirectWithoutAuthAndByCheckingUserType(CreatePencil, CHEF_TYPE));

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
});
