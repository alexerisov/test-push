import React from 'react';
import { Provider } from 'react-redux';
import { useStore } from '@/store/store';
import { DefaultSeo } from 'next-seo';
import { SessionProvider } from 'next-auth/react';
//utils
import { appWithTranslation } from 'next-i18next';
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
yupSetup();

function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <SessionProvider session={pageProps.session} refetchOnWindowFocus={true} refetchInterval={5 * 60}>
      <Provider store={store}>
        <CssBaseline />
        <MuiPickersUtilsProvider utils={DayjsUtils}>
          <ThemeProvider theme={theme}>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
            <Modals />
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </Provider>
    </SessionProvider>
  );
}

export default appWithTranslation(App);
