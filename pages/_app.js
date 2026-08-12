import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <a
        href="#main-content"
        style={{
          position: 'absolute',
          left: '-9999px',
        }}
      >
        Skip to main content
      </a>

      <Navbar />

      <Component {...pageProps} />

      <Footer />
    </>
  );
}

export default MyApp;
