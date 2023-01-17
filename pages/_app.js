import 'bootstrap/dist/css/bootstrap.css';
import '../css/styles.css';

import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" />
        <Script src="https://platform.twitter.com/widgets.js" charset="utf-8" />
    </>
  )
}

export default MyApp;
