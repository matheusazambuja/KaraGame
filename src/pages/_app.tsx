import ThemeContainer from "../contexts/theme/ThemeContainer"

import { library } from '@fortawesome/fontawesome-svg-core'
import { Box } from "@chakra-ui/layout"
import Header from "../components/Header"
import { faCheckCircle, faCircle, faHome, faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import { ItemsGameProvider } from "../contexts/ItemsGameContext"

function MyApp({ Component, pageProps }) {
  library.add(faHome, faSun, faMoon, faCheckCircle, faCircle)

  return (
    <ThemeContainer>
      <Box>
        <Header />
        <ItemsGameProvider>
          <Component {...pageProps} />
        </ItemsGameProvider>
      </Box>
    </ThemeContainer>
  )
}

export default MyApp
