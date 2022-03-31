import React from 'react';
import FormEditAccountChef from '@/components/forms/form-edit-account-chef/EditChefProfileForm';
import FormEditAccountUser from '@/components/forms/form-edit-account-user/EditViewerProfileForm';
import { useRouter } from 'next/router';
import LayoutPageNew from '@/components/layouts/layout-page-new';
import { useAuth } from '@/utils/Hooks';
import { USER_TYPES } from '~types/profile';
import { useSession } from 'next-auth/react';

export function ProfileAccountSettingsPage(props) {
  const router = useRouter();
  const { data: session, status: loading } = useSession();
  const userType = session?.user.user_type;

  const content =
    userType === USER_TYPES.VIEWER ? (
      <FormEditAccountUser profile={props.profile} />
    ) : (
      <FormEditAccountChef profile={props.profile} />
    );

  return <LayoutPageNew content={content} />;
}
