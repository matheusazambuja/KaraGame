import { Button } from "@chakra-ui/button";
import { Box, Heading, Link as LinkChakra, Text } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {

  const colorModeObject = {
    backgroundHome: useColorModeValue('', 'gray.800'),
    textColorHome: useColorModeValue('gray.800', 'white')
  }
  
  return (
    <Box d='flex' flexDirection='column'
      alignItems='center' minHeight='calc(100vh - 6rem)'
      background={colorModeObject.backgroundHome}
    >
      <Head>
        <title>Home - KaraGame</title>
      </Head>
      <Heading paddingTop='4.5rem' fontSize='4.5rem'
        color={colorModeObject.textColorHome}
      >
        KaraGame
      </Heading>
      <Text fontSize='1.3rem' textAlign='center' lineHeight='2.2rem' marginTop='2.7rem'>
        Este aplicativo foi criado com o intuito para que você pratique
        Hiragana e Katakana.<br />
        Divirta-se iniciando seus estudos na língua japonesa. 🚀
      </Text>
      <Box as='section' display='flex' justifyContent='space-around'
        marginTop='9rem' padding='0 15rem'
        width='100%'
      >
        <Link href='/alphabet/hiragana'>
          <Button size='lg' flex='1 0 50%' marginRight='2rem'
            colorScheme='whatsapp' fontSize='1.3rem'
          >
            <LinkChakra
              _hover={{
                textDecoration: 'none'
              }}
            >
              Hiragana
            </LinkChakra>
          </Button>
        </Link>
        <Link href='/alphabet/katakana'>
          <Button size='lg' flex='1 0 50%' colorScheme='whatsapp'
            fontSize='1.3rem'
          >
            <LinkChakra
              _hover={{
                textDecoration: 'none'
              }}
            >
              Katakana
            </LinkChakra>
          </Button>
        </Link>
      </Box>
    </Box>
  )
}
