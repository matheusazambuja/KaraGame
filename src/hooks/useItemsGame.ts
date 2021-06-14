import { useContextSelector } from 'use-context-selector';
import { ItemsGameContext } from '../contexts/ItemsGameContext';

export function useItemsGame() {
  const itemsInGameInformation = useContextSelector(ItemsGameContext, item => item.itemsInGameInformation);
  const selectToggleItemGame = useContextSelector(ItemsGameContext, item => item.selectToggleItemGame);
  const resetItemsInGame = useContextSelector(ItemsGameContext, item => item.resetItemsInGame);

  return {
    itemsInGameInformation, selectToggleItemGame, resetItemsInGame
  }
}