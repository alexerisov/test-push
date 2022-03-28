import React, { ReactComponentElement, useEffect, useRef, useState } from 'react';
import classes from './index.module.scss';
import Head from 'next/head';
import CookiesBanner from '@/components/banners/cookies-banner';
import Header from '@/components/basic-blocks/header';
import { Footer } from '@/components/basic-blocks/footer';

interface LayoutPageNewProps {
  content: ReactComponentElement<any>;
}

const LayoutPageNew: React.FC<LayoutPageNewProps> = ({ content }) => {
  const headerRef = useRef();
  const contentRef = useRef();
  const [headerShadow, setHeaderShadow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const isContentScrolled =
        contentRef.current?.getBoundingClientRect().y + 0.5 < headerRef.current?.firstChild.clientHeight;
      setHeaderShadow(isContentScrolled);
    };

    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="//cameratag.com/static/14/cameratag.css"></link>
        <script src="//cameratag.com/api/v14/js/cameratag.min.js"></script>
      </Head>

      <section className={classes.layout}>
        <header ref={headerRef}>
          <Header shadow={headerShadow} />
        </header>

        <main ref={contentRef} className={classes.layout__content}>
          {content}
        </main>

        <footer>
          <Footer />
        </footer>
      </section>
      <CookiesBanner />
    </>
  );
};

export default LayoutPageNew;
