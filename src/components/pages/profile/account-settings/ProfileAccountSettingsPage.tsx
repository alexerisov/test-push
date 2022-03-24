import React from 'react';
import FormEditAccountChef from '@/components/forms/form-edit-account-chef';
import FormEditAccountUser from '@/components/forms/form-edit-account-user';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import LayoutPageNew from '@/components/layouts/layout-page-new';
import { VIEWER_TYPE } from '@/utils/constants';
import { useAuth } from '@/utils/Hooks';

export function ProfileAccountSettingsPage(props) {
  const router = useRouter();
  const { session } = useAuth();
  const userType = session?.user.user_type;

  const content =
    userType === VIEWER_TYPE ? (
      <FormEditAccountUser profile={props.profile} />
    ) : (
      <FormEditAccountChef profile={props.profile} />
    );

  return <LayoutPageNew content={content} />;
}
