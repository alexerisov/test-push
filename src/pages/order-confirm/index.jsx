import React, { useEffect, useState } from 'react';
import { LayoutPage } from '@/components/layouts';
import { Basket } from '@/components/blocks/cart-page/basket';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { withAuth } from '@/utils/authProvider';
import { BasicInput } from '@/components/basic-elements/basic-input';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button } from '@material-ui/core';
import { InputsBlock } from '@/components/basic-blocks/inputs-block';
import classes from './index.module.scss';

const validationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  name: yup.string('Enter your name').required('Name is required'),
  phone: yup.string('Enter your phone').required('Phone number is required'),
  city: yup.string('Enter your city').required('City is required'),
  street: yup.string('Enter your street').required('Street is required'),
  house: yup.string('Enter your house').required('House is required'),
  flat: yup.string('Enter your flat').required('Flat is required')
});

const OrderConfirmPage = () => {
  const [products, setProducts] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(async () => {
    if (typeof window !== 'undefined') {
      setProducts(JSON.parse(localStorage.getItem('products')));
      setTotal(localStorage.getItem('total'));
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      phone: '',
      city: '',
      street: '',
      house: '',
      flat: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  let content = (
    <div className={classes.content}>
      <div className="col1">
        <div className={classes.content__title}>Confirm and Pay</div>
        <hr className={classes.content__divider} />
        <form onSubmit={formik.handleSubmit}>
          <InputsBlock title="Your details">
            <BasicInput formik={formik} label="Email" name="email" placeholder="youremail@gmail.net" />
            <BasicInput formik={formik} size={0.5} label="Name" name="name" placeholder="Enter your name" />
            <BasicInput formik={formik} size={0.5} label="Phone" name="phone" placeholder="Phone number" />
          </InputsBlock>
          <hr className={classes.content__divider} />
          <InputsBlock title="Shipping">
            <InputsBlock.Tabs>
              <InputsBlock.Tab label="courier" />
              <InputsBlock.Tab label="self-delivery" />
            </InputsBlock.Tabs>
            <InputsBlock.TabPanel index={0}>
              <BasicInput formik={formik} size={0.5} label="City" name="city" placeholder="Enter your city" />
              <BasicInput formik={formik} size={0.5} label="Street" name="street" placeholder="Enter your street" />
              <BasicInput formik={formik} size={0.5} label="House" name="house" placeholder="Enter your house" />
              <BasicInput formik={formik} size={0.5} label="Flat" name="flat" placeholder="Enter your flat" />
            </InputsBlock.TabPanel>
            <InputsBlock.TabPanel index={1}>
              <div>self-delivery</div>
            </InputsBlock.TabPanel>
          </InputsBlock>
          <hr className={classes.content__divider} />
          <InputsBlock title="Pay with">
            <InputsBlock.Tabs>
              <InputsBlock.Tab label="Paypal" />
              <InputsBlock.Tab label="Credit card" />
            </InputsBlock.Tabs>
            <InputsBlock.TabPanel index={0}>
              <div>Pay Pal</div>
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
        <Basket products={products} total={total} />
      </div>
    </div>
  );

  return <LayoutPage content={content} />;
};

const connector = connect(state => ({
  account: state.account
}))(OrderConfirmPage);

export default withRouter(withAuth(connector));
