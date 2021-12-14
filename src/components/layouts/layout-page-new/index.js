import React from 'react';
import classes from './index.module.scss';
import Head from 'next/head';
import CookiesBanner from '@/components/banners/cookies-banner';
import Header from '@/components/basic-blocks/header';
import { Footer } from '@/components/basic-blocks/footer';

const LayoutPageNew = ({ content }) => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="//cameratag.com/static/14/cameratag.css"></link>
        <script src="//cameratag.com/api/v14/js/cameratag.min.js"></script>
      </Head>

      <section className={classes.layout}>
        <header>
          <Header />
        </header>

        <main className={classes.layout__content}>{content}</main>

        <footer>
          <Footer />
        </footer>
      </section>
      <CookiesBanner />
    </>
  );
};

export default LayoutPageNew;
