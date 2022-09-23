import "../styles/globals.css";
import Head from "next/head";
import { AuthProvider } from "../provider/AuthProvider";

import dynamic from "next/dynamic";
const ProgressBar = dynamic(() => import("../components/ProgressBar"), {
  ssr: false,
});
function MyApp({ Component, pageProps: { ...pageProps } }) {
  return (
    <AuthProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Pathram-Admin</title>
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <ProgressBar />

      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
