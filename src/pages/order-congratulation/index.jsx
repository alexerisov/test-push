import React, { useEffect, useState } from 'react';
import { LayoutPage } from '@/components/layouts';
import { Basket } from '@/components/blocks/cart-page/basket';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'next/router';
import { withAuth } from '@/utils/authProvider';
import { BasicInput } from '@/components/basic-elements/basic-input';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button } from '@material-ui/core';
import { InputsBlock } from '@/components/basic-blocks/inputs-block';
import classes from './index.module.scss';
import { Divider } from '@/components/basic-elements/divider';
import { getCart } from '@/store/cart/actions';

const OrderCongratulationPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, []);

  let content = (
    <div className={classes.content}>
      <div className="col1">
        <div className={classes.info__header}></div>
        <div className={classes.info__subheader}></div>
        <div className={classes.info__subheader}></div>
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
}))(OrderCongratulationPage);

export default withRouter(withAuth(connector));
