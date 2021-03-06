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
      {!products?.length && <Typography variant="h4">You have no items in your shopping cart. </Typography>}
      <TabPanel className={styles.tab_dishes} value={selectedTab} index={1}>
        {products?.length &&
          products.map(item => (
            <CartItemRecipe
              key={`${item.object.pk + '1k0'}`}
              author={item.object.user.full_name}
              title={item.object.title}
              image={item.object.images[0]?.url}
              recipeId={item.object.pk}
              cartItemId={item.pk}
              cartItemAmount={item.count}
              price={item.object.price}
            />
          ))}
      </TabPanel>
      <TabPanel className={classes.tab_ingredients} value={selectedTab} index={2}>
        {products?.length &&
          products.map(item => (
            <CartItemIngredients
              key={`${item.object.pk + '1k0'}`}
              ingredients={item.object.ingredients}
              title={item.object.title}
              image={item.object.images[0]?.url}
              recipeId={item.object.pk}
              cartItemId={item.pk}
              price={item.object.price}
            />
          ))}
      </TabPanel>
    </div>
  );
};
