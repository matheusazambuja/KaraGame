import { Button } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import { ButtonProps, Progress, useColorModeValue } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";


type DataItemAsked = {
  character: string;
  translation: string;
  isSelected: boolean
}

export default function Quiz() {

  const [itemsAsked, setItemsAsked] = useState<DataItemAsked[]>([])
  const [itemCurrentAsked, setItemCurrentAsked] = useState<DataItemAsked>(null)
  
  const [possiblesTranslate, setPossiblesTranslate] = useState<[]>([])
  const [translateSelected, setTranslateSelected] = useState<string>('')

  const [translateSelectedCorrectly, setTranslateSelectedCorrectly] = useState<boolean>(false)

  const [isFinishedGame, setIsFinishedGame] = useState<boolean>(false)

  const [nameAlphabet, setNameAlphabet] = useState<string>('')

  useEffect(() => {
    setDefaultStateGame()
  }, [])

  useEffect(() => {
    if (Array.isArray(itemsAsked) && itemsAsked.length) {
      const unansweredItems = itemsAsked.filter(item => !item.isSelected)
      const unansweredItemsShuffle = shuffleItems(unansweredItems)

      if (unansweredItems.length === 0) {
        setIsFinishedGame(true)
      }

      const randomNumberInRangeList = Math.floor(
        Math.random() * unansweredItemsShuffle.length
      ) + 0

      setItemCurrentAsked(unansweredItemsShuffle[randomNumberInRangeList])
      setTranslateSelectedCorrectly(false)
      setTranslateSelected('')

    }
  }, [itemsAsked])

  useEffect(() => {
    if (itemCurrentAsked) {
      handleSetPossiblesTranslate()
    }
  }, [itemCurrentAsked])

  useEffect(() => {
    if (translateSelected !== '') {
      const isSameItem = translateSelected === itemCurrentAsked.translation

      if (isSameItem) {
        setTranslateSelectedCorrectly(true)
      }
    }
  }, [translateSelected])

  useEffect(() => {
    if (translateSelectedCorrectly) {
      const newItemsAsked = itemsAsked.map(item => {
        if (item.translation == translateSelected) {
          return { ...item, isSelected: true }
        }

        return item
      })

      setItemsAsked(newItemsAsked)
    }
  }, [translateSelectedCorrectly])


  function setDefaultStateGame() {
    const dataCookiesItems = Cookies.getJSON('KaraGameInformation')

    const nameAlphabetInGame = dataCookiesItems.nameAlphabet
    const itemsAlphabetInGame = dataCookiesItems.itemsAlphabetInGame

    setNameAlphabet(nameAlphabetInGame)
    setTranslateSelectedCorrectly(false)
    setTranslateSelected('')
    setIsFinishedGame(false)

    const newItemsAsked = itemsAlphabetInGame.map(family => {
      const newItems = family.characters.map(item => {
        const newItem: DataItemAsked = {
          character: item[0],
          translation: item[1],
          isSelected: false
        }
        return newItem
      })
      return newItems
    })

    
    const newItemsAskedMerged = [].concat.apply([], newItemsAsked)

    setItemsAsked(shuffleItems(newItemsAskedMerged))
  }

  function handleSetPossiblesTranslate() {
    let randomNumberInRangeList = 0
    const newPossibleTransition = [itemCurrentAsked.translation]

    while (newPossibleTransition.length < 4) {
      randomNumberInRangeList = Math.floor(Math.random() * itemsAsked.length) + 0
      
      if (!newPossibleTransition.includes(itemsAsked[randomNumberInRangeList].translation)) {
        newPossibleTransition.push(itemsAsked[randomNumberInRangeList].translation)
      }
    }

    setPossiblesTranslate(shuffleItems(newPossibleTransition))
  }

  function quantityItemsWasSelectedCorrectly() {
    const itemsSelectedCorrectly = itemsAsked.filter(item => item.isSelected)

    return itemsSelectedCorrectly.length
  }

  function shuffleItems(items) {
    let currentIndex: number = items.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = items[currentIndex];
      items[currentIndex] = items[randomIndex];
      items[randomIndex] = temporaryValue;
    }
  
    return items;
  }

  const colorModeObject = {
    backgroundPage: useColorModeValue('', 'gray.800'),
    backgroundInfo: useColorModeValue('gray.100', ''), 
    textColorPage: useColorModeValue('', 'gray.100')
  }

  return (
    <Box as='main' display='grid' minHeight='calc(100vh - 6rem)'
      gridTemplateColumns='1fr' gridTemplateRows='0.8fr 1.3fr 1.2fr 0.7fr'
      gridTemplateAreas="
        'feedback'
        'askedSymbol'
        'possibleAnswers'
        'progressBar'
      "
      background={colorModeObject.backgroundPage}
      color={colorModeObject.textColorPage}
    >
      <Box gridArea='feedback' as='div' display='flex'
        alignItems='center' justifyContent='center'
      >
        <Text as='strong' fontSize='1.4rem' background={colorModeObject.backgroundInfo}>
          Selecione a opção correspondente ao elemento
        </Text>
      </Box>

      {!isFinishedGame && (
        <>
          <Text gridArea='askedSymbol' as='strong' display='flex' 
            alignItems='center' justifyContent='center' fontSize='8rem'
          >
            {itemCurrentAsked && itemCurrentAsked.character}
          </Text>
          
          <Box gridArea='possibleAnswers' as='div' display='flex' 
            alignItems='center' justifyContent='center'
          >
            {possiblesTranslate.map(translate => (
              <Button key={`button_${translate}`} onClick={() => setTranslateSelected(translate)}
                size='lg' margin='0 1rem' textTransform='uppercase'
              >
                {translate}
              </Button>
            ))}
          </Box>
        </>
      )}

      {isFinishedGame && (
        <>
          <Box gridArea='askedSymbol' display='flex' alignItems='center' 
            justifyContent='center'
          >
            <Text as='strong' fontSize='3rem' fontStyle='italic' border='1px solid'
              borderColor='blackAlpha.100' boxShadow='1px 1px 13px -1px rgba(0,0,0,0.23)'
              padding='3rem' borderRadius='15px' background={colorModeObject.backgroundInfo}
            >
              Parabéns!!!
            </Text>
          </Box>
          <Box gridArea='possibleAnswers' as='div' display='flex'
            justifyContent='center' padding='1rem' marginTop='1rem'
          >
            <Button onClick={() => setDefaultStateGame()}
              colorScheme='whatsapp' marginRight='1rem'
            >
              Estudar novamente
            </Button>
            <Button colorScheme='whatsapp'>
              <Link href={`/alphabet/${nameAlphabet}`}>
                Estudar outras famílias
              </Link>
            </Button>
          </Box>
        </>
      )}

      <Progress gridArea='progressBar' value={Math.floor(quantityItemsWasSelectedCorrectly() / itemsAsked.length * 100)}
        margin='0 20rem' borderRadius='10px' colorScheme='whatsapp'
      />
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