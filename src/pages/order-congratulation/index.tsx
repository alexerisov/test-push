import React, { useEffect, useState } from 'react';
import { Basket } from '@/components/blocks/cart-page/basket';
import { connect } from 'react-redux';
import { useRouter, withRouter } from 'next/router';
import { Button } from '@material-ui/core';
import classes from './index.module.scss';
import { Divider } from '@/components/basic-elements/divider';
import HandCartIcon from '../../../public/icons/Hand Cart/Line.svg';
import CalendarIcon from '../../../public/icons/Calendar/Line.svg';
import RecipeIcon from '../../../public/icons/Receipt/Line.svg';
import WalletIcon from '../../../public/icons/Wallet/Line.svg';
import dayjs from 'dayjs';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import LayoutPageNew from '@/components/layouts/layout-page-new';

const OrderCongratulationPage = () => {
  const router = useRouter();
  const [cart, setCart] = useState(null);
  const [order, setOrder] = useState(null);

  useEffect(async () => {
    const order = await JSON.parse(localStorage.getItem('order'));
    const cart = await JSON.parse(localStorage.getItem('cart'));
    setOrder(order);
    setCart(cart);
  }, []);

  const ordersButtonHandler = () => {
    router.replace('/my-orders');
  };

  const exploreButtonHandler = () => {
    router.replace('/search');
  };

  const TextWithIcon = props => {
    const { icon, text, value } = props;
    return (
      <div className={classes.element_wrapper}>
        <img src={icon} alt="icon" />
        <div className={classes.element_text}>{text}</div>
        <div className={classes.element_value}>{value}</div>
      </div>
    );
  };

  let content = (
    <div className={classes.content}>
      <div className={classes.content__column1}>
        <div className={classes.header}>Congratulation!</div>
        <div className={classes.subheader}>Your ingredients has been ordered! 🎉</div>
        <Divider m="32px 0" />
        <div className={classes.info}>
          <div className={classes.info__header}>Delivery details</div>
          <TextWithIcon icon={HandCartIcon} text="Booking code:" value={order?.pk} />
          <TextWithIcon icon={CalendarIcon} text="Date:" value={dayjs(order?.delivery_date).format('D MMM, YYYY')} />
          <TextWithIcon icon={RecipeIcon} text="Total:" value={'$' + order?.total_price} />
          <TextWithIcon icon={WalletIcon} text="Payment method:" value="Tikkie" />
          <div className={classes.button_group}>
            <Button onClick={ordersButtonHandler} className={classes.button__orders}>
              Your Orders
            </Button>
            <Button onClick={exploreButtonHandler} className={classes.button__explore}>
              Explore Other Recipes
            </Button>
          </div>
        </div>
      </div>
      <div className={classes.content__column2}>{cart && <Basket cart={cart} />}</div>
    </div>
  );

  return <LayoutPageNew content={content} />;
};

const connector = connect(state => ({
  account: state.account
}))(OrderCongratulationPage);

export default withRouter(connector);

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
});
