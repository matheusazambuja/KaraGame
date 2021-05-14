import { Button } from "@chakra-ui/button";
import { Box, Heading, Link as LinkChakra, ListItem, Text, UnorderedList } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {

  const colorModeObject = {
    backgroundHome: useColorModeValue('', 'gray.800'),
    backgroundInfo: useColorModeValue('gray.50', ''),
    textColorHome: useColorModeValue('gray.800', 'white')
  }
  
  return (
    <Box d='flex' flexDirection='column' padding='0 15rem 0 17rem'
      alignItems='flex-start' minHeight='calc(100vh - 6rem)'
      background={colorModeObject.backgroundHome}
    >
      <Head>
        <title>Home - KaraGame</title>
      </Head>
      <Heading paddingTop='1.5rem' fontSize='4.5rem'
        color={colorModeObject.textColorHome}
      >
        KaraGame
      </Heading>
      <Text fontSize='1.3rem' alignItems='' lineHeight='2.2rem' marginTop='2.2rem'>
        Este aplicativo foi criado com o objetivo de auxiliar no início do seu aprendizado na língua japonesa 
        aprendendo o Hiragana e o Katakana.
      </Text>
      <Text as='strong' fontSize='1.3rem' marginTop='2rem'>
        Mas o que são o <i>Hiragana</i> e o <i>Katakana</i>? 🤔
      </Text>
      <Text as='span' fontSize='1.2rem' marginTop='1.9rem'>
        O Hiragana (ひらがな) e Katakana (カタカナ) são 
        silabários da escrita japonesa. Cada um tem suas aplicações:
      </Text>
      <UnorderedList width='fit-content' minWidth='20rem' marginTop='1rem' 
        padding='0 1.4rem'
      >
        <ListItem fontSize='1.2rem' lineHeight='2rem'>
          Usamos muito o Hiragana para escrever os kanjis e garantir um melhor 
          entendimento do leitor. Além de serem usados como partículas gramáticas;
        </ListItem>
        <ListItem fontSize='1.2rem' lineHeight='2rem'>
          O Katakana é usado principalmente para escrever palavras de origem estrangeiras;
        </ListItem>
      </UnorderedList>
      <Text as='strong' alignSelf='center' fontSize='1.4rem' marginTop='2.5rem'>
        Divirta-se iniciando seus estudos! 🧠
      </Text>
      <Box as='section' display='flex' justifyContent='space-around'
        marginTop='1.5rem' marginBottom='2rem' padding='0 15rem' width='100%'
      >
        <Link href='/alphabet/hiragana'>
          <Button size='lg' flex='1 0 50%' marginRight='2rem'
            colorScheme='whatsapp' fontSize='1.3rem' minWidth='10rem'
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
            fontSize='1.3rem' minWidth='10rem'
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
