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
    display: 'flex'
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
  const [data, setData] = useState([]);

  useEffect(async () => {
    const response = await Recipe.getRecipe(1);
    // const cartList = response.data.results;
    // const productsData = cartList.map(async item => {
    //   const itemResponse = await Recipe.getRecipe(1);
    //   return itemResponse.data;
    // });
    console.log(response);
    // setData(productsData);
  });

  const onTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  console.log(props.productsData);
  const tabsProps = {
    selectedTab,
    onTabChange
  };

  const content = (
    <div className={styles.tabs}>
      <CartTabs {...tabsProps} />
      <div className={styles.content}>
        <TabContent products={props?.productsData} selectedTab={selectedTab} />
        <Basket />
      </div>
    </div>
  );

  return <LayoutPage content={content} />;
};

export default CartPage;
