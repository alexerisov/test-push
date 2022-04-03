import { ReactElement } from 'react';
import { NextPageContext } from 'next';
import NextErrorComponent, { ErrorProps as NextErrorProps } from 'next/error';

type ErrorPageProps = {
  err: Error;
  statusCode: number;
  hasGetInitialPropsRun: boolean;
  children?: ReactElement;
};

type ErrorProps = {
  hasGetInitialPropsRun: boolean;
} & NextErrorProps;

function ErrorPage({ statusCode, hasGetInitialPropsRun, err }: ErrorPageProps) {
  if (!hasGetInitialPropsRun && err) {
  }

  return <NextErrorComponent statusCode={statusCode} />;
}

ErrorPage.getInitialProps = async ({ res, err, asPath }: NextPageContext) => {
  const errorInitialProps = (await NextErrorComponent.getInitialProps({
    res,
    err
  } as NextPageContext)) as ErrorProps;

  errorInitialProps.hasGetInitialPropsRun = true;

  if (err) {
    return errorInitialProps;
  }

  return errorInitialProps;
};

export default ErrorPage;
