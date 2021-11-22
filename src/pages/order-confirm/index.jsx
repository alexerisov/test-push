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
import { Button, NoSsr } from '@material-ui/core';
import { InputsBlock } from '@/components/basic-blocks/inputs-block';

const useStyles = makeStyles(theme => ({
  content: {
    display: 'grid',
    paddingTop: '60px'
  },
  divider: {
    border: 'none',
    height: '1px',
    background: '#E0E4EB',
    margin: '48px 0px'
  },
  button: {
    background: '#FFAA00',
    borderRadius: '90px !important',
    margin: '32px 0px',
    fontSize: '16px',
    lineHeight: '160%',
    textAlign: 'center',
    letterSpacing: '0.01em',
    color: '#FCFCFD',
    '&:hover': {
      backgroundColor: '#FB8C00'
    }
  },
  page__title: {
    fontWeight: 600,
    fontSize: '32px',
    lineHeight: '140%',
    letterSpacing: '0.01em',
    color: '#14181F'
  },
  [theme.breakpoints.up('md')]: {
    content: {
      gridTemplateColumns: '640px 400px',
      flexDirection: 'row',
      columnGap: '80px',
      marginBottom: '2rem'
    }
  },

  [theme.breakpoints.only('sm')]: {
    content: {
      gridTemplateColumns: '385 400px'
    }
  },
  [theme.breakpoints.only('xs')]: {
    content: {
      gridTemplateColumns: '1fr'
    }
  }
}));

const validationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  name: yup.string('Enter your name').required('Name is required'),
  phone: yup.string('Enter your phone').required('Phone number is required')
});

const OrderConfirmPage = () => {
  const [products, setProducts] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(async () => {
    if (typeof window !== 'undefined') {
      setProducts(JSON.parse(localStorage.getItem('products')));
      setTotal(localStorage.getItem('total'));
    }
  });

  console.log('fromstorage', products);

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
  const styles = useStyles();

  let content = (
    <div className={styles.content}>
      <NoSsr>
        <div className="col1">
          <div className={styles.page__title}>Confirm and Pay</div>
          <hr className={styles.divider} />
          <form onSubmit={formik.handleSubmit}>
            <InputsBlock title="Your details">
              <BasicInput formik={formik} label="Email" name="email" placeholder="youremail@gmail.net" />
              <BasicInput size={0.5} formik={formik} label="Name" name="name" placeholder="Enter your name" />
              <BasicInput size={0.5} formik={formik} label="Phone" name="phone" placeholder="Phone number" />
            </InputsBlock>
            <hr className={styles.divider} />
            <InputsBlock title="Shipping">
              <InputsBlock.Tabs>
                <InputsBlock.Tab label="courier" />
                <InputsBlock.Tab label="self-delivery" />
              </InputsBlock.Tabs>
              <InputsBlock.TabPanel index={0}>
                <BasicInput size={0.5} formik={formik} label="City" name="city" placeholder="Enter your city" />
                <BasicInput size={0.5} formik={formik} label="Street" name="street" placeholder="Enter your street" />
                <BasicInput size={0.5} formik={formik} label="House" name="house" placeholder="Enter your house" />
                <BasicInput size={0.5} formik={formik} label="Flat" name="flat" placeholder="Enter your flat" />
              </InputsBlock.TabPanel>
              <InputsBlock.TabPanel index={1}>
                <div>self-delivery</div>
              </InputsBlock.TabPanel>
            </InputsBlock>
            <hr className={styles.divider} />
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
            <Button className={styles.button}>Confirm and Pay</Button>
          </form>
        </div>
      </NoSsr>
      <div className={styles.col2}>
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
