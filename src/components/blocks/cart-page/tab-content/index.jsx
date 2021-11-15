import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CartItemRecipe } from '@/components/blocks/cart-page/cart-item-recipe';
import TabPanel from '@/components/elements/tab-panel-cuisines';
import Recipe from '@/api/Recipe';
import { useFetch } from '@/customHooks/useFetch';
import { CardItemIngredients } from '@/components/blocks/cart-page/cart-item-ingredients';
import { List, ListItem } from '@material-ui/core';
import classes from './index.module.scss';
import Cart from '@/api/Cart';

const useStyles = makeStyles(theme => ({
  tab_content: {
    flex: 1
  },
  tab_dishes: {
    display: 'flex',
    flexDirection: 'column'
  },
  tab_ingredients: {
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'scroll'
  },
  [theme.breakpoints.up('lg')]: {
    tab_content: {
      maxWidth: 759
    },
    tab_dishes: {
      gap: 20
    }
  },
  [theme.breakpoints.only('md')]: {
    tab_content: {
      maxWidth: 666
    },
    tab_dishes: {
      gap: 17
    }
  },
  [theme.breakpoints.only('sm')]: {
    tab_content: {
      maxWidth: 504
    },
    tab_dishes: {
      gap: 13
    }
  },
  [theme.breakpoints.only('xs')]: {
    tab_content: {
      maxWidth: '100%'
    }
  }
}));

export const TabContent = props => {
  const { selectedTab, products } = props;
  const styles = useStyles();

  // const { data, isLoading } = useFetch({
  //   request: Cart.getProductList,
  //   query: {
  //     page: 1,
  //     page_size: 50
  //   }
  // });

  return (
    <div className={styles.tab_content}>
      <TabPanel className={styles.tab_dishes} value={selectedTab} index={1}>
        {console.log(products)}
        {products?.length > 0 && products.map(item => <CartItemRecipe key={`${item.pk + '1k0'}`} id={item.pk} />)}
      </TabPanel>
      <TabPanel className={classes.tab_ingredients} value={selectedTab} index={2}>
        <List className={classes.tab_ingredients__list}>
          {products?.length > 0 &&
            products.map(item => (
              <ListItem key={`${item.pk + '1k0'}`} style={{ margin: 0, padding: 0 }}>
                <CardItemIngredients id={item.pk} />
              </ListItem>
            ))}
        </List>
      </TabPanel>
    </div>
  );
};
