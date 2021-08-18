import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '../../hooks/useTheme';

import styles from './styles.module.scss';

export default function Header() {
  const {
    theme, toggleTheme
  } = useTheme();

  return (
    <header className={styles.header}>
      <div>
        <Link href='/'>
          <a className={styles.iconHome}>
            <Image src={'/home.svg'} alt={'Ícone página inicial'}
              width={32} height={32}
            />
          </a>
        </Link>
        <nav>
          <ul>
            {NAV_ITEMS.map(item => (
              <li>
                <Link href={item.href}>
                  <a>
                    {item.label}
                    <ul>
                      {item.children.map(subItem => (
                        <li>
                          <Link href={subItem.href}>
                            <a>
                              <h4>{subItem.label}</h4>
                              <p>{subItem.subLabel}</p>
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
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
    label: 'Alfabetos',
    href: '/#',
    children: [{
      label: 'Hiragana',
      subLabel: "Hiragana's families",
      href: '/alphabet/hiragana',
    }, {
      label: 'Katakana',
      subLabel: "Katakana's families",
      href: '/alphabet/katakana',
    }]
  }, {
    label: 'Partículas',
    href: '/particulas',
    children: []
  }, {
    label: 'Kanjis',
    href: '/kanjis',
    children: []
  }
]