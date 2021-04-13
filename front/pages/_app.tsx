import 'antd/dist/antd.css';
import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';

import wrapper from '../store/configureStore';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>community</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(App);
