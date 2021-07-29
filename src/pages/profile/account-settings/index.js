import React, { useState, useEffect } from 'react';
import LayoutPage from '@/components/layouts/layout-page';
import FormEditAccountChef from "@/components/forms/form-edit-account-chef";
import FormEditAccountUser from "@/components/forms/form-edit-account-user";
import PropTypes from "prop-types";
import { connect } from 'react-redux';

const ProfileAccountSettings = (props) => {

  if (!props.account.profile) {
    return (<div>loading...</div>);
  }

  const { user_type } = props.account.profile;

  const content = (user_type === 0)
    ? <FormEditAccountUser />
    : <FormEditAccountChef />

  return (
    <LayoutPage content={content} />
  );
};

ProfileAccountSettings.propTypes = {
  account: PropTypes.object.isRequired,
};

export default connect((state => ({
  account: state.account,
})))(ProfileAccountSettings);