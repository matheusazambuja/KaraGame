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
      <Heading paddingTop='2rem'
        color={colorModeObject.textColorHome}
      >
        Opções de estudo
      </Heading>
      <Box as='section' display='flex' justifyContent='space-around'
        marginTop='4rem'
        width='100%'
      >
        <Link href='/alphabet/hiragana'>
          <Button size='lg'>
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
          <Button size='lg'>
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
