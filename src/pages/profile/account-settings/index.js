import React from 'react';
import classes from "./index.module.scss";
import LayoutPage from '@/components/layouts/layout-page';
import ContentLayout from "@/components/layouts/layout-profile-content";

import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { profileActions } from '@/store/actions';

const ProfileAccountSettings = () => {

  const phoneRegExp = /^((\+1|\+7|)\d{3}\d{3}\d{4})$/;

  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    full_name: yup
      .string('Enter your Full Name')
      .min(1, 'Full Name should be of minimum 1 characters length')
      .max(80, 'Full Name should be of maximum 80 characters length')
      .required('Full Name is required'),
    phone_number: yup
      .string().matches(phoneRegExp, 'Phone number is not valid')
      .required('Phone number is required'),
    city: yup
    .string('Enter your city'),
    language: yup
    .string('Enter your language'),

  });

  const formik = useFormik({
    initialValues: {
      email: 'foobar@example.com',
      full_name: 'Neha Gupta',
      phone_number: '9990059934',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      profileActions.updateProfile(values)
    },
  });
  
  const content = <>
    <ContentLayout>
      <h2 className={classes.profile__title}>Update a New Photo</h2>
      <form onSubmit={formik.handleSubmit} className={classes.profile__data}>
        <div className={classes.profile__formAvatar}>
          <img src="/images/index/food.png" className={classes.profile__avatar} />
          <p>Profile-pic.jpg</p>
          {/* <button type="submit" className={classes.profile__buttonUpdate}>Update</button> */}
        </div>
        <h2 className={classes.profile__title}>Update User Information</h2>
        <TextField
          id="full_name"
          name="full_name"
          label="Full Name"
          value={formik.values.full_name}
          onChange={formik.handleChange}
          error={formik.touched.full_name && Boolean(formik.errors.full_name)}
          helperText={formik.touched.full_name && formik.errors.full_name}
        />
        <TextField
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          id="phone_number"
          name="phone_number"
          label="Phone Number"
          value={formik.values.phone_number}
          onChange={formik.handleChange}
          error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
          helperText={formik.touched.phone_number && formik.errors.phone_number}
        />
        <TextField
          id="city"
          name="city"
          label="City"
          onChange={formik.handleChange}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
        />
        <TextField
          id="language"
          name="language"
          label="Language"
          onChange={formik.handleChange}
          error={formik.touched.language && Boolean(formik.errors.language)}
          helperText={formik.touched.language && formik.errors.language}
        />
        <button type="submit" className={classes.profile__buttonUpdate}>Update</button>
      </form>
    </ContentLayout>
  </>

    //  <ContentLayout>
    //    <h2 className={classes.profile__title}>Update a New Photo</h2>
    //    <form className={classes.profile__formAvatar}>
    //      <img src="/images/index/food.png" className={classes.profile__avatar} />
    //      <p>Profile-pic.jpg</p>
    //      <button type="submit" className={classes.profile__buttonUpdate}>Update</button>
    //    </form>
    //    <h2 className={classes.profile__title}>Update User Information</h2>
    //    <form className={classes.profile__data}>
    //      <div>
    //        <p className={classes.profile__data__title}>Full Name</p>
    //        <input className={classes.profile__input} placeholder="Neha Gupta" />
    //      </div>
    //      <div>
    //        <p className={classes.profile__data__title}>Full Name</p>
    //        <input className={classes.profile__input} placeholder="Neha Gupta" />
    //      </div>
    //      <div>
    //        <p className={classes.profile__data__title}>Full Name</p>
    //        <input className={classes.profile__input} placeholder="Neha Gupta" />
    //      </div>
    //      <button type="submit" className={classes.profile__buttonUpdate}>Update</button>
    //    </form>
    //  </ContentLayout>

  return (
    <LayoutPage content={content} />
  );
};
  
export default ProfileAccountSettings;