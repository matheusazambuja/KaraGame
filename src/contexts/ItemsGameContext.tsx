import { createContext, ReactNode, useState } from "react";


type ItemGame = {
  nameFamily: string;
  itemsFamily: String[];
}

type ItemsGameContextData = {
  itemsGame: ItemGame[];
  selectToggleItemGame: (nameFamilySelected: string, itemsFamily: String[]) => void;
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

  const [itemsGame, setItemsGame] = useState<ItemGame[]>([])

  function selectToggleItemGame(nameFamilySelected: string, itemsFamily: String[]) {

    const indexFamily = itemsGame.findIndex(
      family => family.nameFamily === nameFamilySelected
    )

    if (indexFamily === -1) {
      const itemsGameUpdated = [ ...itemsGame, { nameFamily: nameFamilySelected, itemsFamily }]

      setItemsGame(itemsGameUpdated)
    } else {
      const itemsGameUpdated = itemsGame.filter(family => family.nameFamily !== nameFamilySelected)

      setItemsGame(itemsGameUpdated)
    }
  }

  return (
    <ItemsGameContext.Provider value={{
      itemsGame,
      selectToggleItemGame
    }}>
      {children}
    </ItemsGameContext.Provider>
  )
}