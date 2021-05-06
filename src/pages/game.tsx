import { Box, Text } from "@chakra-ui/layout"
import { Button, ButtonProps, useColorModeValue } from "@chakra-ui/react"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"

type DataFamily = {
  name: string;
  characters: [];
}

type DataItemSide = {
  id: number;
  character: string;
  nameFamily: string;
  isSelected: boolean;
}


export default function Game() {

  const [itemsLeftSide, setItemsLeftSide] = useState<DataItemSide[]>([])
  const [itemLeftSideSelected, setItemLeftSideSelected] = useState<DataItemSide>(null)

  const [itemsRightSide, setItemsRightSide] = useState<DataItemSide[]>([])
  const [itemRightSideSelected, setItemRightSideSelected] = useState<DataItemSide>(null)

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
        }
      }

      setItemLeftSideSelected(null)
      setItemRightSideSelected(null)
    }
  }, [itemLeftSideSelected, itemRightSideSelected])

  useEffect(() => {
    const dataCookiesItems = Cookies.getJSON('KaraGameInformation')

    const itemsAlphabetInGame = dataCookiesItems.itemsAlphabetInGame
    
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
  }, [])

  function getQuantityItemsSelectedCorrectly(itemsOneSide: DataItemSide[]) {
    const itemsSelectedCorrectly = itemsOneSide.filter(item => item.isSelected)

    return itemsSelectedCorrectly.length
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
        colorScheme: 'teal',
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
        colorScheme: 'teal',
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
    textColorPage: useColorModeValue('', 'gray.100'),
    colorSchemeButton: useColorModeValue('teal', 'twitter')
  }

  return (
    <Box display='grid' minHeight='calc(100vh - 6rem)'
      gridTemplateColumns='1.2fr 1.2fr 0.6fr' gridTemplateRows='1fr'
      gridTemplateAreas="
        'leftSide rightSide info'
      "
      background={colorModeObject.backgroundPage}
      color={colorModeObject.textColorPage}
    >
      <Box gridArea='leftSide'>
        {itemsLeftSide && itemsLeftSide.map(item => (
          <Button onClick={() => {
            setItemLeftSideSelected(item)
          }}
            key={`${item.character}`} fontSize='1.2rem' size='lg'

            {...getStyleItemLeftSideSelected(item.character)}
            {...getStyleItemWasSelectedCorrectly(item)}

            margin='1.7rem'
            transition='all 400ms'
          >
            {item.character}
          </Button>
        ))}
      </Box>
      <Box gridArea='rightSide'>
        {itemsRightSide.map(item => (
          <Button onClick={() => {
            setItemRightSideSelected(item)
          }}
            key={`${item.character}`} fontSize='1.2rem' size='lg'

            {...getStyleItemRightSideSelected(item.character)}
            {...getStyleItemWasSelectedCorrectly(item)}

            margin='1.7rem'
            transition='all 400ms'
          >
            {item.character}
          </Button>
        ))}
      </Box>
      <Box gridArea='info' display='flex' flexDirection='column' 
        alignItems='center' justifyContent='center'
      >
        <Text as='strong'>
          Pares restantes
        </Text>
        <Text as='strong'>
          {`${getQuantityItemsSelectedCorrectly(itemsLeftSide)}/${itemsLeftSide.length}`}
        </Text>
      </Box>
    </Box>
  )
}