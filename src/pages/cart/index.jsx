import React, { useEffect, useState } from 'react';
import { LayoutPage } from '@/components/layouts';
import { TabContent } from '@/components/blocks/cart-page/tab-content';
import { CartTabs } from '@/components/blocks/cart-page/tabs';
import { Basket } from '@/components/blocks/cart-page/basket';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'cookies';
import Recipe from '@/api/Recipe';
import Cart from '@/api/Cart';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getCart, setCart } from '@/store/cart/actions';
import { useRouter, withRouter } from 'next/router';
import { withAuth } from '@/utils/authProvider';
import classes from './index.module.scss';
import { IngredientsModal } from '@/components/basic-blocks/ingredients-modal';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const useStyles = makeStyles(theme => ({
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
}));

export const CartContext = React.createContext({});

const CartPage = props => {
  const router = useRouter();
  const dispatch = useDispatch();
  const styles = useStyles();
  const data = useSelector(state => state.cart);
  const [ingredientsModalData, setIngredientsModalData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getCart());
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
    <div className={styles.tabs}>
      <div className={classes.header}>Your Cart</div>
      <div className={styles.content}>
        <CartContext.Provider value={{ setIngredientsModalData, openModalHandler }}>
          <TabContent products={data.products} />
        </CartContext.Provider>
        <Basket cart={data} withButton />
      </div>
      <IngredientsModal data={ingredientsModalData} {...modalProps} />
    </div>
  );

  return <LayoutPage content={content} />;
};

const connector = connect(state => ({
  account: state.account
}))(CartPage);

export default withRouter(withAuth(connector));

export async function getServerSideProps(context) {
  try {
    const cookies = new Cookies(context.req, context.res);
    const targetCookies = cookies.get('aucr');
    const token = !targetCookies ? undefined : decodeURIComponent(cookies.get('aucr'));
    const isAuthenticated = Boolean(token);
    return {
      props: {
        ...(await serverSideTranslations(context.locale, ['common'])),
        isAuthenticated,
        absolutePath: context.req.headers.host
      }
    };
  } catch (e) {
    console.error(e);

    return {
      props: {
        ...(await serverSideTranslations(context.locale, ['common'])),
        notFound: true
      }
    };
  }
}
