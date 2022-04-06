import React from 'react';
import { Provider } from 'react-redux';
import { useStore } from '@/store/store';
import { DefaultSeo } from 'next-seo';
import { SessionProvider } from 'next-auth/react';
//utils
import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from 'next-i18next.config.js';
import SEO from '@/next-seo.config';
//styles
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '@/utils/themeProvider';
import '~styles/globalStyle.scss';
import Modals from '@/components/modals';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';
import type { AppProps } from 'next/app';
import { CssBaseline } from '@material-ui/core';
import yupSetup from '@/utils/yup';
import { loggerSetup } from '@/utils/logger';

yupSetup();
loggerSetup();

function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session} refetchInterval={300} refetchOnWindowFocus={true}>
        <CssBaseline />
        <MuiPickersUtilsProvider utils={DayjsUtils}>
          <ThemeProvider theme={theme}>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
            <Modals />
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </SessionProvider>
    </Provider>
  );
}

export default appWithTranslation(App, nextI18NextConfig);
