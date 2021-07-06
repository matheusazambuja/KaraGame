import { useContext } from "react";
import { ThemeContext } from "../contexts/theme/ThemeContainer";


export function useTheme() {
  const value = useContext(ThemeContext);

  return value;
}