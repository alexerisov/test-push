import React, { useEffect, useState } from 'react';
import { Basket } from '@/components/blocks/cart-page/basket';
import { useRouter } from 'next/router';
import { Button } from '@material-ui/core';
import s from './OrderCongratulationPage.module.scss';
import { Divider } from '@/components/basic-elements/divider';
import HandCartIcon from '~public/icons/Hand Cart/Line.svg';
import CalendarIcon from '~public/icons/Calendar/Line.svg';
import RecipeIcon from '~public/icons/Receipt/Line.svg';
import WalletIcon from '~public/icons/Wallet/Line.svg';
import dayjs from 'dayjs';
import LayoutPageNew from '@/components/layouts/layout-page-new';
import { useTranslation } from 'next-i18next';

export const OrderCongratulationPage = () => {
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
      <div className={s.element_wrapper}>
        <Icon className={s.element_icon} />
        <div className={s.element_text}>{text}</div>
        <div className={s.element_value}>{value}</div>
      </div>
    );
  };

  let content = (
    <div className={s.content}>
      <div className={s.content__column1}>
        <div className={s.header}>{t('orderCongratulationPage:title')}</div>
        <div className={s.subheader}>{t('orderCongratulationPage:subtitle')}</div>
        <Divider m="32px 0" />
        <div className={s.info}>
          <div className={s.info__header}>{t('orderCongratulationPage:deliveryDetails')}</div>
          <TextWithIcon icon={HandCartIcon} text={`${t('orderInfo:bookingCode')}:`} value={order?.pk} />
          <TextWithIcon
            icon={CalendarIcon}
            text={`${t('orderInfo:date')}:`}
            value={dayjs(order?.delivery_date).format('D MMM, YYYY')}
          />
          <TextWithIcon icon={RecipeIcon} text={`${t('orderInfo:paymentMethod')}:`} value={'$' + order?.total_price} />
          <TextWithIcon icon={WalletIcon} text={`${t('orderInfo:status')}:`} value="Tikkie" />
          <div className={s.button_group}>
            <Button onClick={ordersButtonHandler} className={s.button__orders}>
              {t('orderCongratulationPage:yourOrdersButton')}
            </Button>
            <Button onClick={exploreButtonHandler} className={s.button__explore}>
              {t('orderCongratulationPage:exploreRecipesButton')}
            </Button>
          </div>
        </div>
      </div>
      <div className={s.content__column2}>{cart && <Basket cart={cart} />}</div>
    </div>
  );

  return <LayoutPageNew content={content} />;
};
