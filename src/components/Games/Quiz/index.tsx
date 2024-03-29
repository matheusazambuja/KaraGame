import Cookies from "js-cookie";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "../../../hooks/useTheme";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";
import { BackgroundHero } from "../../BackgroundHero";
import { Button } from "../../Button";
import { BgHeroGeneric } from "../../IconComponents/BgHeroGeneric";

import styles from './styles.module.scss';


type DataItemAsked = {
  character: string;
  translation: string;
  isSelected: boolean
}

export default function Quiz() {

  const {
    theme
  } = useTheme();

  const [itemsAsked, setItemsAsked] = useState<DataItemAsked[]>([]);
  const [itemCurrentAsked, setItemCurrentAsked] = useState<DataItemAsked>(null);

  const [possiblesTranslate, setPossiblesTranslate] = useState<[]>([]);
  const [translateSelected, setTranslateSelected] = useState<string>('');

  const [translateSelectedCorrectly, setTranslateSelectedCorrectly] = useState<boolean>(false);

  const [isFinishedGame, setIsFinishedGame] = useState<boolean>(false);

  const [nameAlphabet, setNameAlphabet] = useState<string>('');

  useEffect(() => {
    setDefaultStateGame();
  }, []);

  useEffect(() => {
    if (Array.isArray(itemsAsked) && itemsAsked.length) {
      const unansweredItems = itemsAsked.filter(item => !item.isSelected);
      const unansweredItemsShuffle = shuffleItems(unansweredItems);

      if (unansweredItems.length === 0) {
        setIsFinishedGame(true);
      }

      const randomNumberInRangeList = Math.floor(
        Math.random() * unansweredItemsShuffle.length
      ) + 0;

      setItemCurrentAsked(unansweredItemsShuffle[randomNumberInRangeList]);
      setTranslateSelectedCorrectly(false);
      setTranslateSelected('');
    }
  }, [itemsAsked]);

  useEffect(() => {
    if (itemCurrentAsked) {
      handleSetPossiblesTranslate();
    }
  }, [itemCurrentAsked]);

  useEffect(() => {
    if (translateSelected !== '') {
      const isSameItem = translateSelected === itemCurrentAsked.translation;

      if (isSameItem) {
        setTranslateSelectedCorrectly(true);
      }
    }
  }, [translateSelected]);

  useEffect(() => {
    if (translateSelectedCorrectly) {
      const newItemsAsked = itemsAsked.map(item => {
        if (item.translation == translateSelected) {
          return { ...item, isSelected: true };
        }

        return item;
      });

      setItemsAsked(newItemsAsked);
    }
  }, [translateSelectedCorrectly]);


  function setDefaultStateGame() {
    const dataCookiesItems = Cookies.getJSON('KaraGameInformation');

    const nameAlphabetInGame = dataCookiesItems.nameAlphabet;
    const itemsAlphabetInGame = dataCookiesItems.itemsAlphabetInGame;

    setNameAlphabet(nameAlphabetInGame);
    setTranslateSelectedCorrectly(false);
    setTranslateSelected('');
    setIsFinishedGame(false);

    const newItemsAsked = itemsAlphabetInGame.map(family => {
      const newItems = family.characters.map(item => {
        const newItem: DataItemAsked = {
          character: item[0],
          translation: item[1],
          isSelected: false
        };

        return newItem;
      })
      return newItems;
    });


    const newItemsAskedMerged = [].concat.apply([], newItemsAsked);

    setItemsAsked(shuffleItems(newItemsAskedMerged));
  }

  function handleSetPossiblesTranslate() {
    let randomNumberInRangeList = 0;
    const newPossibleTransition = [itemCurrentAsked.translation];

    while (newPossibleTransition.length < 4) {
      randomNumberInRangeList = Math.floor(Math.random() * itemsAsked.length) + 0;

      if (!newPossibleTransition.includes(itemsAsked[randomNumberInRangeList].translation)) {
        newPossibleTransition.push(itemsAsked[randomNumberInRangeList].translation);
      }
    }

    setPossiblesTranslate(shuffleItems(newPossibleTransition));
  }

  function quantityItemsWasSelectedCorrectly() {
    const itemsSelectedCorrectly = itemsAsked.filter(item => item.isSelected);

    return itemsSelectedCorrectly.length;
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

  return (
    <>
      <BackgroundHero svgHero={<BgHeroGeneric />} />
      <main className={styles.mainContent}>
        <Head><title>{`Quiz - ${capitalizeFirstLetter(nameAlphabet)}`}</title></Head>
        {!isFinishedGame &&
          <h2 className={styles.titleInfoQuiz}>Selecione a opção correspondente ao elemento</h2>
        }

        {!isFinishedGame && (
          <>
            <p className={styles.itemCurrentAsked}>{itemCurrentAsked && itemCurrentAsked.character}</p>
            <div className={styles.containerButtons}>
              {possiblesTranslate.map(translate => (
                <Button key={`button_${translate}`}
                  onClick={() => setTranslateSelected(translate)}
                >
                  {translate}
                </Button>
              ))}
            </div>

            <div className={styles.progressBar}>
              <div style={{
                width: `${Math.round(quantityItemsWasSelectedCorrectly() / itemsAsked.length * 100)}%`
              }}></div>
            </div>
          </>
        )}

        {isFinishedGame && (
          <section className={styles.finishedGame}>
            <h1>Parabéns!!!</h1>
            <h2>Você terminou o teste</h2>
            <div className={styles.containerButtonsFinished}>
              <Button onClick={setDefaultStateGame}>Estudar novamente</Button>
              <Button>
                <Link href={`/alphabet/${nameAlphabet}`}>
                  Estudar outras famílias
                </Link>
              </Button>
            </div>
          </section>
        )}
      </main>
    </>
  );
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { KaraGameInformation } = ctx.req.cookies;
  const { nameAlphabet, itemsAlphabetInGame } = JSON.parse(KaraGameInformation);

  if (itemsAlphabetInGame.length === 0) {
    return {
      redirect: {
        destination: `/alphabet/${nameAlphabet}`,
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
}