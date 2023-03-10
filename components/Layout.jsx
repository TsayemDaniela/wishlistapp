import AppNavBar from './AppNavBar';
import Head from 'next/head';
import Script from 'next/script';

const siteTitle = "Danie's Birthday wishlist.";
function Layout({ children, user, displayNav = true, displayFooter = true }) {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Daniela's Birthday Wishlist"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="absolute overflow-auto bg-pattern from-purple-600 to-pink-500 inset-0 px-8 " id="background">
        {displayNav && <AppNavBar user={user} />}
        {children}
        {displayFooter && ( 
          <footer className="flex items-center justify-center align-bottom pb-6 text-gray-300">
            Copyright &copy; Gifko Graphix
            {' '}
            {new Date().getFullYear()}
          </footer>
        )}
      </div>
      <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" />
    </>
  );
}

export default Layout;
