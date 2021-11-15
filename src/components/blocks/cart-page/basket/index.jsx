import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import { ConfirmButton } from '@/components/blocks/cart-page/confirm-button';
import { PromoCodeInput } from '@/components/blocks/cart-page/promo-code-input';
import Typography from '@material-ui/core/Typography';
import classes from './index.module.scss';

export const Basket = () => {
  const useStyles = makeStyles(theme => ({
    basket: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      background: '#FEF8ED',
      fontSize: theme.typography.fontSize
    },
    title: {
      fontSize: 22,
      lineHeight: '27px',
      fontWeight: 500,
      color: '#1C1C1C'
    },
    dishes: {
      fontSize: '14px',
      lineHeight: '17px',
      fontWeight: 'normal',
      color: '#282828',
      marginTop: 5
    },

    [theme.breakpoints.up('lg')]: {
      basket: {
        maxWidth: 228,
        height: 368,
        marginLeft: 37,
        padding: '23px 32px'
      },
      button: {
        marginTop: 20
      },
      title: {
        fontSize: 22,
        lineHeight: '27px'
      },
      text: {
        fontSize: 22,
        lineHeight: '27px',
        marginBottom: 3
      }
    },
    [theme.breakpoints.only('md')]: {
      basket: {
        maxWidth: 200,
        height: 323,
        marginLeft: 33,
        padding: '20px 30px'
      },
      button: {
        marginTop: 15
      },
      title: {
        fontSize: 20,
        lineHeight: '24px'
      },
      text: {
        fontSize: 14,
        lineHeight: '77px',
        marginBottom: 3
      }
    },
    [theme.breakpoints.only('sm')]: {
      basket: {
        maxWidth: 151,
        height: 244,
        marginLeft: 15,
        padding: '15px 22px'
      },
      button: {
        marginTop: 12
      },
      title: {
        fontSize: 15,
        lineHeight: '18px'
      },
      text: {
        fontSize: 11,
        lineHeight: '13px',
        marginBottom: 3
      }
    },
    [theme.breakpoints.only('xs')]: {
      basket: {
        maxWidth: '100%',
        padding: '15px 54px'
      },
      button: {
        marginTop: 18
      },
      title: {
        fontSize: 22,
        lineHeight: '27px',
        textAlign: 'center'
      },
      text: {
        fontSize: 22,
        lineHeight: '27px',
        marginBottom: 3,
        textAlign: 'center'
      },
      dishes: {
        textAlign: 'center'
      }
    }
  }));
  const styles = useStyles();

  const price = 200;
  const discount = 10;
  const total = price * (1 - discount / 100);

  return (
    <div className={styles.basket}>
      <div className={classes.basket__title}>In Basket </div>
      <div className={classes.basket__items_amount}>3 dishes</div>
      <PromoCodeInput />
      <div className={classes.basket__summary_wrapper}>
        <span className={classes.basket__summary_text}>Price:</span>
        <span className={classes.basket__summary_number}>
          <span className={classes.basket__dollar_symbol}>$</span>
          {price}
        </span>
      </div>
      <div className={classes.basket__summary_wrapper}>
        <span className={classes.basket__summary_text}>Discount:</span>
        <span className={classes.basket__summary_number}>{discount}%</span>
      </div>
      <div className={classes.basket__summary_wrapper}>
        <span className={classes.basket__summary_text}>Total:</span>
        <span className={classes.basket__summary_number}>
          <span className={classes.basket__dollar_symbol}>$</span>
          {total}
        </span>
      </div>
      <ConfirmButton />
    </div>
  );
};
