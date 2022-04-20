import type { RootState } from '@/store/store';

import React, { useEffect, useState } from 'react';
import { TabContent } from '@/components/blocks/cart-page/tab-content';
import { Basket } from '@/components/blocks/cart-page/basket';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '@/store/cart/actions';
import { useRouter } from 'next/router';
import s from './CartPage.module.scss';
import { IngredientsModal } from '@/components/basic-blocks/ingredients-modal';
import { useTranslation } from 'next-i18next';
import LayoutPageNew from '@/components/layouts/layout-page-new';

const useStyles = makeStyles((theme?: Theme) =>
  createStyles({
    tabs: {
      width: '100%'
    },
    content: {
      display: 'grid',
      marginBottom: '2rem;'
    },
    [theme.breakpoints.up('md')]: {
      content: {
        gridTemplateColumns: 'auto 400px',
        columnGap: '56px'
      }
    },
    [theme.breakpoints.only('sm')]: {
      content: {
        gridTemplateColumns: '1fr 1fr',
        columnGap: '56px'
      }
    },
    [theme.breakpoints.only('xs')]: {
      content: {
        gridTemplateColumns: '1fr'
      }
    }
  })
);

export const CartPage: React.FC<any> = props => {
  const { t } = useTranslation('cartPage');
  const router = useRouter();
  const dispatch = useDispatch();
  const styles = useStyles();
  const data = useSelector((state: RootState) => state.cart);
  const [ingredientsModalData, setIngredientsModalData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getCart(router.locale));
  }, []);

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  const modalProps = {
    setIngredientsModalData,
    isModalOpen,
    openModalHandler,
    closeModalHandler
  };

  let content = (
    <div className={`${styles.tabs} ${s.container}`}>
      <div className={s.header}>{t('title')}</div>
      <div className={styles.content}>
        <CartContext.Provider value={{ setIngredientsModalData, openModalHandler }}>
          <TabContent products={data.products} />
        </CartContext.Provider>
        <Basket cart={data} withButton />
      </div>
      <IngredientsModal data={ingredientsModalData} {...modalProps} />
    </div>
  );

  return <LayoutPageNew content={content} />;
};

export const CartContext = React.createContext({});
