import React, { useEffect, useState } from 'react';
import { LayoutPage } from '@/components/layouts';
import { TabContent } from '@/components/blocks/cart-page/tab-content';
import { CartTabs } from '@/components/blocks/cart-page/tabs';
import { Basket } from '@/components/blocks/cart-page/basket';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'cookies';
import Recipe from '@/api/Recipe';
import Cart from '@/api/Cart';
import { connect, useDispatch, useSelector } from 'react-redux';
import { setCart } from '@/store/cart/actions';
import { useRouter, withRouter } from 'next/router';
import { withAuth } from '@/utils/authProvider';
import classes from './index.module.scss';

const useStyles = makeStyles(theme => ({
  tabs: {
    width: '100%'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: 'auto 400px',
    marginBottom: '2rem;'
  },
  [theme.breakpoints.up('md')]: {
    content: {
      gridTemplateColumns: 'auto 400px',
      columnGap: '40px',
      marginBottom: '2rem'
    }
  },
  [theme.breakpoints.only('sm')]: {
    content: {
      gridTemplateColumns: '1fr'
    }
  },
  [theme.breakpoints.only('xs')]: {
    content: {
      gridTemplateColumns: '1fr'
    }
  }
}));

const CartPage = props => {
  const router = useRouter();
  const dispatch = useDispatch();
  const styles = useStyles();
  const [selectedTab, setSelectedTab] = useState(1);
  const data = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(setCart(props.data));
  }, []);

  const onTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    router.replace(router.asPath);
  };

  const tabsProps = {
    selectedTab,
    onTabChange
  };

  let content = (
    <div className={styles.tabs}>
      <div className={classes.header}>Your Cart</div>
      <div className={styles.content}>
        <TabContent products={data.products} selectedTab={selectedTab} />
        <Basket cart={data} withButton />
      </div>
    </div>
  );

  return <LayoutPage content={content} />;
};

const connector = connect(state => ({
  account: state.account
}))(CartPage);

export default withRouter(withAuth(connector));

export async function getServerSideProps(context) {
  const cookies = new Cookies(context.req, context.res);
  const targetCookies = cookies.get('aucr');
  const token = !targetCookies ? undefined : decodeURIComponent(cookies.get('aucr'));
  const isAuthenticated = Boolean(token);

  try {
    const delivery = await Cart.getDeliveryPrice();
    const deliveryPrice = delivery.data.price;

    const response = await Cart.getProductList(token);
    const cartList = await response.data.results;

    const productsData = await Promise.all(
      cartList.map(async item => {
        let itemResponse = await Recipe.getRecipe(item.object_id);
        return { ...item, object: itemResponse.data };
      })
    );
    const productsSum = productsData?.reduce((acc, val) => acc + val.object.price * val?.count, 0);
    const total = productsSum + deliveryPrice;

    return {
      props: {
        data: { products: productsData, total, deliveryPrice },
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
