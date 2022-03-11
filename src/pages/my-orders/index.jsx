import React, { useEffect, useState } from 'react';
import { LayoutPage } from '@/components/layouts';
import { connect, useDispatch } from 'react-redux';
import { useRouter, withRouter } from 'next/router';
import { withAuth } from '@/utils/authProvider';
import { Box, Button, Collapse } from '@material-ui/core';
import classes from './index.module.scss';
import { Divider } from '@/components/basic-elements/divider';
import HandCartIcon from '../../../public/icons/Hand Cart/Line.svg';
import CalendarIcon from '../../../public/icons/Calendar/Line.svg';
import RecipeIcon from '../../../public/icons/Receipt/Line.svg';
import WalletIcon from '../../../public/icons/Wallet/Line.svg';
import CheckIcon from '../../../public/icons/Check/Line.svg';
import { ProfileMenu } from '@/components/basic-blocks/profile-menu';
import Cookies from 'cookies';
import { ReactComponent as IceCreamIcon } from '../../../public/icons/Ice Cream/Line.svg';
import { cookingSkill, ORDER_STATUS, recipeTypes } from '@/utils/datasets';
import { ReactComponent as HatChefIcon } from '../../../public/icons/Hat Chef/Line.svg';
import Order from '@/api/Order';
import dayjs from 'dayjs';
import Typography from '@material-ui/core/Typography';
import { addManyToCart, clearCart, retryOrder } from '@/store/cart/actions';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const MyOrdersPage = props => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [orders, setOrders] = useState();
  const historyOrders = orders?.results?.filter(order => order?.status === 6);
  const activeOrders = orders?.results?.filter(order => order?.status !== 6);

  useEffect(async () => {
    const response = await Order.getOrderList();
    setOrders(response.data);
  }, []);

  const TextWithIcon = props => {
    const { icon, text, value } = props;
    return (
      <div className={classes.order__bill__wrapper}>
        <img src={icon} alt="icon" />
        <div className={classes.order__bill__text}>{text}</div>
        <div className={classes.order__bill__value}>{value}</div>
      </div>
    );
  };

  const ProductCategories = props => {
    const { recipe } = props;
    const recipeTypesList = recipe?.types;
    const recipeCookingSkills = recipe?.cooking_skills;
    return (
      <div className={classes.categories}>
        <div className={classes.categories_container}>
          <IceCreamIcon style={{ marginRight: 10 }} />
          <span className={classes.element_text}>
            {recipeTypesList?.length > 0 ? recipeTypesList.map(item => recipeTypes?.[item] + ' ') : 'Not defined'}
          </span>
        </div>
        <div className={classes.categories_container}>
          <HatChefIcon style={{ marginRight: 10 }} />
          <div className={classes.element_text}>{cookingSkill?.[recipeCookingSkills] || 'Not defined'}</div>
        </div>
      </div>
    );
  };

  const OrderBill = props => {
    const { order } = props;
    return (
      <div className={classes.order__bill}>
        <TextWithIcon icon={HandCartIcon} text="Booking code:" value={order?.pk} />
        <TextWithIcon icon={CalendarIcon} text="Date:" value={dayjs(order?.delivery_date).format('D MMM, YYYY')} />
        <TextWithIcon icon={RecipeIcon} text="Total:" value={'$' + order?.total_price} />
        <TextWithIcon icon={WalletIcon} text="Payment method:" value="Tikkie" />
        <TextWithIcon icon={CheckIcon} text="Status:" value={ORDER_STATUS?.[order?.status]} />
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
      <div className={classes.product}>
        <img className={classes.product__image} src={image} alt="image" />
        <Box flex="1" display="flex" flexDirection="column" justifyContent="center">
          <div className={classes.product__title}>{title}</div>
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
      <div className={classes.history__product}>
        <img className={classes.history__product__image} src={image} alt="image" />
        <Box flex="1" display="flex" flexDirection="column" justifyContent="space-between">
          <div className={classes.history__product__title}>{title}</div>
          {isLastElement && (
            <>
              <Collapse in={!isCollapsed}>
                <div className={classes.history__order__collapse}>
                  <OrderBill order={order} />
                </div>
              </Collapse>
              <Button onClick={showDetailsHandler} className={classes.history__order__details__button} variant="text">
                {isCollapsed ? 'Show Details' : 'Hide Details'}
              </Button>
            </>
          )}
        </Box>
        {isFirstElement && (
          <Button onClick={reorderButtonHandler} className={classes.history__order__reorder__button}>
            Reorder
          </Button>
        )}
      </div>
    );
  };

  const OrderCard = props => {
    const { order } = props;
    return (
      <div className={classes.order}>
        {order?.products.map((product, i, arr) => (
          <ProductElement key={product.pk} product={product} isLastElement={arr.length - 1 === i} order={order} />
        ))}
      </div>
    );
  };

  const HistoryOrderCard = props => {
    const { order } = props;
    return (
      <div className={classes.history__order}>
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

  let content = (
    <div className={classes.layout}>
      <div className={classes.layout__column1}>
        <ProfileMenu />
      </div>
      <div className={classes.layout__column2}>
        <div className={classes.layout__column2__title}>Orders</div>
        <div className={classes.layout__column2__subtitle}>Active</div>
        {activeOrders?.length > 0 && activeOrders.map(order => <OrderCard key={order.pk} order={order} />)}
        <Divider m="32px 0" />
        <div className={classes.layout__column2__subtitle}>History</div>
        {historyOrders?.length > 0 && historyOrders.map(order => <HistoryOrderCard key={order.pk} order={order} />)}
        {!historyOrders?.length > 0 && <Typography variant="h6">You have not delivered orders yet</Typography>}
      </div>
    </div>
  );

  return <LayoutPage content={content} />;
};

const connector = connect(state => ({
  account: state.account
}))(MyOrdersPage);

export default withRouter(withAuth(connector));

export async function getServerSideProps(context) {
  const cookies = new Cookies(context.req, context.res);
  const targetCookies = cookies.get('aucr');
  const token = !targetCookies ? undefined : decodeURIComponent(cookies.get('aucr'));
  const isAuthenticated = Boolean(token);

  try {
    return {
      props: {
        ...(await serverSideTranslations(context.locale, ['common'])),
        isAuthenticated,
        absolutePath: context.req.headers.host
      }
    };
  } catch (e) {
    console.error(e);

    return {
      props: {
        ...(await serverSideTranslations(context.locale, ['common'])),
        notFound: true
      }
    };
  }
}
