import React, { useEffect, useState } from 'react';
import { LayoutPage } from '@/components/layouts';
import { TabContent } from '@/components/blocks/cart-page/tab-content';
import { CartTabs } from '@/components/blocks/cart-page/tabs';
import { Basket } from '@/components/blocks/cart-page/basket';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'cookies';
import Recipe from '@/api/Recipe';
import Cart from '@/api/Cart';

const useStyles = makeStyles(theme => ({
  tabs: {
    width: '100%'
  },
  content: {
    display: 'flex',
    marginBottom: '2rem;'
  },
  [theme.breakpoints.only('xs')]: {
    content: {
      flexDirection: 'column'
    }
  }
}));

const CartPage = props => {
  const styles = useStyles();
  const [selectedTab, setSelectedTab] = useState(1);
  const [data, setData] = useState(null);

  const [basketPrice, setBasketPrice] = useState();
  const [basketDiscount, setBasketDiscount] = useState(10);
  const [basketTotal, setBasketTotal] = useState(null);

  useEffect(() => {
    setData(props?.data);
  }, []);

  useEffect(() => {
    const summary = data?.reduce((acc, val) => acc + 100, 0); // TODO Заменить заглушку на цену из api
    const total = summary * (1 - basketDiscount / 100);
    setBasketPrice(summary);
    setBasketTotal(total);
  }, [data]);

  const onTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const tabsProps = {
    selectedTab,
    onTabChange
  };

  const basketProps = {
    count: data?.length,
    price: basketPrice,
    discount: basketDiscount,
    total: basketTotal
  };

  let content = (
    <div className={styles.tabs}>
      {data?.length > 0 && (
        <>
          <CartTabs {...tabsProps} />
          <div className={styles.content}>
            <TabContent products={data} selectedTab={selectedTab} />
            <Basket {...basketProps} />
          </div>
        </>
      )}
    </div>
  );

  return <LayoutPage content={content} />;
};

export default CartPage;

export async function getServerSideProps(context) {
  const cookies = new Cookies(context.req, context.res);
  const targetCookies = cookies.get('aucr');
  const token = !targetCookies ? undefined : decodeURIComponent(cookies.get('aucr'));

  try {
    const response = await Cart.getProductList(token);
    const cartList = await response.data.results;
    const productsData = await Promise.all(
      cartList.map(async item => {
        let itemResponse = await Recipe.getRecipe(item.object_id, token);
        return await itemResponse.data;
      })
    );
    return {
      props: {
        data: productsData,
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
