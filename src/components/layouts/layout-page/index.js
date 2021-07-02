import React from 'react';
import classes from "./index.module.scss";
import LayoutFooter from '@/components/layouts/layout-footer';
import HeaderDefault from '@/components/elements/header-default';

const LayoutPage = ({ header, content }) => {

    const defaultHeader = <HeaderDefault />;

    return (
        <section className={classes.layout}>
        <header>
          {header ?? defaultHeader}
        </header>
        <main className={classes.layout__content}>
          {content}
        </main>
        <footer>
          <LayoutFooter />
        </footer>
      </section>
    );
};

export default LayoutPage;