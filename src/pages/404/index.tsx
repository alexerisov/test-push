import React from 'react';
import Link from 'next/link';
import classes from './index.module.scss';
import LayoutPageNew from '@/components/layouts/layout-page-new';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Custom404 = () => {
  const content = (
    <div className={classes.notFound}>
      <h2>404</h2>
      <h1 className={classes.notFound__subtitle}>Page not found</h1>
      <Link href="/">
        <a>Home</a>
      </Link>
    </div>
  );

  return <LayoutPageNew content={content} />;
};

export default Custom404;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
      // Will be passed to the page component as props
    }
  };
}
