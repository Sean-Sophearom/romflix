import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AppProvider } from "../lib/cartContext";
import { TokenProvider } from "../lib/tokenContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const child = Component.noLayout ? (
    <Component {...pageProps} />
  ) : (
    <>
      <Navbar />
      <main className="box main">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
  return (
    <>
      <Head>
        <title>ROMFLIX</title>
      </Head>
      <AppProvider>
        <TokenProvider>{child}</TokenProvider>
      </AppProvider>
    </>
  );
}

export default MyApp;
