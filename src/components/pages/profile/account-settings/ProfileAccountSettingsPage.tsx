import React from 'react';
import FormEditAccountChef from '@/components/forms/form-edit-account-chef/EditChefProfileForm';
import FormEditAccountUser from '@/components/forms/form-edit-account-user/EditViewerProfileForm';
import { useRouter } from 'next/router';
import LayoutPageNew from '@/components/layouts/layout-page-new';
import { useAuth } from '@/utils/Hooks';
import { USER_TYPES } from '~types/profile';
import useSWR from 'swr';
import http from '@/utils/http';

const fetcher = (...args) =>
  http
    .get(...args)
    .then(res => {
      return res?.data;
    })
    .catch(e => {
      console.log('error', e);
    });

export function ProfileAccountSettingsPage(props) {
  const router = useRouter();
  const { session, status: loading } = useAuth();
  const userType = session?.user.user_type;

  const { data: profile, error: error, isValidating: isAutocompleteLoading } = useSWR(`account/me`, fetcher);

  const content = props?.profile ? (
    userType === USER_TYPES.VIEWER ? (
      <FormEditAccountUser profile={props?.profile} />
    ) : (
      <FormEditAccountChef profile={props?.profile} />
    )
  ) : (
    <div>loading</div>
  );

  return <LayoutPageNew content={content} />;
}
