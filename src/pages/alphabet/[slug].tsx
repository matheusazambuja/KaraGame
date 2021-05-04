import { Box, Text } from "@chakra-ui/layout"
import { Button, Image, useColorModeValue } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { svgElements } from "framer-motion/types/render/svg/supported-elements"
import { GetServerSideProps } from "next"
import { useContext, useEffect, useState } from "react"
import { ItemsGameContext } from "../../contexts/ItemsGameContext"

import { api } from "../../services/api"


type DataFamily = {
  nameFamily: string;
  elementsFamily: any;
}

type AlphabetProps = {
  dataAlphabet: DataFamily[];
}


export default function Alphabet({ dataAlphabet }: AlphabetProps) {

  const {
    itemsGame,
    selectToggleItemGame
  } = useContext(ItemsGameContext)

  const colorModeObject = {
    backgroundHome: useColorModeValue('', 'gray.800'),
    backgroundButton: useColorModeValue('gray.300', 'gray.850'),
    textColorHome: useColorModeValue('gray.800', 'white'),
    colorSchemeButton: useColorModeValue('teal', 'twitter'),
    colorCheckButton: useColorModeValue('white', 'green')
  }

  function handleFamilySelected(nameFamily: string) {
    const familyExists = itemsGame.findIndex(item => item.nameFamily === nameFamily)

    if (familyExists === -1) {
      return false
    }

    return true
  }

  return (
    <Box as='main' height='calc(100vh - 6rem)' 
      display='grid' gridTemplateColumns='1fr' gridTemplateRows='1.3fr 0.7fr'
      gridTemplateAreas="
        'buttonFamilies'
        'startGame'
      "
      background={colorModeObject.backgroundHome}
      color={colorModeObject.textColorHome}
    >
      <Box as='section' gridArea='buttonFamilies' display='flex' flexWrap='wrap'
        margin='auto'
      >
        {dataAlphabet.map((family, indexFamily) => (
          <>
            {handleFamilySelected(family.nameFamily) ? (
              <Button key={indexFamily} onClick={() => selectToggleItemGame(
                family.nameFamily, family.elementsFamily)}
                margin='1rem' size='lg'
                colorScheme={colorModeObject.colorSchemeButton}
                leftIcon={<FontAwesomeIcon icon='check-circle' color={colorModeObject.colorCheckButton} />}
              >
                <Text as='span'>
                  {`${family.nameFamily}`}
                </Text>
              </Button>
            ) : (
              <Button key={indexFamily} onClick={() => selectToggleItemGame(
                family.nameFamily, family.elementsFamily)}
                margin='1rem' size='lg'
                leftIcon={<FontAwesomeIcon icon='circle' />}
                variant='outline'
              >
                <Text as='span'>
                  {`${family.nameFamily}`}
                </Text>
              </Button>
            )}
          </>
        ))}
      </Box>
      <Box as='div' height='100%' gridArea='startGame' display='flex'
        alignItems='center' justifyContent='center'
      >
        <Button size='lg'>
          Iniciar game
        </Button>
      </Box>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.params

  const { data } = await api.get(`/${slug}`)

  const dataArray = Object.entries(data)

  const dataAlphabet: DataFamily[] = dataArray.map(family => {
    return {
      nameFamily: family[0],
      elementsFamily: family[1]
    }
  })

  return {
    props: {
      dataAlphabet
    }
  }
}