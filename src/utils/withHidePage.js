import React from 'react';
import Custom404 from '@/pages/404';

export const withRedirectTo404ForHidePage = (WrappedComponent, isRedirectTo404) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    return !isRedirectTo404 ? <WrappedComponent {...props} /> : <Custom404 />;
  };
};
