import { Box, Divider, Heading, Link as LinkChakra, Text } from "@chakra-ui/layout"
import { Button, color, useColorModeValue } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Cookies from "js-cookie"
import { GetServerSideProps } from "next"
import Link from "next/link"
import { useRouter } from 'next/router'
import { useContext, useEffect } from "react"
import { ItemsGameContext } from "../../contexts/ItemsGameContext"

import { api } from "../../services/api"


type DataAlphabet = {
  name: string;
  characters: any;
}

type AlphabetProps = {
  infoAlphabet: {
    name: string,
    infoText: string
  },
  dataAlphabet: DataAlphabet[];
}


export default function Alphabet({ dataAlphabet, infoAlphabet }: AlphabetProps) {

  const {
    itemsInGameInformation,
    selectToggleItemGame,
    resetItemsInGame
  } = useContext(ItemsGameContext)

  const router = useRouter()
  const { slug } = router.query

  const dataCookiesInformation = Cookies.getJSON('KaraGameInformation')

  console.log(dataCookiesInformation.nameAlphabet, slug)
  if (dataCookiesInformation.nameAlphabet !== slug) {
    Cookies.set('KaraGameInformation', JSON.stringify({
      nameAlphabet: slug,
      itemsAlphabetInGame: {}
    }))
    
    resetItemsInGame()
  }

  const colorModeObject = {
    backgroundHome: useColorModeValue('', 'gray.800'),
    backgroundButton: useColorModeValue('gray.300', 'gray.850'),
    textColorHome: useColorModeValue('', 'gray.100'),
    colorSchemeButton: useColorModeValue('teal', 'twitter'),
    colorCheckButton: useColorModeValue('white', 'green')
  }

  function handleFamilySelected(nameFamily: string) {
    const indexItemInGame = itemsInGameInformation.findIndex(
      item => item.name === nameFamily
    )

    if (indexItemInGame === -1) {
      return false
    }

    return true
  }

  return (
    <Box as='main' minHeight='calc(100vh - 6rem)' display='flex'
      width='100vw' background={colorModeObject.backgroundHome}
      color={colorModeObject.textColorHome}
    >
      <Box as='div' display='flex' flexDirection='column' alignItems='center'
        height='100%' width='100%' marginTop='1rem' marginLeft='1rem'
      >
        <Heading paddingTop='2rem' color={colorModeObject.textColorHome}
        >
          Escolha as famílias para estudar
        </Heading>
        <Box as='section' gridArea='buttonsFamilies' display='flex' flexWrap='wrap'
          marginTop='3rem' 
        >
          {dataAlphabet.map((family, indexFamily) => (
            <>
              {handleFamilySelected(family.name) ? (
                <Button key={`${family.name}_${indexFamily}_s`} onClick={() => selectToggleItemGame(
                  family.name, family.characters)}

                  flex='1 0 20%' margin='0.4rem' size='lg'
                  colorScheme={colorModeObject.colorSchemeButton}
                  leftIcon={<FontAwesomeIcon icon='check-circle' color={colorModeObject.colorCheckButton} />}
                >
                  <Text as='span'>
                    {`${family.name}`}
                  </Text>
                </Button>
              ) : (
                <Button key={`${family.name}_${indexFamily}`} onClick={() => selectToggleItemGame(
                  family.name, family.characters)}

                  flex='1 0 20%' margin='0.4rem' size='lg'
                  leftIcon={<FontAwesomeIcon icon='circle' />}
                  variant='outline'
                >
                  <Text as='span'>
                    {`${family.name}`}
                  </Text>
                </Button>
              )}
            </>
          ))}
        </Box>
      </Box>
      <Box as='div' gridArea='startGame' display='flex' alignItems='center' 
        flexDirection='column' height='calc(100vh - 6rem)' width='50rem' justifyContent='center'
        padding='2rem 5rem'
      >
        <Text as='strong' fontSize='2rem' fontWeight='600' textTransform='capitalize'>
          {infoAlphabet.name}
        </Text>
        <Text as='span' fontSize='1.3rem' margin='2rem 0 2.5rem 0'>
          {infoAlphabet.infoText}
        </Text>
        <Divider orientation="horizontal" />
        <Link href='/game'>
          <LinkChakra marginTop='2.5rem'
            _hover={{
              textDecoration: 'none'
            }}
          >
            <Button size='lg'>
              Iniciar game
            </Button>
          </LinkChakra>
        </Link>
      </Box>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.params

  const { data } = await api.get(`/${slug}`)

  const dataAlphabetArray = Object.entries(data.alphabet)

  const dataAlphabet: DataAlphabet[] = dataAlphabetArray.map(alphabet => {
    return {
      name: alphabet[0],
      characters: alphabet[1]
    }
  })

  return {
    props: {
      infoAlphabet: {
        name: data.name,
        infoText: data.info
      },
      dataAlphabet
    }
  }
}