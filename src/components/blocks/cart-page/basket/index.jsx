import React from 'react';
import classes from './index.module.scss';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';

export const Basket = props => {
  const { products, total, deliveryPrice } = props.cart;
  const router = useRouter();

  const handleOrderClick = () => {
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
      {products?.length > 0 &&
        products.map((el, id) => (
          <TextElement key={id} text={el.object.title} count={el.count}>
            ${Number.parseFloat(el.count * el.object.price).toFixed(2)}
          </TextElement>
        ))}

      <TextElement text="Delivery">{Number.parseFloat(deliveryPrice).toFixed(2)}</TextElement>

      <div className={classes.basket__total}>
        <TextElement text="Total">${Number.parseFloat(total).toFixed(2) ?? 0}</TextElement>
      </div>

      {props.withButton && (
        <Button fullWidth className={classes.button} onClick={handleOrderClick}>
          Order
        </Button>
      )}
    </div>
  );
};
