import { theme, extendTheme } from '@chakra-ui/react'

export const customTheme = extendTheme({
  config: {
    // initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box'
      },

      body: {
        background: 'gray.50'
      },

      'body, input, textarea, button': {
        font: '500 1rem Inter, sans-serif',
      },

      button: {
        cursor: 'pointer'
      },

      'h1, h2, h3, h4, h5, h6': {
        fontWeight: 600,
        fontFamily: 'Lexend, sans-serif',
        color: 'gray.800'
      },

      h1: {
        fontSize: '2rem'
      },

      h2: {
        fontSize: '1.5rem'
      },

      img: {
        borderRadius: '10%'
      }
    }
  },
  breakpoints: {
    ...theme.breakpoints,
    md: '830px',
    lg: '1080px',
    xl2: '1280px',
    vhBig: '99.9vh'
  },

  fontWeights: {
    ...theme.fontWeights,
  },

  radii: {
    ...theme.radii
  },

  fontSizes: {
    ...theme.fontSizes
  },

  colors: {
    ...theme.colors,
    gray: {
      ...theme.colors.gray,
      50: '#F7F8FA',
      100: '#EBEBEB',
      200: '#AFB2B1',
      500: '#494D4B',
      600: '#373C3F',
      700: '#2F3437',
      800: '#24283B',
      840: '#202124',
      850: '#1F2335',
      900: '#121214'
    },
  
    green: {
      ...theme.colors.green,
      100: '#68D391',
      500: '#04D361'
    },
  
    purple: {
      ...theme.colors.purple,
      300: '#9F75FF',
      400: '#9164FA', 
      500: '#8257E5',
      800: '#6F48C9',
    }
  }
})

export default customTheme