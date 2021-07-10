import { GetServerSideProps } from "next"
import Link from "next/link"
import Cookies from "js-cookie"

import { useEffect, useState } from "react"
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter"

import styles from "./styles.module.scss";
import Head from "next/head"

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

  return (
    <main className={styles.mainContent}>
      <Head><title>{`Quiz - ${capitalizeFirstLetter(nameAlphabet)}`}</title></Head>
      <section className={styles.leftSide}>
        {itemsLeftSide && itemsLeftSide.map(item => (
          <button onClick={() => { setItemLeftSideSelected(item) }}
            key={`${item.character}`}
            className={
              item.character === itemLeftSideSelected?.character && styles.itemSelected ||
              item.isSelected && styles.itemSelectedCorrectly
            }

          >
            {item.character}
          </button>
        ))}
      </section>
      <section className={styles.rightSide}>
        {itemsRightSide.map(item => (
          <button onClick={() => {
            setItemRightSideSelected(item)
          }}
            key={`${item.character}`}
          >
            {item.character}
          </button>
        ))}
      </section>
      <section className={styles.infos}>
        <div className={styles.lineDivider}>
          <hr />
        </div>
        <div>
          <strong>{capitalizeFirstLetter(nameAlphabet)}</strong>
          <img src={`/${nameAlphabet}.png`} alt={`Image ${nameAlphabet}`} />
        </div>
        <div>
          <strong>Pares restantes</strong>
          <strong>{`${quantityItemsSelectedCorrectly}/${itemsLeftSide.length}`}</strong>
        </div>
        <div>
          <strong>Objetivo do jogo:</strong>
          <p>Relacionar corretamente os elementos das duas colunas</p>
        </div>
        {!isFinishedGame &&
          quantityItemsSelectedCorrectly > 0 &&
          quantityItemsSelectedCorrectly < itemsLeftSide.length
          && (
            <>
              <button onClick={() => setDefaultStateGame()}>Reiniciar jogo</button>
            </>
          )
        }

        {isFinishedGame && (
          <>
            <strong>Parabéns!!!</strong>
            <button onClick={() => setDefaultStateGame()}>Estudar novamente</button>
            <button>
              <Link href={`/alphabet/${nameAlphabet}`}>
                Estudar outras famílias
              </Link>
            </button>
          </>
        )}
      </section>
    </main>
  );
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