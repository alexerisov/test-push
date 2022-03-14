import React, { useState } from 'react';
import classes from './index.module.scss';
import ContentLayout from '@/components/layouts/layout-profile-content';
import { restorePasswordActions } from '@/store/actions';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { modalActions } from '@/store/actions';
import LayoutPageNew from '@/components/layouts/layout-page-new';

const StyledTextField = styled(TextField)`
  width: 100%;
  .PrivateNotchedOutline-root-1:hover {
    border-color: #000000;
  }
`;

const ProfilePassword = props => {
  const handleClickPopupOpen = (name, params) => {
    props.dispatch(modalActions.open(name, params));
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required('Enter your password'),
    new_password: Yup.string().required('New password is required'),
    confirm_password: Yup.string().when('new_password', {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('new_password')], 'Passwords do not match')
    })
  });

  const [formError, setFormError] = useState('');

  const formik = useFormik({
    initialValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      props
        .dispatch(restorePasswordActions.changePassword(values))
        .then(() => {
          formik.handleReset();
          setFormError('');
          handleClickPopupOpen('infoMessageModal', {
            title: 'Password changed successfully'
          });
        })
        .catch(error => {
          setFormError('Invalid password');
          console.log(error);
        });
    }
  });

  const content = (
    <>
      <ContentLayout>
        <h2 className={classes.profile__title}>Update Password</h2>
        <form onSubmit={formik.handleSubmit} className={classes.profile__data}>
          <div>
            <label className={classes.profile__label}>
              <span style={{ color: 'red' }}>* </span>Current Password
            </label>
            <StyledTextField
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              variant="outlined"
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <label className={classes.profile__label}>
              <span style={{ color: 'red' }}>* </span>New Password
            </label>
            <StyledTextField
              type="password"
              id="new_password"
              name="new_password"
              value={formik.values.new_password}
              onChange={formik.handleChange}
              variant="outlined"
              error={formik.touched.new_password && Boolean(formik.errors.new_password)}
              helperText={formik.touched.new_password && formik.errors.new_password}
            />
            <label className={classes.profile__label}>
              <span style={{ color: 'red' }}>* </span>Confirm Password
            </label>
            <StyledTextField
              type="password"
              id="confirm_password"
              name="confirm_password"
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              variant="outlined"
              error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
              helperText={formik.touched.confirm_password && formik.errors.confirm_password}
            />
          </div>
          <button type="submit" className={classes.profile__buttonUpdate}>
            Update
          </button>
        </form>
        <p className={classes.profile__errorForm}>{formError}</p>
      </ContentLayout>
    </>
  );

  return <LayoutPageNew content={content} />;
};

export default connect(state => ({
  account: state.account,
  restorePassword: state.restorePassword
}))(ProfilePassword);
