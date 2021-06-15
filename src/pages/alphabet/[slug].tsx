import { Box, Center, Divider, Heading, Link as LinkChakra, Text } from "@chakra-ui/layout"
import { Button, Popover, PopoverTrigger, PopoverContent, PopoverHeader,
  PopoverBody, PopoverFooter, PopoverArrow, useColorModeValue, PopoverCloseButton,
  Stack } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Cookies from "js-cookie"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from 'next/router'
import { useEffect } from "react"
import { useItemsGame } from "../../hooks/useItemsGame"

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
  } = useItemsGame();

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
    backgroundHome: useColorModeValue('', 'gray.600'),
    backgroundButton: useColorModeValue('gray.300', 'gray.850'),
    backgroundInfo: useColorModeValue('gray.50', ''),
    textColorHome: useColorModeValue('gray.800', 'gray.100'),
    textColorSecondary: useColorModeValue('', 'gray.200'),
    colorCheckButton: useColorModeValue('white', 'green'),
  }

  const HowDoYouWantToStudy = (
    <>
      {itemsInGameInformation.length >= 1 && (
        <>
          <Text as='strong' fontSize='1.3rem' marginTop='1.2rem'>
            Como deseja estudar?
          </Text>
          <Box as='div' display='flex' alignItems='center' justifyContent='center'
            width='100%' marginTop='2.4rem'
          >
            <Link href='/game/matching-elements'>
              <Button size='lg' marginRight='2rem' 
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
              <Button size='lg'
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
        </>
      )}
    </>
  )

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
      flexDirection={{
        base: 'column-reverse',
        xl2: 'row'
      }}
      width='100%' background={colorModeObject.backgroundHome}
      color={colorModeObject.textColorHome}
    >
      <Head>
        <title>{capitalizeFirstLetter(infoAlphabet.name)} - KaraGame</title>
      </Head>
      <Box as='header' display='flex' flexDirection='column' alignItems='center'
        padding={{ base: '0 1rem', lg: '3rem 2rem' }}
      >
        <Box as='h3' textAlign={{ base: 'center', lg: 'left' }}
          fontSize={{ base: '1.15rem', lg: '2.3rem' }}
          color={colorModeObject.textColorHome}
        >
          Escolha as famílias para estudar
        </Box>
        <Text fontSize={{
            base: '0.8rem', lg: '1.1rem'
          }} textAlign={{
            base: 'center', lg: 'left'
          }} marginTop={{
            base: '0.6rem', lg: '0.4rem'
          }} padding='0 2rem' color={colorModeObject.textColorSecondary}
        >
          (Cada coluna na tabela do {capitalizeFirstLetter(infoAlphabet.name)} é 
          dita como uma família)
        </Text>
        <Box as='section' gridArea='buttonsFamilies' display='flex' flexWrap='wrap'
          marginTop='2.3rem' width='100%'
        >
          {dataAlphabet.map((family, indexFamily) => (
            <>
              {handleFamilySelected(family.name) ? (
                <Button key={`${family.name}_${indexFamily}_s`} onClick={() => selectToggleItemGame(
                  family.name, family.characters)}

                  flex={{
                    base: '1 0 60%',
                    sm: '1 0 40%',
                    md: '1 0 30%',
                    lg: '1 0 20%'
                  }} margin='0.4rem' size='lg'
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

                  flex={{
                    base: '1 0 60%',
                    sm: '1 0 40%',
                    md: '1 0 30%',
                    lg: '1 0 20%'
                  }} margin='0.4rem' size='lg'
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
        <Box display={{ base: 'flex', xl2: 'none' }} alignItems='center' flexDirection='column'
          paddingBottom='3rem' paddingTop='1rem'
        >
          {HowDoYouWantToStudy}
        </Box>
      </Box>
      <Center display={{ base: 'none', lg: 'block' }} margin='2rem 0'>
        <Divider orientation="vertical" />
      </Center>
      <Box as='div' gridArea='startGame' display='flex' alignItems='center' 
        flexDirection='column' justifyContent='center'
        padding='0 2rem' paddingTop={{
          base: '1rem',
          lg: '0'
        }} 
      >
        <Stack direction='row' spacing={6} as='section' display='flex' 
          alignItems='center' marginBottom={{
            base: '1rem', lg: '0'
          }}
        >
          <Text as='strong' fontSize={{
              base: '2.1rem', lg: '2.5rem'
            }} textTransform='capitalize'
          >
            {infoAlphabet.name}
          </Text>
          <Popover>
            <PopoverTrigger>
              <Button colorScheme='linkedin' size='xs'>
                <FontAwesomeIcon icon='info'/>
              </Button>
            </PopoverTrigger>
            <PopoverContent width={{ base: '85vw', lg: '70vw' }}
              padding='1rem' lineHeight={{ base: '1.4rem', lg: '1.8rem' }}

            >
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader fontWeight='600' letterSpacing='1px' textTransform='uppercase'>
                {infoAlphabet.name}
              </PopoverHeader>
              <PopoverBody>{infoAlphabet.infoText}</PopoverBody>
            </PopoverContent>
          </Popover>
        </Stack>
        <Box display={{ base: 'none', xl2: 'flex' }} alignItems='center' flexDirection='column'>
          {HowDoYouWantToStudy}
        </Box>
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