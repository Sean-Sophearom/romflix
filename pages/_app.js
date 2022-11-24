import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AppProvider } from "../lib/context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>ROMFLIX</title>
      </Head>
      <AppProvider>
        <Navbar />
        <main className="box main">
          <Component {...pageProps} />
        </main>
        <Footer />
      </AppProvider>
    </>
  );
}

export default MyApp;
