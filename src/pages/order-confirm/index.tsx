import React, { useEffect, useState } from 'react';
import { Basket } from '@/components/blocks/cart-page/basket';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useRouter, withRouter } from 'next/router';
import { BasicInput } from '@/components/basic-elements/basic-input';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Checkbox, CircularProgress } from '@material-ui/core';
import { InputsBlock } from '@/components/basic-blocks/inputs-block';
import classes from './index.module.scss';
import { Divider } from '@/components/basic-elements/divider';
import { getCart, types as cartTypes } from '@/store/cart/actions';
import Cart from '@/api/Cart';
import { BasicDatePicker } from '@/components/basic-elements/basic-date-picker';
import CheckboxIconUnchecked from '@/components/elements/checkbox-icon/checkbox-icon-unchecked';
import CheckboxIcon from '@/components/elements/checkbox-icon';
import dayjs from 'dayjs';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import LayoutPageNew from '@/components/layouts/layout-page-new';

const zipcodeRegExp = /^\d{4}[a-zA-Z]{2}|\d{4}\s[a-zA-Z]{2}$/;

const validationSchema = yup.object({
  isZipcodeFieldFocused: yup.boolean(),
  email: yup.string('Enter your email').emailWithoutSymbols().required('Email is required'),
  name: yup.string('Enter your name').required('Name is required'),
  phone: yup
    .string()
    .transform(value => value.replaceAll(/\s|[+]/g, ''))
    .min(5, 'Enter correct phone number')
    .required('Phone is required'),
  city: yup.string('Enter your city').required('City is required'),
  street: yup.string('Enter your street').required('Street is required'),
  house: yup.string('Enter your house').required('House is required'),
  flat: yup.string('Enter your flat').required('Flat is required'),
  zipcode: yup
    .string('Enter your zipcode')
    .when('isZipcodeFieldFocused', {
      is: true,
      then: yup
        .string()
        .test(
          'is-valid',
          'We deliver only within Amsterdam area. Enter zipcode that belongs to Amsterdam',
          async value => {
            try {
              const response = await Cart.validateZipcode(value);
              return response.data.result;
            } catch (e) {
              console.log(e);
              return false;
            }
          }
        )
    })
    .required('Zipcode is required')
});

const defaultFormValues = {
  email: '',
  name: '',
  phone: '',
  city: 'Amsterdam',
  street: '',
  house: '5',
  flat: '5',
  zipcode: '',
  date: new Date(),
  save_address: false
};

const getFormValuesFromProfile = profile => {
  return {
    email: profile?.email,
    name: profile?.full_name,
    phone: profile?.phone_number
  };
};

const getFormValuesFromLastOrder = async () => {
  const lastOrder = await JSON.parse(localStorage.getItem('last-order'));
  if (lastOrder === null) return {};
  const addressFromLastOrder = lastOrder.address
    ? await Cart.getAddress(lastOrder.address)
    : { city, street: null, house: null, flat: null, zipcode: null };
  const { email, customer_name, phone_number, city, street, house, flat, zipcode } = {
    ...lastOrder,
    ...addressFromLastOrder?.data
  };
  await localStorage.removeItem('last-order');
  return {
    email,
    name: customer_name,
    phone: phone_number,
    city,
    street,
    house,
    flat,
    zipcode
  };
};

const mergeFormValues = (defaultData, lastOrderData, profileData) => {
  return {
    email: lastOrderData?.email || profileData?.email || defaultData?.email,
    name: lastOrderData?.name || profileData?.name || defaultData?.name,
    phone: lastOrderData?.phone || profileData?.phone || defaultData?.phone,
    city: lastOrderData?.city || defaultData?.city,
    street: lastOrderData?.street || defaultData?.street,
    house: lastOrderData?.house || defaultData?.house,
    flat: lastOrderData?.flat || defaultData?.flat,
    zipcode: lastOrderData?.zipcode || defaultData?.zipcode,
    date: new Date(),
    save_address: false,
    isZipcodeFieldFocused: false
  };
};

