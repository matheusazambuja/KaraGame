import { ButtonHTMLAttributes } from 'react';
import { useTheme } from '../../hooks/useTheme';

import styles from './styles.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
  isSelected?: boolean
};

export function Button({ isOutlined = false, isSelected = false, ...props }: ButtonProps) {
  const {
    theme
  } = useTheme();

  return (
    <button
      className={`${isOutlined ? styles.isOutlined : styles.buttonCustom} ${isSelected ? styles.isSelected : styles.buttonCustom} 
        ${theme === 'light' ? styles.buttonLight : styles.buttonDark}
      `}
      {...props}
    />
  )
}