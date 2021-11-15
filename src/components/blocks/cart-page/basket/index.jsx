import React from 'react';
import { ConfirmButton } from '@/components/blocks/cart-page/confirm-button';
import { PromoCodeInput } from '@/components/blocks/cart-page/promo-code-input';
import classes from './index.module.scss';

export const Basket = props => {
  const { count, price, discount, total } = props;

  const TextElement = props => {
    const { text, children } = props;
    return (
      <div className={classes.basket__summary_wrapper}>
        <span className={classes.basket__summary_text}>{text}</span>
        <span className={classes.basket__summary_number}>{children}</span>
      </div>
    );
  };

  return (
    <div className={classes.basket}>
      <div className={classes.basket__title}>In Basket </div>
      <div className={classes.basket__items_amount}>{count} dishes</div>
      <PromoCodeInput />

      <TextElement text="Price:">
        <span className={classes.basket__dollar_symbol}>$</span>
        {price}
      </TextElement>

      <TextElement text="Discount:">
        <span className={classes.basket__summary_number}>{discount}%</span>
      </TextElement>

      <TextElement text="Total:">
        <span className={classes.basket__dollar_symbol}>$</span>
        {total}
      </TextElement>

      <ConfirmButton />
    </div>
  );
};
