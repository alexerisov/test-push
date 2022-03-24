import React, { useEffect, useState } from 'react';
import { loginActions } from '@/store/actions';
import { useRouter } from 'next/router';
import s from './EmailConfirmPage.module.scss';
import Link from 'next/link';
import LayoutPageNew from '@/components/layouts/layout-page-new';

export const EmailConfirmPage = props => {
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
        <div className={s.confirm}>
          <div>
            <h2 className={s.confirm__successTitle}>Email verification is successful</h2>
            <p className={s.confirm__successSubTitle} onClick={props.onClose}>
              Let us know about your interests
            </p>
            <p className={s.confirm__successText} onClick={props.onClose}>
              <Link href="/profile/account-settings">
                <a className={s.confirm__link}>Go to profile settings </a>
              </Link>
              or continue
              <Link href="/search">
                <a className={s.confirm__link}> browsing</a>
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
  return <LayoutPageNew content={content} />;
};
