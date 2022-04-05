import React, { useState } from 'react';
import s from './ProfilePasswordPage.module.scss';
import ContentLayout from '@/components/layouts/layout-profile-content';
import { restorePasswordActions } from '@/store/actions';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

import { modalActions } from '@/store/actions';
import LayoutPageNew from '@/components/layouts/layout-page-new';
import { useTranslation } from 'next-i18next';

const StyledTextField = styled(TextField)`
  width: 100%;
  .PrivateNotchedOutline-root-1:hover {
    border-color: #000000;
  }
`;

export const ProfilePasswordPage = props => {
  const { t } = useTranslation('profilePage');
  const handleClickPopupOpen = (name, params) => {
    props.dispatch(modalActions.open(name, params));
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required(t('errors:field_required.password')),
    new_password: Yup.string().required(t('errors:field_required.new_password')),
    confirm_password: Yup.string().when('new_password', {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('new_password')], t('errors:not_match.password'))
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
          formik.resetForm();
          setFormError('');
          handleClickPopupOpen('infoMessageModal', {
            title: t('password.successChange')
          });
        })
        .catch(error => {
          setFormError(t('errors:invalid.password'));
          console.log(error);
        });
    }
  });

  const content = (
    <>
      <ContentLayout>
        <h2 className={s.profile__title}>{t('password.title')}</h2>
        <form onSubmit={formik.handleSubmit} className={s.profile__data}>
          <div>
            <label className={s.profile__label}>
              <span style={{ color: 'red' }}>* </span>
              {t('password.current')}
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
            <label className={s.profile__label}>
              <span style={{ color: 'red' }}>* </span>
              {t('password.new')}
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
            <label className={s.profile__label}>
              <span style={{ color: 'red' }}>* </span>
              {t('password.confirm')}
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
          <button type="submit" className={s.profile__buttonUpdate}>
            {t('updateButton')}
          </button>
        </form>
        <p className={s.profile__errorForm}>{formError}</p>
      </ContentLayout>
    </>
  );

  return <LayoutPageNew content={content} />;
};
