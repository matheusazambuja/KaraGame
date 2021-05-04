import { Button } from "@chakra-ui/button";
import { Box, Link as LinkChakra, Text } from "@chakra-ui/layout";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link';


export default function Header() {
  const { toggleColorMode } = useColorMode()

  const colorModeObject = {
    iconButtonToggle: useColorModeValue(
      <FontAwesomeIcon icon='moon' />,
      <FontAwesomeIcon icon='sun' color='white' />
    ),
    backgroundButtonToggle: useColorModeValue('gray.50', 'transparent'),
    backgroundHeader: useColorModeValue('white', 'gray.850'),
    colorBorderBottom: useColorModeValue('gray.100', 'gray.900'),
    colorHeader: useColorModeValue('', 'gray.100')
  }
  
  return (
    <Box as='header' d='flex' alignItems='center'
      background={colorModeObject.backgroundHeader}
      color={colorModeObject.colorHeader}
      height='6rem'
      width='100%'

      padding='2rem 4rem'
      borderBottom='1px solid'
      borderBottomColor={colorModeObject.colorBorderBottom}

      transition='all 200ms'
    >
      <Link href='/'>
        <LinkChakra padding='0 2rem 0 0' fontSize='1.5rem'
        >
          <FontAwesomeIcon icon='home' />
        </LinkChakra>
      </Link>
      <Link href='/families'>
        <Text fontSize='1.2rem'>
          Families
        </Text>
      </Link>
      <Button onClick={toggleColorMode} marginLeft='auto' fontSize='1.2rem'>
        {colorModeObject.iconButtonToggle}
      </Button>
    </Box>
  )
}