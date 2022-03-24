import React from 'react';
import Link from 'next/link';
import s from './Page404.module.scss';
import LayoutPageNew from '@/components/layouts/layout-page-new';

const Page404 = () => {
  const content = (
    <div className={s.notFound}>
      <h2>404</h2>
      <h1 className={s.notFound__subtitle}>Page not found</h1>
      <Link href="/">
        <a>Home</a>
      </Link>
    </div>
  );

  return <LayoutPageNew content={content} />;
};

export default Page404;
