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

const useStyles = makeStyles(theme => ({
  tabs: {
    width: '100%'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '640px 400px',
    marginBottom: '2rem;'
  },
  [theme.breakpoints.up('md')]: {
    content: {
      gridTemplateColumns: '640px 400px',
      columnGap: '40px',
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
      <CartTabs {...tabsProps} />
      <div className={styles.content}>
        <TabContent products={data.products} selectedTab={selectedTab} />
        <Basket withButton products={data.products} total={data.total} />
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
    const response = await Cart.getProductList(token);
    const cartList = await response.data.results;
    const productsData = await Promise.all(
      cartList.map(async item => {
        let itemResponse = await Recipe.getRecipe(item.object_id);
        return { ...item, object: itemResponse.data };
      })
    );
    const total = productsData?.reduce((acc, val) => acc + val.object.price * val?.count, 0);
    return {
      props: {
        data: { products: productsData, total },
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
