import React, { useState, useEffect } from 'react';
import classes from './index.module.scss';
import LayoutPage from '@/components/layouts/layout-page';
import ContentLayout from '@/components/layouts/layout-profile-content';
import FormEditAccountChef from '@/components/forms/form-edit-account-chef';
import PropTypes from 'prop-types';

import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import { profileActions, accountActions } from '@/store/actions';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StyledTextField = styled(TextField)`
  width: 100%;
  .PrivateNotchedOutline-root-1:hover {
    border-color: #000000;
  }
`;

const StyledInput = styled(Input)`
  display: none;
`;

function FormEditAccountUser(props) {
  if (!props.account.profile) {
    return <div>loading...</div>;
  }

  const phoneRegExp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){5,18}(\s*)?$/;

  const validationSchema = yup.object({
    email: yup.string('Enter your email').required('Email is required'),
    full_name: yup
      .string('Enter your Full Name')
      .min(1, 'Full Name should be of minimum 1 characters length')
      .max(80, 'Full Name should be of maximum 80 characters length'),
    phone_number: yup.string('Enter your Phone number').matches(phoneRegExp, 'Phone number is not valid')
  });

  const { email, full_name, phone_number, city, language, avatar, user_type } = props.account.profile;

  const [avatarFile, setAvatarFile] = useState(avatar);
  const [formStatus, setFormStatus] = useState('');
  const [statusSubmit, setStatusSubmit] = useState('Update');

  const formik = useFormik({
    initialValues: {
      email: email,
      full_name: full_name ?? '',
      phone_number: phone_number ?? '',
      city: city ?? '',
      language: language ?? '',
      avatar: avatar
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      setStatusSubmit('Loading...');
      setFormStatus('');
      values.user_type = user_type;
      props
        .dispatch(profileActions.updateProfileUser(values))
        .then(res => {
          setStatusSubmit('Update');
          setFormStatus(<span className={classes.profile__formStatus_true}>Successfully sent</span>);
          props.dispatch(accountActions.remind());
        })
        .catch(error => {
          setStatusSubmit('Update');
          setFormStatus(<span className={classes.profile__formStatus_error}>Error</span>);
          console.log(error);
        });
    }
  });

  const inputRef = React.createRef();

  const onClickUpload = () => {
    inputRef.current.click();
  };

  return (
    <ContentLayout>
      <h2 className={classes.profile__title}>Update a New Photo</h2>
      <form onSubmit={formik.handleSubmit} className={classes.profile__data}>
        <div className={classes.profile__formAvatar}>
          <div className={classes.profile__upload} onClick={onClickUpload}>
            {!avatarFile ? (
              <img src="/images/index/default-avatar.png" alt="avatar" className={classes.profile__avatar} />
            ) : (
              avatarFile && <img src={avatarFile} alt="avatar" className={classes.profile__avatar} />
            )}
            <div className={classes.profile__avatarBack} />
          </div>
          <input
            type="file"
            ref={inputRef}
            name="avatar"
            value={formik.avatar}
            hidden
            onChange={event => {
              setAvatarFile(URL.createObjectURL(event.currentTarget.files[0]));
              formik.setFieldValue('avatar', event.currentTarget.files[0]);
            }}
          />
          <label className={classes.profile__uploadLabel}>Profile-pic.jpg</label>
          <div className={classes.profile__buttonUpdate_place_avatar}>
            <button type="submit" className={classes.profile__buttonUpdate}>
              {statusSubmit}
            </button>
            <p className={classes.profile__formStatus}>{formStatus}</p>
          </div>
        </div>
        <h2 className={classes.profile__title}>Update User Information</h2>
        <div>
          <label className={classes.profile__label}>
            <span style={{ color: 'red' }}>* </span>Full Name
          </label>
          <StyledTextField
            id="full_name"
            name="full_name"
            value={formik.values.full_name ? formik.values.full_name : ''}
            onChange={formik.handleChange}
            variant="outlined"
            error={formik.touched.full_name && Boolean(formik.errors.full_name)}
            helperText={formik.touched.full_name && formik.errors.full_name}
          />
        </div>
        <div>
          <label className={classes.profile__label}>
            <span style={{ color: 'red' }}>* </span>Email
          </label>
          <StyledTextField
            disabled
            id="email"
            name="email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        <div>
          <label className={classes.profile__label}>Phone Number</label>
          <StyledTextField
            id="phone_number"
            name="phone_number"
            variant="outlined"
            value={formik.values.phone_number ? formik.values.phone_number : ''}
            onChange={formik.handleChange}
            error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
            helperText={formik.touched.phone_number && formik.errors.phone_number}
          />
        </div>
        <div>
          <label className={classes.profile__label}>City</label>
          <StyledTextField
            id="city"
            name="city"
            variant="outlined"
            value={formik.values.city ? formik.values.city : ''}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          />
        </div>
        <div>
          <label className={classes.profile__label}>Language</label>
          <StyledTextField
            id="language"
            name="language"
            variant="outlined"
            value={formik.values.language ? formik.values.language : ''}
            onChange={formik.handleChange}
            error={formik.touched.language && Boolean(formik.errors.language)}
            helperText={formik.touched.language && formik.errors.language}
          />
        </div>
        <div>
          <button type="submit" className={classes.profile__buttonUpdate}>
            {statusSubmit}
          </button>
          <p className={classes.profile__formStatus}>{formStatus}</p>
        </div>
      </form>
    </ContentLayout>
  );
}

FormEditAccountUser.propTypes = {
  account: PropTypes.object.isRequired
};

export default connect(state => ({
  account: state.account
}))(FormEditAccountUser);
