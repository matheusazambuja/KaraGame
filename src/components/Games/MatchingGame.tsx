import { GetServerSideProps } from "next"
import Link from "next/link"
import Cookies from "js-cookie"

import { Box, Center, Divider, Text } from "@chakra-ui/layout"
import { Button, ButtonProps, Image as ImageChakra, useColorModeValue } from "@chakra-ui/react"

import { useEffect, useState } from "react"
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter"

type DataItemSide = {
  id: number;
  character: string;
  nameFamily: string;
  isSelected: boolean;
}


export default function MatchingGame() {

  const [itemsLeftSide, setItemsLeftSide] = useState<DataItemSide[]>([])
  const [itemLeftSideSelected, setItemLeftSideSelected] = useState<DataItemSide>(null)

  const [itemsRightSide, setItemsRightSide] = useState<DataItemSide[]>([])
  const [itemRightSideSelected, setItemRightSideSelected] = useState<DataItemSide>(null)

  const [itemSelectedCorrectly, setItemSelectedCorrectly] = useState<boolean>(false)
  const [quantityItemsSelectedCorrectly, setQuantityItemsSelectedCorrectly] = useState<number>(0)
  const [isFinishedGame, setIsFinishedGame] = useState<boolean>(false)

  const [nameAlphabet, setNameAlphabet] = useState<string>('')

  useEffect(() => {
    setDefaultStateGame()
  }, [])

  useEffect(() => {
    if (itemLeftSideSelected && itemRightSideSelected) {

      if (!itemLeftSideSelected.isSelected && !itemRightSideSelected.isSelected) {
        const sameNameFamily = itemLeftSideSelected.nameFamily === itemRightSideSelected.nameFamily
        const sameIdFamily = itemLeftSideSelected.id === itemRightSideSelected.id
    
        if (sameNameFamily && sameIdFamily) {
          
          const itemsLeftSideUpdated = itemsLeftSide.map(item => {
            if (item.character === itemLeftSideSelected.character) {
              const itemLeftSideChanged: DataItemSide = {
                ...itemLeftSideSelected, isSelected: true
              }

              return itemLeftSideChanged
            }

            return item
          })
          setItemsLeftSide(itemsLeftSideUpdated)

          const itemsRightSideUpdated = itemsRightSide.map(item => {
            if (item.character === itemRightSideSelected.character) {
              const itemRightSideChanged: DataItemSide = {
                ...itemRightSideSelected, isSelected: true
              }

              return itemRightSideChanged
            }

            return item
          })
          setItemsRightSide(itemsRightSideUpdated)

          setItemSelectedCorrectly(true)
        }
      }

      setItemLeftSideSelected(null)
      setItemRightSideSelected(null)
    }
  }, [itemLeftSideSelected, itemRightSideSelected])

  useEffect(() => {
    if (itemSelectedCorrectly) {
      const newQuantityItemsSelectedCorrectly = quantityItemsSelectedCorrectly + 1

      setQuantityItemsSelectedCorrectly(newQuantityItemsSelectedCorrectly)

      if (newQuantityItemsSelectedCorrectly === itemsLeftSide.length) {
        setIsFinishedGame(true)
  
        return;
      }
    }

    setItemSelectedCorrectly(false)
  }, [itemSelectedCorrectly])

  function setDefaultStateGame() {
    const dataCookiesItems = Cookies.getJSON('KaraGameInformation')

    const nameAlphabetInGame = dataCookiesItems.nameAlphabet
    const itemsAlphabetInGame = dataCookiesItems.itemsAlphabetInGame

    setNameAlphabet(nameAlphabetInGame)
    setItemSelectedCorrectly(false)
    setQuantityItemsSelectedCorrectly(0)
    setIsFinishedGame(false)
    
    const newItemsRightSide = itemsAlphabetInGame.map(family => {
      const newItemsRight = family.characters.map((item, indexItem) => {
        const newItems: DataItemSide = {
          id: indexItem,
          character: item[0],
          nameFamily: family.name,
          isSelected: false
        }
        return newItems
      })

      return newItemsRight
    })
    const newItemsRightSideMerged = [].concat.apply([], newItemsRightSide)

    setItemsRightSide(shuffleItems(newItemsRightSideMerged))
    
    const newItemsLeftSide = itemsAlphabetInGame.map(family => {
      const newItemsLeft = family.characters.map((item, indexItem) => {
        const newItems: DataItemSide = {
          id: indexItem,
          character: item[1],
          nameFamily: family.name,
          isSelected: false
        }

        return newItems
      })

      return newItemsLeft
    })
    const newItemsLeftSideMerged = [].concat.apply([], newItemsLeftSide)

    setItemsLeftSide(shuffleItems(newItemsLeftSideMerged))
  }

  function shuffleItems(itemsFromSomeSide: DataItemSide[]) {
    let currentIndex = itemsFromSomeSide.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = itemsFromSomeSide[currentIndex];
      itemsFromSomeSide[currentIndex] = itemsFromSomeSide[randomIndex];
      itemsFromSomeSide[randomIndex] = temporaryValue;
    }
  
    return itemsFromSomeSide;
  }

  function getStyleItemWasSelectedCorrectly(itemGameInButton: DataItemSide) {
    if (itemGameInButton && itemGameInButton.isSelected) {
      const styleButton: ButtonProps = {
        colorScheme: 'whatsapp',
        fontSize: '1.1rem',
        size: 'md',
        opacity: 0.8,
        _hover: {
          cursor: 'default'
        },
        _active: {}
      }

      return styleButton
    }

    return {}
  }

  function getStyleItemLeftSideSelected(character: string) {
    if (character === itemLeftSideSelected?.character) {
      const styleButton: ButtonProps = {
        colorScheme: 'whatsapp',
        fontSize: '1.1rem',
        opacity: 0.8,
        _hover: {
          cursor: 'default'
        },
        _active: {}
      }

      return styleButton
    }

    return {}
  }

  function getStyleItemRightSideSelected(character: string) {
    if (character === itemRightSideSelected?.character) {
      const styleButton: ButtonProps = {
        colorScheme: 'whatsapp',
        fontSize: '1.1rem',
        opacity: 0.8,
        _hover: {
          cursor: 'default'
        },
        _active: {}
      }

      return styleButton
    }

    return {}
  }

  const colorModeObject = {
    backgroundPage: useColorModeValue('', 'gray.800'),
    textColorPage: useColorModeValue('', 'gray.100')
  }

  return (
    <Box as='main' display='grid' minHeight='calc(100vh - 6rem)'
      gridTemplateColumns={{ base: '1fr 1fr', md: '1.2fr 1.2fr 0.6fr' }}
      gridTemplateRows={{ base: '1.4fr 0.6fr', md: '1fr' }}
      gridTemplateAreas={{
        base: " 'leftSide rightSide' 'info info' ",
        md: " 'leftSide rightSide info' "
      }}
      background={colorModeObject.backgroundPage}
      color={colorModeObject.textColorPage}
    >
      <Box gridArea='leftSide' display='flex' flexWrap='wrap' height='fit-content'
        borderRight='1.5px solid' borderRightColor='blackAlpha.300'
        margin='2rem 0'
      >
        {itemsLeftSide && itemsLeftSide.map(item => (
          <Button onClick={() => {
            setItemLeftSideSelected(item)
          }}
            key={`${item.character}`} fontSize='1.2rem' size='lg'
            flex='1 0 20%'

            {...getStyleItemLeftSideSelected(item.character)}
            {...getStyleItemWasSelectedCorrectly(item)}

            margin='1.7rem'
            textTransform='uppercase'
            transition='all 400ms'
          >
            {item.character}
          </Button>
        ))}
      </Box>
      <Box gridArea='rightSide' display='flex' flexWrap='wrap' height='fit-content'
        borderLeft='1.5px solid' borderLeftColor='blackAlpha.300' 
        margin='2rem 0'
      >
        {itemsRightSide.map(item => (
          <Button onClick={() => {
            setItemRightSideSelected(item)
          }}
            key={`${item.character}`} fontSize='1.2rem' size='lg'
            flex='1 0 20%'

            {...getStyleItemRightSideSelected(item.character)}
            {...getStyleItemWasSelectedCorrectly(item)}

            margin='1.7rem'
            transition='all 400ms'
          >
            {item.character}
          </Button>
        ))}
      </Box>
      <Box as='div' gridArea='info' display='flex' padding='0.5rem 0'>
        <Center height='100%' display={{ base: 'none', md: 'block' }}>
          <Divider orientation='vertical' />
        </Center>
        <Box display='flex' flexDirection={{ base: 'row', md: 'column' }}
          marginTop='2rem'
        >
          <Box as='div' display='flex' flexDirection='column' alignItems='center'
            padding='0 1rem'
          >
            <Text as='strong' fontSize='1.3rem' marginBottom='1.6rem'>
              {capitalizeFirstLetter(nameAlphabet)}
            </Text>
            <ImageChakra src={`/${nameAlphabet}.png`} 
              width={{ base: '7rem', md: '10rem' }} 
            />
          </Box>
          <Box as='div' display='flex' flexDirection='column' alignItems='center'
            padding='0 0.5rem'
          >
            <Text as='strong' fontSize='1.15rem' marginTop={{ base: '1.3rem', md: '2.5rem' }} 
              textAlign='center'
            >
              Pares restantes
            </Text>
            <Text as='strong' fontSize='1.1rem'>
              {`${quantityItemsSelectedCorrectly}/${itemsLeftSide.length}`}
            </Text>
          </Box>

          <Box as='div' display='flex' flexDirection='column' alignItems='center'>
            <Text as='strong' fontSize='1.3rem' marginBottom='1rem' color='green.100'
              textAlign='center'
            >
              Objetivo do jogo:
            </Text>
            <Text as='span' fontSize='1.1rem' textAlign='center' 
              padding={{ base: '0 1rem', md: '0 3rem' }}
            >
              Relacionar corretamente os elementos das duas colunas
            </Text>
          </Box>

          {!isFinishedGame && 
            quantityItemsSelectedCorrectly > 0 &&
            quantityItemsSelectedCorrectly < itemsLeftSide.length
            && (
              <>
                <Button marginTop='3rem' colorScheme='green' onClick={() => setDefaultStateGame()}>
                  Reiniciar jogo
                </Button>
              </>
            )
          }

          {isFinishedGame && (
            <>
              <Text as='strong' marginTop='3rem'>
                Parabéns!!!
              </Text>
              <Button marginTop='2rem' colorScheme='green' onClick={() => setDefaultStateGame()}>
                Estudar novamente
              </Button>
              <Button marginTop='2rem' marginBottom='3rem' colorScheme='green'>
                <Link href={`/alphabet/${nameAlphabet}`}>
                  Estudar outras famílias
                </Link>
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { KaraGameInformation } = ctx.req.cookies
  const { nameAlphabet, itemsAlphabetInGame } = JSON.parse(KaraGameInformation)

  if (itemsAlphabetInGame.length === 0) {
    return {
      redirect: {
        destination: `/alphabet/${nameAlphabet}`,
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}