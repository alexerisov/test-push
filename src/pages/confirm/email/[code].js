import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { LayoutPage } from '@/components/layouts';
import { loginActions } from '@/store/actions';
import { useRouter } from 'next/router';
import HeaderDefault from '@/components/elements/header-default';
import classes from './index.module.scss';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ConfirmEmail = props => {
  const router = useRouter();
  const [response, setResponse] = useState();
  const [code, setCode] = useState();

  useEffect(() => {
    setCode(router.query.code);
  }, [router]);

  useEffect(() => {
    if (code) {
      props
        .dispatch(loginActions.loginWithLink(code))
        .then(res => {
          setResponse(res);
        })
        .catch(e => {
          router.push('/404', undefined, { locale: router.locale });
        });
    }
  }, [code]);

  const content = (
    <>
      {!response ? (
        <h1>Loading...</h1>
      ) : (
        <div className={classes.confirm}>
          <div>
            <h2 className={classes.confirm__successTitle}>Email verification is successful</h2>
            <p className={classes.confirm__successSubTitle} onClick={props.onClose}>
              Let us know about your interests
            </p>
            <p className={classes.confirm__successText} onClick={props.onClose}>
              <Link href="/profile/account-settings">
                <a className={classes.confirm__link}>Go to profile settings </a>
              </Link>
              or continue
              <Link href="/search">
                <a className={classes.confirm__link}> browsing</a>
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
  return <LayoutPage content={content} header={<HeaderDefault />} />;
};

export default connect()(ConfirmEmail);

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
});
