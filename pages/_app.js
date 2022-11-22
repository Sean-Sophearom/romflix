import Navbar from "../components/Navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <main className="box">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
