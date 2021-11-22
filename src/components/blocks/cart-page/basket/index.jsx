import React from 'react';
import classes from './index.module.scss';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';

export const Basket = props => {
  const { products, total, withButton } = props;
  const router = useRouter();
  console.log(products);

  const handleOrderClick = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('products', JSON.stringify(products));
      localStorage.setItem('total', total);
    }
    router.push('/order-confirm');
  };

  const TextElement = props => {
    const { text, count, children } = props;
    return (
      <div className={classes.basket__summary_wrapper}>
        <span className={classes.basket__summary_text}>{text}</span>
        <span className={classes.basket__summary_number}>
          {count && <span className={classes.basket__summary_count}>(x{count})</span>}
          {children}
        </span>
      </div>
    );
  };

  return (
    <div className={classes.basket}>
      <div className={classes.basket__title}>Order Summary</div>
      <hr className={classes.divider} />
      <div className={classes.basket__items_amount}>Meals</div>
      {products?.length &&
        products.map((el, id) => (
          <TextElement key={id} text={el.object.title} count={el.count}>
            ${el.count * el.object.price}
          </TextElement>
        ))}

      <TextElement text="Delivery">delivery</TextElement>

      <div className={classes.basket__total}>
        <TextElement text="Total">${total ?? 0}</TextElement>
      </div>

      {withButton && (
        <Button fullWidth className={classes.button} onClick={handleOrderClick}>
          Order
        </Button>
      )}
    </div>
  );
};
