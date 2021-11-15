import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CartItemRecipe } from '@/components/blocks/cart-page/cart-item-recipe';
import TabPanel from '@/components/elements/tab-panel-cuisines';
import { CartItemIngredients } from '@/components/blocks/cart-page/cart-item-ingredients';
import classes from './index.module.scss';

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

  console.log('tabcontent', products);

  return (
    <div className={styles.tab_content}>
      <TabPanel className={styles.tab_dishes} value={selectedTab} index={1}>
        {products?.length > 0 &&
          products.map(item => (
            <CartItemRecipe
              key={`${item.pk + '1k0'}`}
              author={item.user.full_name}
              title={item.title}
              image={item.images[0]?.url}
              id={item.pk}
            />
          ))}
      </TabPanel>
      <TabPanel className={classes.tab_ingredients} value={selectedTab} index={2}>
        {products?.length > 0 &&
          products.map(item => (
            <CartItemIngredients
              key={`${item.pk + '1k0'}`}
              ingredients={item.ingredients}
              title={item.title}
              image={item.images[0]?.url}
              id={item.pk}
            />
          ))}
      </TabPanel>
    </div>
  );
};
