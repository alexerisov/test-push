import React, { useEffect, useState } from 'react';
import { LayoutPage } from '@/components/layouts';
import { Basket } from '@/components/blocks/cart-page/basket';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useRouter, withRouter } from 'next/router';
import { withAuth } from '@/utils/authProvider';
import { BasicInput } from '@/components/basic-elements/basic-input';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, IconButton } from '@material-ui/core';
import { InputsBlock } from '@/components/basic-blocks/inputs-block';
import classes from './index.module.scss';
import { Divider } from '@/components/basic-elements/divider';
import { getCart } from '@/store/cart/actions';
import HandCartIcon from '../../../public/icons/Hand Cart/Line.svg';
import CalendarIcon from '../../../public/icons/Calendar/Line.svg';
import RecipeIcon from '../../../public/icons/Receipt/Line.svg';
import WalletIcon from '../../../public/icons/Wallet/Line.svg';
import { ProfileMenu } from '@/components/basic-blocks/profile-menu';
import Cookies from 'cookies';
import Cart from '@/api/Cart';
import Typography from '@material-ui/core/Typography';
import { ReactComponent as IceCreamIcon } from '../../../public/icons/Ice Cream/Line.svg';
import { cookingSkill, recipeTypes } from '@/utils/datasets';
import { ReactComponent as HatChefIcon } from '../../../public/icons/Hat Chef/Line.svg';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import Order from '@/api/Order';
import dayjs from 'dayjs';

const MyOrdersPage = props => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [orders, setOrders] = useState();

  useEffect(async () => {
    const response = await Order.getOrderList();
    setOrders(response.data);
  }, []);

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

  const ProductElement = props => {
    const { product: recipe, isLastElement, order } = props;

    const title = recipe?.title;
    const image = recipe?.images[0]?.url;
    const price = recipe?.price;
    const recipeTypesList = recipe?.types;
    const recipeCookingSkills = recipe?.cooking_skills;
    const ingredients = recipe?.ingredients;

    return (
      <Box display="flex" alignItems="flex-start" gridColumnGap="24px" marginBottom="20px">
        <img className={classes.image} src={image} alt="image" />
        <Box flex="1" display="flex" flexDirection="column" justifyContent="center">
          <Typography variant="h6" noWrap className={classes.title}>
            {title}
          </Typography>
          <div className={classes.categories}>
            <div className={classes.element_container}>
              <IceCreamIcon style={{ marginRight: 10 }} />
              <span className={classes.element_text}>
                {recipeTypesList?.length > 0 ? recipeTypesList.map(item => recipeTypes?.[item] + ' ') : 'Not defined'}
              </span>
            </div>
            <div className={classes.element_container}>
              <HatChefIcon style={{ marginRight: 10 }} />
              <div className={classes.element_text}>{cookingSkill?.[recipeCookingSkills] || 'Not defined'}</div>
            </div>
          </div>
          {isLastElement && (
            <>
              <Divider m="20px 0" />
              <div className={classes.info}>
                <TextWithIcon icon={HandCartIcon} text="Booking code:" value={order?.pk} />
                <TextWithIcon
                  icon={CalendarIcon}
                  text="Date:"
                  value={dayjs(order?.delivery_date).format('D MMM, YYYY')}
                />
                <TextWithIcon icon={RecipeIcon} text="Total:" value={'$' + order?.total_price} />
                <TextWithIcon icon={WalletIcon} text="Payment method:" value="Tikkie" />
              </div>
            </>
          )}
        </Box>
      </Box>
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

  let content = (
    <div className={classes.content}>
      <div className={classes.content__column1}>
        <ProfileMenu />
      </div>
      <div className={classes.content__column2}>
        <div className={classes.title}>Orders</div>
        <div className={classes.subtitle}>Active</div>
        {orders?.results?.length > 0 && orders.results.map(order => <OrderCard key={order.pk} order={order} />)}
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
        isAuthenticated,
        absolutePath: context.req.headers.host
      }
    };
  } catch (e) {
    console.error(e);

    return {
      props: {
        notFound: true
      }
    };
  }
}
