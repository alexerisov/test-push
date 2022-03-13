import React from 'react';
import classes from './index.module.scss';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

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

export const Basket = props => {
  const { t } = useTranslation('orderSummary');
  const { products, total, deliveryPrice } = props.cart;
  const router = useRouter();

  const handleOrderClick = () => {
    router.push('/order-confirm', undefined, { locale: router.locale });
  };

  return (
    <div className={classes.basket}>
      <div className={classes.basket__title}>{t('title')}</div>
      <hr className={classes.divider} />
      <div className={classes.basket__items_amount}>{t('subtitle')}</div>
      {products?.length > 0 &&
        products.map((el, id) => (
          <TextElement key={id} text={el.object.title} count={el.count}>
            ${Number.parseFloat(el.count * el.object.price).toFixed(2)}
          </TextElement>
        ))}

      <TextElement text={t('delivery')}>${Number.parseFloat(deliveryPrice).toFixed(2)}</TextElement>

      <div className={classes.basket__total}>
        <TextElement text={t('total')}>${Number.parseFloat(total).toFixed(2) ?? 0}</TextElement>
      </div>

      {props.withButton && (
        <Button fullWidth className={classes.button} onClick={handleOrderClick}>
          {t('buttonText')}
        </Button>
      )}
    </div>
  );
};
