import { ThemeContextProvider } from '../contexts/ThemeContext';
import { ItemsGameProvider } from '../contexts/ItemsGameContext';
import Header from '../components/Header';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheckCircle, faCircle, faHome, faMoon, faSun,
  faInfo, faBars, faTimes, faChevronRight
} from '@fortawesome/free-solid-svg-icons';

import '../styles/global.scss';

function MyApp({ Component, pageProps }) {
  library.add(faHome, faSun, faMoon, faCheckCircle,
    faCircle, faInfo, faBars, faTimes, faChevronRight
  );

  return (
    <ThemeContextProvider>
      <>
        <Header />
        <ItemsGameProvider>
          <Component {...pageProps} />
        </ItemsGameProvider>
      </>
    </ThemeContextProvider>
  );
}

export default MyApp;
