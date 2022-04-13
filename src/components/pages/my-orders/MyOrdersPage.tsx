import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Box, Button, Collapse } from '@material-ui/core';
import s from './MyOrdersPage.module.scss';
import { Divider } from '@/components/basic-elements/divider';
import HandCartIcon from '~public/icons/Hand Cart/Line.svg';
import CalendarIcon from '~public/icons/Calendar/Line.svg';
import RecipeIcon from '~public/icons/Receipt/Line.svg';
import WalletIcon from '~public/icons/Wallet/Line.svg';
import CheckIcon from '~public/icons/Check/Line.svg';
import { ProfileMenu } from '@/components/basic-blocks/profile-menu';
import IceCreamIcon from '~public/icons/Ice Cream/Line.svg';
import { COOKING_SKILLS, ORDER_STATUS, recipeTypes } from '@/utils/datasets';
import HatChefIcon from '~public/icons/Hat Chef/Line.svg';
import Order from '@/api/Order';
import dayjs from 'dayjs';
import Typography from '@material-ui/core/Typography';
import { retryOrder } from '@/store/cart/actions';
import LayoutPageNew from '@/components/layouts/layout-page-new';
import { useTranslation } from 'next-i18next';

const TextWithIcon = props => {
  const { icon, text, value } = props;
  const Icon = icon;
  return (
    <div className={s.order__bill__wrapper}>
      <Icon className={s.order__bill__icon} />
      <div className={s.order__bill__text}>{text}</div>
      <div className={s.order__bill__value}>{value}</div>
    </div>
  );
};

const ProductCategories = props => {
  const { t } = useTranslation('common');
  const { recipe } = props;
  const recipeTypesList = recipe?.types;
  const recipeCookingSkills = recipe?.cooking_skills;
  return (
    <div className={s.categories}>
      <div className={s.categories_container}>
        <IceCreamIcon style={{ marginRight: 10 }} />
        <span className={s.element_text}>
          {recipeTypesList?.length > 0 ? recipeTypesList.map(item => recipeTypes?.[item] + ' ') : t('notDefinedText')}
        </span>
      </div>
      <div className={s.categories_container}>
        <HatChefIcon style={{ marginRight: 10 }} />
        <div className={s.element_text}>{COOKING_SKILLS?.[recipeCookingSkills] || t('notDefinedText')}</div>
      </div>
    </div>
  );
};

const OrderBill = props => {
  const { t } = useTranslation('orderInfo');
  const { order } = props;
  return (
    <div className={s.order__bill}>
      <TextWithIcon icon={HandCartIcon} text={`${t('bookingCode')}:`} value={order?.pk} />
      <TextWithIcon
        icon={CalendarIcon}
        text={`${t('date')}:`}
        value={dayjs(order?.delivery_date).format('D MMM, YYYY')}
      />
      <TextWithIcon icon={RecipeIcon} text={`${t('paymentMethod')}:`} value={'$' + order?.total_price} />
      <TextWithIcon icon={WalletIcon} text={`${t('status')}:`} value="Tikkie" />
      <TextWithIcon icon={CheckIcon} text={`${t('total')}:`} value={ORDER_STATUS?.[order?.status]} />
    </div>
  );
};

const ProductElement = props => {
  const { product: recipe, isLastElement, order } = props;

  const title = recipe?.title;
  const image = recipe?.images?.[0]?.url;
  const price = recipe?.price;
  const ingredients = recipe?.ingredients;

  return (
    <div className={s.product}>
      <img className={s.product__image} src={image} alt="image" />
      <Box flex="1" display="flex" flexDirection="column" justifyContent="center">
        <div className={s.product__title}>{title}</div>
        <ProductCategories recipe={recipe} />
        {isLastElement && (
          <>
            <Divider m="20px 0" />
            <OrderBill order={order} />
          </>
        )}
      </Box>
    </div>
  );
};

const HistoryProductElement = props => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { product: recipe, isLastElement, isFirstElement, order } = props;

  const title = recipe?.title;
  const image = recipe?.images?.[0]?.url;
  const price = recipe?.price;
  const ingredients = recipe?.ingredients;

  const [isCollapsed, setIsCollapsed] = useState(true);

  const showDetailsHandler = () => {
    setIsCollapsed(!isCollapsed);
  };

  const reorderButtonHandler = async () => {
    dispatch(retryOrder(order));
    await localStorage.setItem('last-order', JSON.stringify(order));
    router.push('/cart', undefined, { locale: router.locale });
  };

  return (
    <div className={s.history__product}>
      <img className={s.history__product__image} src={image} alt="image" />
      <Box flex="1" display="flex" flexDirection="column" justifyContent="space-between">
        <div className={s.history__product__title}>{title}</div>
        {isLastElement && (
          <>
            <Collapse in={!isCollapsed}>
              <div className={s.history__order__collapse}>
                <OrderBill order={order} />
              </div>
            </Collapse>
            <Button onClick={showDetailsHandler} className={s.history__order__details__button} variant="text">
              {isCollapsed ? 'Show Details' : 'Hide Details'}
            </Button>
          </>
        )}
      </Box>
      {isFirstElement && (
        <Button onClick={reorderButtonHandler} className={s.history__order__reorder__button}>
          Reorder
        </Button>
      )}
    </div>
  );
};

const OrderCard = props => {
  const { order } = props;
  return (
    <div className={s.order}>
      {order?.products.map((product, i, arr) => (
        <ProductElement key={product.pk} product={product} isLastElement={arr.length - 1 === i} order={order} />
      ))}
    </div>
  );
};

const HistoryOrderCard = props => {
  const { order } = props;
  return (
    <div className={s.history__order}>
      {order?.products.map((product, i, arr) => (
        <>
          <HistoryProductElement
            key={product.pk}
            product={product}
            isLastElement={arr.length - 1 === i}
            isFirstElement={i === 0}
            order={order}
          />
          {arr.length - 1 === i && <Divider m="16px 0" />}
        </>
      ))}
    </div>
  );
};

export const MyOrdersPage = props => {
  const { t } = useTranslation('myOrdersPage');
  const [orders, setOrders] = useState();
  const historyOrders = orders?.results?.filter(order => order?.status === 6);
  const activeOrders = orders?.results?.filter(order => order?.status !== 6);
  const router = useRouter();

  useEffect(async () => {
    const response = await Order.getOrderList(router.locale);
    setOrders(response.data);
  }, []);

  let content = (
    <div className={s.layout}>
      <div className={s.layout__column1}>
        <ProfileMenu />
      </div>
      <div className={s.layout__column2}>
        <div className={s.layout__column2__title}>{t('title')}</div>
        <div className={s.layout__column2__subtitle}>{t('activeOrdersTitle')}</div>
        {activeOrders?.length > 0 && activeOrders.map(order => <OrderCard key={order.pk} order={order} />)}
        <Divider m="32px 0" />
        <div className={s.layout__column2__subtitle}>{t('historyOrdersTitle')}</div>
        {historyOrders?.length > 0 && historyOrders.map(order => <HistoryOrderCard key={order.pk} order={order} />)}
        {!historyOrders?.length > 0 && <Typography variant="h6">{t('emptyHistoryText')}</Typography>}
      </div>
    </div>
  );

  return <LayoutPageNew content={content} />;
};
