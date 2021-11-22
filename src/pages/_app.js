import React from 'react';
import { Provider } from 'react-redux';
import { useStore } from '@/store/store';
import { DefaultSeo } from 'next-seo';
//utils
import SEO from '@/next-seo.config';
import { AuthProvider } from '@/utils/authProvider';
import http from '@/utils/http';
//styles
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '@/utils/themeProvider';
import '~styles/globalStyle.scss';
import Modals from '@/components/modals';
import { StylesProvider } from '@material-ui/core';

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  http.init(store);

  return (
    <StylesProvider injectFirst>
      <Provider store={store}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
            <Modals />
          </ThemeProvider>
        </AuthProvider>
      </Provider>
    </StylesProvider>
  );
}
