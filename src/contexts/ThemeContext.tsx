import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

type Theme = 'light' | 'dark';

type ThemeContextProps = {
  children: ReactNode;
};

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider({ children }: ThemeContextProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>('light');

  useEffect(() => {
    const cookiesTheme = Cookies.getJSON('theme');

    setCurrentTheme(cookiesTheme);
  }, []);

  useEffect(() => {
    Cookies.set('theme', currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme(oldState => oldState === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}