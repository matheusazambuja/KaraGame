import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useTheme } from '../../hooks/useTheme';

import styles from './styles.module.scss';

export default function Header() {
  const {
    theme, toggleTheme
  } = useTheme();

  return (
    <header className={`${styles.header}
      ${theme === 'light' ? styles.headerLight : styles.headerDark}
    `}>
      <div>
        <Link href='/'>
          <a>
            <FontAwesomeIcon icon='home' />
          </a>
        </Link>
        <div>
          NAV
        </div>
      </div>
      <button onClick={toggleTheme}>
        {theme === 'light' ?
          <FontAwesomeIcon icon='moon' /> :
          <FontAwesomeIcon icon='sun' />
        }
      </button>
    </header>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: NavItem[];
  href?: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Famílias',
    href: '#',
    children: [{
      label: 'Hiragana',
      subLabel: "Hiragana's families",
      href: '/alphabet/hiragana',
    }, {
      label: 'Katakana',
      subLabel: "Hiragana's families",
      href: '/alphabet/katakana',
    }]
  }
]