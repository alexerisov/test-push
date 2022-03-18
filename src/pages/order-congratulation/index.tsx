import React, { useEffect, useState } from 'react';
import { Basket } from '@/components/blocks/cart-page/basket';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useRouter, withRouter } from 'next/router';
import { withAuth } from '@/utils/authProvider';
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
import { RootState } from '@/store/store';
import { useTranslation } from 'next-i18next';

const OrderCongratulationPage = () => {
  const { t } = useTranslation(['orderCongratulationPage', 'orderInfo']);
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
    const Icon = icon;
    return (
      <div className={classes.element_wrapper}>
        <Icon className={classes.element_icon} />
        <div className={classes.element_text}>{text}</div>
        <div className={classes.element_value}>{value}</div>
      </div>
    );
  };

  let content = (
    <div className={classes.content}>
      <div className={classes.content__column1}>
        <div className={classes.header}>{t('orderCongratulationPage:title')}</div>
        <div className={classes.subheader}>{t('orderCongratulationPage:subtitle')}</div>
        <Divider m="32px 0" />
        <div className={classes.info}>
          <div className={classes.info__header}>{t('orderCongratulationPage:deliveryDetails')}</div>
          <TextWithIcon icon={HandCartIcon} text={`${t('orderInfo:bookingCode')}:`} value={order?.pk} />
          <TextWithIcon
            icon={CalendarIcon}
            text={`${t('orderInfo:date')}:`}
            value={dayjs(order?.delivery_date).format('D MMM, YYYY')}
          />
          <TextWithIcon icon={RecipeIcon} text={`${t('orderInfo:paymentMethod')}:`} value={'$' + order?.total_price} />
          <TextWithIcon icon={WalletIcon} text={`${t('orderInfo:status')}:`} value="Tikkie" />
          <div className={classes.button_group}>
            <Button onClick={ordersButtonHandler} className={classes.button__orders}>
              {t('orderCongratulationPage:yourOrdersButton')}
            </Button>
            <Button onClick={exploreButtonHandler} className={classes.button__explore}>
              {t('orderCongratulationPage:exploreRecipesButton')}
            </Button>
          </div>
        </div>
      </div>
      <div className={classes.content__column2}>{cart && <Basket cart={cart} />}</div>
    </div>
  );

  return <LayoutPageNew content={content} />;
};

const connector = connect((state: RootState) => ({
  account: state.account
}))(OrderCongratulationPage);

export default withRouter(withAuth(connector));

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'orderCongratulationPage', 'orderSummary', 'orderInfo']))
  }
});
