import React, { useState, useEffect } from 'react';
import LayoutPage from '@/components/layouts/layout-page';
import FormEditAccountChef from '@/components/forms/form-edit-account-chef';
import FormEditAccountUser from '@/components/forms/form-edit-account-user';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

const ProfileAccountSettings = props => {
  const router = useRouter();
  if (!props.account.profile) {
    return <div>loading...</div>;
  }

  React.useEffect(() => {
    var userLang = navigator.language || navigator.userLanguage;
    if (props.account.profile?.language === 'dutch' || userLang === 'nl') {
      router.locale = 'nl';
    } else {
      router.locale = 'en';
    }

    router.push('/', undefined, { locale: router.locale });
    router.push(router.asPath, undefined, { locale: router.locale });
  }, []);

  const { user_type } = props.account.profile;

  const content = user_type === 0 ? <FormEditAccountUser /> : <FormEditAccountChef />;

  return <LayoutPage content={content} />;
};

ProfileAccountSettings.propTypes = {
  account: PropTypes.object.isRequired
};

export default connect(state => ({
  account: state.account
}))(ProfileAccountSettings);

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
});
