import React from 'react';
import classes from './index.module.scss';
import LayoutFooter from '@/components/layouts/layout-footer';
import HeaderDefault from '@/components/elements/header-default';
import Head from 'next/head';
import CookiesBanner from '@/components/banners/cookies-banner';

const LayoutPage = ({ header, content }) => {
  const defaultHeader = <HeaderDefault />;

  return (
    <>
      <Head>
        <link rel="stylesheet" href="//cameratag.com/static/14/cameratag.css"></link>
        <script src="//cameratag.com/api/v14/js/cameratag.min.js"></script>
      </Head>
      <section className={classes.layout}>
        <header>{header ?? defaultHeader}</header>
        <main className={classes.layout__content}>{content}</main>
        <footer>
          <LayoutFooter />
        </footer>
      </section>
      <CookiesBanner />
    </>
  );
};

export default LayoutPage;
