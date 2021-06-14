import { ReactNode, useCallback, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { createContext } from 'use-context-selector'


type ItemInformation = {
  name: string;
  characters: String[];
};

type ItemsGameContextData = {
  itemsInGameInformation: ItemInformation[];
  selectToggleItemGame: (name: string, characters: String[]) => void;
  resetItemsInGame: () => void;
};

type ItemsGameProviderProps = {
  children: ReactNode
};

export const ItemsGameContext = createContext({} as ItemsGameContextData);


export function ItemsGameProvider({ children }: ItemsGameProviderProps) {

  const [itemsInGameInformation, setItemsInGameInformation] = useState<ItemInformation[]>([]);

  useEffect(() => {
    const dataCookies = Cookies.getJSON('KaraGameInformation');

    if (!dataCookies) {
      Cookies.set('KaraGameInformation', JSON.stringify({
        nameAlphabet: '',
        itemsAlphabetInGame: []
      }))
      setItemsInGameInformation([]);

      return;
    }

    setItemsInGameInformation(dataCookies.itemsAlphabetInGame)
  }, []);

  const selectToggleItemGame = useCallback((nameItemSelected: string, characters: String[]) => {

    const familyExists = itemsInGameInformation.some(
      family => family.name === nameItemSelected
    )

    const dataCookiesInformation = Cookies.getJSON('KaraGameInformation')

    if (!familyExists) {
      const itemsInformationUpdated = [ ...itemsInGameInformation, { name: nameItemSelected, characters }]

      Cookies.set('KaraGameInformation', JSON.stringify({
        ...dataCookiesInformation,
        itemsAlphabetInGame: itemsInformationUpdated
      }))
      setItemsInGameInformation(itemsInformationUpdated)
    } else {
      const itemsInformationUpdated = itemsInGameInformation.filter(family => family.name !== nameItemSelected)

      Cookies.set('KaraGameInformation', JSON.stringify({
        ...dataCookiesInformation,
        itemsAlphabetInGame: itemsInformationUpdated
      }))
      setItemsInGameInformation(itemsInformationUpdated)
    }
  }, [itemsInGameInformation]);

  const resetItemsInGame = useCallback(() => {
    setItemsInGameInformation([]);
  }, []);

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