const OrderConfirmPage = () => {
  const { t } = useTranslation('orderConfirmPage');
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({});
  const profile = useSelector(state => state.account?.profile);

  useEffect(() => {
    dispatch(getCart());
  }, []);

  useEffect(async () => {
    const lastOrderData = await getFormValuesFromLastOrder();
    const profileData = getFormValuesFromProfile(profile);
    const mergedValues = mergeFormValues(defaultFormValues, lastOrderData, profileData);
    setFormValues(mergedValues);
  }, []);

  const handleSubmit = async values => {
    await setIsLoading(true);
    const addressData = {
      zipcode: values.zipcode,
      city: values.city,
      street: values.street,
      house: values.house
    };

    const orderData = await Cart.postAddress(addressData)
      .then(res => {
        return {
          address: res.data.pk,
          email: values.email,
          customer_name: values.name,
          phone_number: values.phone.replaceAll(/[^\d]/g, ''),
          delivery_date: values.date.toISOString(),
          keep_address: values.save_address
        };
      })
      .catch(e => {
        setIsLoading(false);
        return e;
      });

    const order = await Cart.postOrder(orderData)
      .then(async r => {
        await localStorage.setItem('order', JSON.stringify(r.data));
        await localStorage.setItem('cart', JSON.stringify(cart));
        window.open(r.data.url, '_ blank');
        router.push('/order-congratulation', undefined, { locale: router.locale });
        setIsLoading(false);
        dispatch({ type: cartTypes.DELETE_CART });
      })
      .catch(e => {
        setIsLoading(false);
        return e;
      });
  };

  const formik = useFormik({
    initialValues: formValues,
    validationSchema: validationSchema,
    onSubmit: values => handleSubmit(values),
    enableReinitialize: true
  });

  const ButtonSpinner = () => <CircularProgress color="white" />;

  let content = (
    <div className={classes.content}>
      <div className="col1">
        <div className={classes.content__title}>Confirm and Pay</div>
        <Divider m="48px 0" />
        <form onSubmit={formik.handleSubmit}>
          <InputsBlock title="Your details">
            <BasicInput formik={formik} label="Email" name="email" placeholder="youremail@gmail.net" />
            <BasicInput
              formik={formik}
              size={0.5}
              label={t('name.label')}
              name="name"
              placeholder={t('name.placeholder')}
            />
            <BasicInput
              phone
              formik={formik}
              size={0.5}
              label={t('phone.label')}
              name="phone"
              placeholder="Phone number"
            />
          </InputsBlock>
          <Divider m="48px 0" />
          <InputsBlock title={t('shipping')}>
            <InputsBlock.Tabs isTabs>
              <InputsBlock.Tab label={t('courier')} />
              <InputsBlock.Tab disabled label="self-delivery" />
            </InputsBlock.Tabs>
            <InputsBlock.TabPanel index={0}>
              <BasicInput
                formik={formik}
                disabled
                size={0.5}
                label={t('city.label')}
                name="city"
                placeholder={t('city.placeholder')}
              />
              <BasicInput
                formik={formik}
                size={0.5}
                label={t('street.label')}
                name="street"
                placeholder={t('street.placeholder')}
              />
              {/*<BasicInput formik={formik} size={0.5} label="House" name="house" placeholder="Enter your house" />*/}
              {/*<BasicInput formik={formik} size={0.5} label="Flat" name="flat" placeholder="Enter your flat" />*/}
              <BasicInput
                formik={formik}
                label={t('zipcode.label')}
                name="zipcode"
                onChange={event => formik.setFieldValue('zipcode', event.target.value, false)}
                onFocus={event => {
                  event.target.focus();
                  formik.setFieldValue('isZipcodeFieldFocused', true);
                }}
                onBlur={event => {
                  formik.handleBlur(event);
                  formik.setFieldValue('isZipcodeFieldFocused', false);
                }}
                placeholder={t('zipcode.placeholder')}
                disableOnChangeValidation
              />
              <BasicDatePicker
                formik={formik}
                label={t('date.label')}
                name="date"
                minDate={dayjs()}
                maxDate={dayjs().add(1, 'month')}
              />
              <div className={classes.checkbox_wrapper}>
                <Checkbox
                  icon={<CheckboxIconUnchecked />}
                  checkedIcon={<CheckboxIcon />}
                  checked={formik.values.save_address}
                  value={formik.values.save_address}
                  onChange={formik.handleChange}
                  id="save_address"
                  name="save_address"
                  color="primary"
                />
                <label className={classes.checkbox_label} htmlFor="save_address">
                  {t('saveAddress')}
                </label>
              </div>
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
          <InputsBlock title={t('payWith')}>
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
          <Button startIcon={isLoading && <ButtonSpinner />} type="submit" className={classes.content__button}>
            {t('confirmButton')}
          </Button>
        </form>
      </div>
      <div className={classes.content__column2}>
        <Basket cart={cart} />
      </div>
    </div>
  );

  return <LayoutPageNew content={content} />;
};

const connector = connect(state => ({
  account: state.account
}))(OrderConfirmPage);

export default withRouter(connector);

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'orderConfirmPage', 'orderSummary']))
  }
});
