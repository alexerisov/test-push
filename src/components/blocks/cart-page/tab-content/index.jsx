import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CartItemRecipe } from '@/components/blocks/cart-page/cart-item-recipe';
import TabPanel from '@/components/elements/tab-panel-cuisines';
import { CartItemIngredients } from '@/components/blocks/cart-page/cart-item-ingredients';
import classes from './index.module.scss';
import Typography from '@material-ui/core/Typography';

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
    tab_dishes: {
      gap: 20
    }
  },
  [theme.breakpoints.only('md')]: {
    tab_dishes: {
      gap: 17
    }
  },
  [theme.breakpoints.only('sm')]: {
    tab_dishes: {
      gap: 13
    }
  }
}));

export const TabContent = props => {
  const { selectedTab, products } = props;
  const styles = useStyles();

  return (
    <div className={styles.tab_content}>
      {!products?.length > 0 && <Typography variant="h4">You have no items in your shopping cart. </Typography>}
      <TabPanel className={styles.tab_dishes} value={selectedTab} index={1}>
        {products?.length > 0 &&
          products.map(item => (
            <CartItemRecipe
              key={`${item.object.pk + '1k0'}`}
              cartItemId={item.pk}
              cartItemAmount={item.count}
              recipe={item.object}
            />
          ))}
      </TabPanel>
    </div>
  );
};
