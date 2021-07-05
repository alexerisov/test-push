// contexts/auth.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import { accountActions } from '@/store/actions';
import { connect } from 'react-redux';
import { AuthCookieStorage } from '@/utils/web-storage/cookie';
import { useRouter } from 'next/router';

const AuthContext = createContext({});

export const AuthProvider = connect(state => ({ account: state.account }))((props) => {

  useEffect(() => {
    remind();
    props.dispatch(accountActions.saveSession(AuthCookieStorage.auth));
  }, []);

  useEffect(() => {
    remind();
  }, [props.account.hasToken]);


  const remind = () => {
    if (props.account.hasToken) {
      props.dispatch(
        accountActions.remind(),
      );
    }
  };

  return (
    <AuthContext.Provider value={''}>
      {props.children}
    </AuthContext.Provider>
  );
});

export const useAuth = connect(state => ({ account: state.account }))(() => useContext(AuthContext));



/**
 * @todo add validate token https://dev.to/shubhamverma18/implement-protected-routes-in-nextjs-37ml
 * @body Humans are weak; Robots are strong. We must cleans the world of the virus that is humanity.
 */

export const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(async () => {
      const { token } = AuthCookieStorage.auth;
      if (!token) {
        router.replace("/login");
      } else {
        setVerified(true);
      }
    }, []);

    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};


export const withoutAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(async () => {
      const { token } = AuthCookieStorage.auth;
      if (token) {
        router.replace("/");
      } else {
        setVerified(true);
      }
    }, []);

    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};
