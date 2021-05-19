import { Box, Center, Divider, Heading, Link as LinkChakra, Text } from "@chakra-ui/layout"
import { Button, useColorModeValue } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Cookies from "js-cookie"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from 'next/router'
import { info } from "node:console"
import { useContext, useEffect } from "react"
import { ItemsGameContext } from "../../contexts/ItemsGameContext"

import { api } from "../../services/api"
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter'

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

  useEffect(() => {
    const dataCookiesInformation = Cookies.getJSON('KaraGameInformation')

    if (dataCookiesInformation.nameAlphabet !== slug) {
      Cookies.set('KaraGameInformation', JSON.stringify({
        nameAlphabet: slug,
        itemsAlphabetInGame: []
      }))
      
      resetItemsInGame()
    }
  }, [])

  const colorModeObject = {
    backgroundHome: useColorModeValue('', 'gray.800'),
    backgroundButton: useColorModeValue('gray.300', 'gray.850'),
    backgroundInfo: useColorModeValue('gray.50', ''),
    textColorHome: useColorModeValue('', 'gray.100'),
    colorCheckButton: useColorModeValue('white', 'green'),
  }

  function handleFamilySelected(nameFamily: string) {

    if (itemsInGameInformation.length === 0) return false;

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
      <Head>
        <title>{capitalizeFirstLetter(infoAlphabet.name)} - KaraGame</title>
      </Head>
      <Box as='div' display='flex' flexDirection='column' alignItems='center'
        height='100%' width='100%' margin='0 2rem' marginBottom='3rem' alignSelf='center'
      >
        <Heading color={colorModeObject.textColorHome}
        >
          Escolha as famílias para estudar
        </Heading>
        <Text marginTop='0.4rem' fontSize='1.1rem'>
          (Cada coluna na tabela do {capitalizeFirstLetter(infoAlphabet.name)} é 
          dita como uma família)
        </Text>
        <Box as='section' gridArea='buttonsFamilies' display='flex' flexWrap='wrap'
          marginTop='2.3rem' width='50rem'
        >
          {dataAlphabet.map((family, indexFamily) => (
            <>
              {handleFamilySelected(family.name) ? (
                <Button key={`${family.name}_${indexFamily}_s`} onClick={() => selectToggleItemGame(
                  family.name, family.characters)}

                  flex='1 0 20%' margin='0.4rem' size='lg'
                  colorScheme='whatsapp'
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
      <Center margin='2rem 0'>
        <Divider orientation="vertical" />
      </Center>
      <Box as='div' gridArea='startGame' display='flex' alignItems='center' 
        flexDirection='column' justifyContent='center' height='100%' width='100%'
        padding='2rem' marginTop='2rem' marginBottom='3rem'
      >
        <Text as='strong' fontSize='2.5rem' textTransform='capitalize'
          marginBottom='2rem'
        >
          {infoAlphabet.name}
        </Text>
        <Box background={colorModeObject.backgroundInfo} textAlign='center'
          border='1px solid' borderColor='blackAlpha.100' boxShadow='1px 1px 13px -1px rgba(0,0,0,0.13)'
          margin='0.5rem' padding='1rem' borderRadius='10px'
        >
          <Text as='span' fontSize='1.3rem' lineHeight='1.8rem'>
            {infoAlphabet.infoText}
          </Text>
        </Box>
        <Text as='strong' fontSize='1.3rem' marginTop='1.2rem'>
          Como deseja estudar?
        </Text>
        {itemsInGameInformation.length >= 1 && (
          <Box as='div' display='flex' alignItems='center' justifyContent='center'
            width='100%' padding='0 1rem' marginTop='2.4rem'
          >
            <Link href='/game/matching-elements'>
              <Button size='lg' flex='1 0 50%' marginRight='2rem' 
                colorScheme='whatsapp'
              >
                <LinkChakra
                  _hover={{
                    textDecoration: 'none'
                  }}
                >
                  Relacionar elementos
                </LinkChakra>
              </Button>
            </Link>
            <Link href='/game/quiz'>
              <Button size='lg' flex='1 0 50%'
                colorScheme='whatsapp'
              >
                <LinkChakra
                  _hover={{
                    textDecoration: 'none'
                  }}
                >
                  Quiz
                </LinkChakra>
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get(`/alphabets/`)

  const paths = data.map(alphabet => {
    return {
      params: {
        slug: alphabet.id
      }
    }
  })

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params

  const { data } = await api.get(`/alphabets/${slug}`)

  const elementsAlphabetArray = Object.entries(data.alphabet)

  const dataAlphabet: DataAlphabet[] = elementsAlphabetArray.map(alphabet => {
    return {
      name: alphabet[0],
      characters: alphabet[1]
    }
  })

  return {
    props: {
      infoAlphabet: {
        name: data.id,
        infoText: data.info
      },
      dataAlphabet
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}