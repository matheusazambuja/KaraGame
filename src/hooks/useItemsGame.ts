import { useContext } from 'react';
import { ItemsGameContext } from '../contexts/ItemsGameContext';

export function useItemsGame() {
  const value = useContext(ItemsGameContext);

  return value;
}