import React, { useEffect, useState } from 'react';
import { LayoutPage } from '@/components/layouts';
import { Basket } from '@/components/blocks/cart-page/basket';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useRouter, withRouter } from 'next/router';
import { withAuth } from '@/utils/authProvider';
import { BasicInput } from '@/components/basic-elements/basic-input';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button } from '@material-ui/core';
import { InputsBlock } from '@/components/basic-blocks/inputs-block';
import classes from './index.module.scss';
import { Divider } from '@/components/basic-elements/divider';
import { getCart } from '@/store/cart/actions';
import Cart from '@/api/Cart';

const phoneRegExp = /^\d-\(\d{3}\)-\d{3}-\d{2}-\d{2}$/;
const zipcodeRegExp = /^\d{4}[a-zA-Z]{2}|\d{4}\s[a-zA-Z]{2}$/;

const validationSchema = yup.object({
  // email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  // name: yup.string('Enter your name').required('Name is required'),
  // phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone is required'),
  // city: yup.string('Enter your city').required('City is required'),
  // street: yup.string('Enter your street').required('Street is required'),
  // house: yup.string('Enter your house').required('House is required'),
  // flat: yup.string('Enter your flat').required('Flat is required'),
  // zipcode: yup
  //   .string('Enter your zipcode')
  //   .matches(zipcodeRegExp, 'Zipcode is not valid')
  //   .required('Zipcode is required')
});

const OrderConfirmPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      phone: '',
      city: 'Amsterdam',
      street: '',
      house: '',
      flat: '',
      zipcode: ''
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      const addressData = {
        // zipcode: values.zipcode,
        // address_first: values.city,
        // address_second: values.street,
        // house_number: values.house,
        // phone_number: values.phone
        zipcode: '1234aa',
        address_first: 'string',
        address_second: 'string',
        house_number: 0,
        city: 'Amsterdam',
        phone_number: '909909909'
      };
      await Cart.postAddress(addressData);
      const response = await Cart.postOrder();
      const url = response.data.url;
      window.location.assign('https://duckduckgo.com/');
    }
  });

  let content = (
    <div className={classes.content}>
      <div className="col1">
        <div className={classes.content__title}>Confirm and Pay</div>
        <Divider m="48px 0" />
        <form onSubmit={formik.handleSubmit}>
          <InputsBlock title="Your details">
            <BasicInput formik={formik} label="Email" name="email" placeholder="youremail@gmail.net" />
            <BasicInput formik={formik} size={0.5} label="Name" name="name" placeholder="Enter your name" />
            <BasicInput
              formik={formik}
              size={0.5}
              label="Phone"
              name="phone"
              placeholder="Phone number"
              mask="9-(999)-999-99-99"
            />
          </InputsBlock>
          <Divider m="48px 0" />
          <InputsBlock title="Shipping">
            <InputsBlock.Tabs isTabs>
              <InputsBlock.Tab label="courier" />
              <InputsBlock.Tab disabled label="self-delivery" />
            </InputsBlock.Tabs>
            <InputsBlock.TabPanel index={0}>
              <BasicInput formik={formik} disabled size={0.5} label="City" name="city" placeholder="Enter your city" />
              <BasicInput formik={formik} size={0.5} label="Street" name="street" placeholder="Enter your street" />
              <BasicInput formik={formik} size={0.5} label="House" name="house" placeholder="Enter your house" />
              <BasicInput formik={formik} size={0.5} label="Flat" name="flat" placeholder="Enter your flat" />
              <BasicInput formik={formik} size={0.5} label="Zipcode" name="zipcode" placeholder="Enter your zipcode" />
            </InputsBlock.TabPanel>
            <InputsBlock.TabPanel index={1}>
              <div className={classes.address__container}>
                <div className={classes.address__street}>Brooklyn, Leffets Ave, 742</div>
                <div className={classes.address__title}>Restaurant "Albyn"</div>
                <Divider m="16px 0" />
                <div className={classes.address__date}>Mon-Sun 10 AM - 11 PM * 26 Sep, 2021</div>
              </div>
              <div className={classes.map}>
                <img src="/images/index/map.png" alt="map" />
              </div>
            </InputsBlock.TabPanel>
          </InputsBlock>
          <Divider m="48px 0" />
          <InputsBlock title="Pay with">
            <InputsBlock.Tabs isTabs>
              <InputsBlock.Tab label="Tikkie" />
              <InputsBlock.Tab disabled label="Credit card" />
            </InputsBlock.Tabs>
            <InputsBlock.TabPanel index={0}>
              <div className={classes.payment}>
                <div className={classes.payment__title}>Tikkie</div>
                <div className={classes.payment__image}>
                  <img src="/images/index/tikkie.svg" alt="tikkie" width="100px" />
                </div>
              </div>
            </InputsBlock.TabPanel>
            <InputsBlock.TabPanel index={1}>
              <div>Credit card</div>
            </InputsBlock.TabPanel>
          </InputsBlock>
          <Button type="submit" className={classes.content__button}>
            Confirm and Pay
          </Button>
        </form>
      </div>
      <div className={classes.content__column2}>
        <Basket products={cart.products} total={cart.total} />
      </div>
    </div>
  );

  return <LayoutPage content={content} />;
};

const connector = connect(state => ({
  account: state.account
}))(OrderConfirmPage);

export default withRouter(withAuth(connector));
