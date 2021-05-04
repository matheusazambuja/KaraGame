import { ReactNode } from "react";
import {
  ChakraProvider
} from '@chakra-ui/react'

import theme from '../../styles/theme'

type ThemeContainerProps = {
  children: ReactNode
}

export default function ThemeContainer({ children }: ThemeContainerProps) {
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  )
}