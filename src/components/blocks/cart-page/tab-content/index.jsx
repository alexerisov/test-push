import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CartItemRecipe } from '@/components/blocks/cart-page/cart-item-recipe';
import classes from './index.module.scss';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import { BasicIcon } from '@/components/basic-elements/basic-icon';
import CloseIcon from '~public/icons/Close/Line.svg';
import { useDispatch } from 'react-redux';
import { clearCart } from '@/store/cart/actions';
import { useTranslation } from 'next-i18next';

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
  const { t } = useTranslation('cartPage');
  const { products } = props;
  const dispatch = useDispatch();
  const styles = useStyles();

  const handleClearAll = () => {
    dispatch(clearCart());
  };

  return (
    <div className={styles.tab_content}>
      {!products?.length > 0 && <Typography variant="h4">{t('emptyCartText')}</Typography>}
      <div className={styles.tab_dishes}>
        {products?.length > 0 &&
          products.map(item => (
            <CartItemRecipe
              key={`${item.object.pk + '1k0'}`}
              cartItemId={item.pk}
              cartItemAmount={item.count}
              recipe={item.object}
            />
          ))}
      </div>
      {products?.length > 0 && (
        <div className={classes.clear_button_wrapper}>
          <IconButton
            classes={{ root: classes.clear_button_root, label: classes.clear_button_label }}
            onClick={handleClearAll}>
            <BasicIcon icon={CloseIcon} size="16px" color="#566481" />
            Clear all
          </IconButton>
        </div>
      )}
    </div>
  );
};
