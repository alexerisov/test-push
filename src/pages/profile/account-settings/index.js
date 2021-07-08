import React, { useState, useEffect } from 'react';
import classes from "./index.module.scss";
import LayoutPage from '@/components/layouts/layout-page';
import ContentLayout from "@/components/layouts/layout-profile-content";
import PropTypes from "prop-types";

import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import { profileActions, accountActions } from '@/store/actions';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StyledTextField = styled(TextField)`
  width: 525px;
    .PrivateNotchedOutline-root-1:hover {
      border-color: #000000;
    }
`;

const StyledInput = styled(Input)`
  display: none;
`;

const ProfileAccountSettings = (props) => {

  if (!props.account.profile) {
    return (<div>loading...</div>);
  }

  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    full_name: yup
      .string('Enter your Full Name')
      .min(1, 'Full Name should be of minimum 1 characters length')
      .max(80, 'Full Name should be of maximum 80 characters length'),
    phone_number: yup
      .string('Enter your Phone number')
      .required('Phone number is required'),
  });

  const { email, full_name, phone_number, city, language, avatar } = props.account.profile;

  const formik = useFormik({
    initialValues: {
      email: email,
      full_name: full_name,
      phone_number: phone_number,
      city: city,
      language: language,
      avatar: avatar
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values)
      props.dispatch(profileActions.updateProfile(values))
      .then((res) => {
        props.dispatch(accountActions.remind());
      })
    },
  });

  const inputRef = React.createRef();

  const onClickUpload = () => {
    inputRef.current.click();
  };

  const content = <>
    <ContentLayout>
      <h2 className={classes.profile__title}>Update a New Photo</h2>
      <form onSubmit={formik.handleSubmit} className={classes.profile__data}>
        <div className={classes.profile__formAvatar}>
          <div className={classes.profile__upload} onClick={onClickUpload}>
            <img src={avatar} alt="avatar" className={classes.profile__avatar}/>
            <div className={classes.profile__avatarBack} />
          </div>
          <input
              type="file"
              ref={inputRef}
              name="avatar"
              value={formik.avatar}
              hidden
              onChange = {(event) => {
                formik.setFieldValue("avatar", event.currentTarget.files[0]);
              }}
          />
          <label>Profile-pic.jpg</label>
          <button type="submit" className={classes.profile__buttonUpdate}>Update</button>
        </div>
        <h2 className={classes.profile__title}>Update User Information</h2>
        <div>
          <label className={classes.profile__label}>Full Name</label>
          <StyledTextField
            id="full_name"
            name="full_name"
            value={formik.values.full_name}
            onChange={formik.handleChange}
            variant="outlined"
            error={formik.touched.full_name && Boolean(formik.errors.full_name)}
            helperText={formik.touched.full_name && formik.errors.full_name}
          />
        </div>
        <div>
          <label className={classes.profile__label}>Email</label>
          <StyledTextField
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
            value={formik.values.phone_number}
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
            value={formik.values.city}
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
            value={formik.values.language}
            onChange={formik.handleChange}
            error={formik.touched.language && Boolean(formik.errors.language)}
            helperText={formik.touched.language && formik.errors.language}
          />
        </div>
        <button type="submit" className={classes.profile__buttonUpdate}>Update</button>
      </form>
    </ContentLayout>
  </>

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