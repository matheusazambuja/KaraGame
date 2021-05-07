import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from 'js-cookie';


type ItemInformation = {
  name: string;
  characters: String[];
}

type ItemsGameContextData = {
  itemsInGameInformation: ItemInformation[];
  selectToggleItemGame: (name: string, characters: String[]) => void;
  resetItemsInGame: () => void;
}

type ItemsGameProviderProps = {
  children: ReactNode
}

export const ItemsGameContext = createContext(
  {} as ItemsGameContextData
)


export function ItemsGameProvider({
  children
}: ItemsGameProviderProps) {

  const [itemsInGameInformation, setItemsInGameInformation] = useState<ItemInformation[]>([])

  useEffect(() => {
    const dataCookies = Cookies.getJSON('KaraGameInformation')

    if (!dataCookies) {
      Cookies.set('KaraGameInformation', JSON.stringify({
        nameAlphabet: '',
        itemsAlphabetInGame: []
      }))
      setItemsInGameInformation([])

      return;
    }

    setItemsInGameInformation(dataCookies.itemsAlphabetInGame)
  }, [])

  function selectToggleItemGame(nameItemSelected: string, characters: String[]) {

    const indexFamily = itemsInGameInformation.findIndex(
      family => family.name === nameItemSelected
    )

    const dataCookiesInformation = Cookies.getJSON('KaraGameInformation')

    if (indexFamily === -1) {
      const itemsInformationUpdated = [ ...itemsInGameInformation, { name: nameItemSelected, characters }]

      Cookies.set('KaraGameInformation', JSON.stringify({
        ...dataCookiesInformation,
        itemsAlphabetInGame: itemsInformationUpdated
      }))
      setItemsInGameInformation(itemsInformationUpdated)
    } else {
      const itemsInformationUpdated = itemsInGameInformation.filter(family => 
        family.name !== nameItemSelected
      )

      Cookies.set('KaraGameInformation', JSON.stringify({
        ...dataCookiesInformation,
        itemsAlphabetInGame: itemsInformationUpdated
      }))
      setItemsInGameInformation(itemsInformationUpdated)
    }
  }

  function resetItemsInGame() {
    setItemsInGameInformation([])
  }

  return (
    <ItemsGameContext.Provider value={{
      itemsInGameInformation,
      selectToggleItemGame,
      resetItemsInGame
    }}>
      {children}
    </ItemsGameContext.Provider>
  )
}