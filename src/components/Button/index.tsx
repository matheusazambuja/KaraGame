import { ButtonHTMLAttributes } from 'react';
import { useTheme } from '../../hooks/useTheme';

import styles from './styles.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isSelected?: boolean
};

export function Button({ isSelected = false, ...props }: ButtonProps) {

  return (
    <button
      className={`${isSelected ? styles.isSelected : styles.buttonCustom}`}
      {...props}
    />
  )
}