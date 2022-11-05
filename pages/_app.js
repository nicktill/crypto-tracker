import Home from ".";
import "../globals.css";

function MyApp({ Component, pageProps }) {
  // This is where all the pages in the project are rendered
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
