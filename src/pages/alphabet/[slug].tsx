import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Cookies from "js-cookie"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from 'next/router'
import { useEffect } from "react"
import { useItemsGame } from "../../hooks/useItemsGame"

import { api } from "../../services/api"
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter'

import styles from './styles.module.scss';

type DataAlphabet = {
  name: string;
  characters: any;
}

type AlphabetProps = {
  infoAlphabet: {
    name: string,
    infoText: string
  },
  dataAlphabet: DataAlphabet[];
}


export default function Alphabet({ dataAlphabet, infoAlphabet }: AlphabetProps) {

  const {
    itemsInGameInformation,
    selectToggleItemGame,
    resetItemsInGame
  } = useItemsGame();

  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {
    const dataCookiesInformation = Cookies.getJSON('KaraGameInformation')

    if (dataCookiesInformation.nameAlphabet !== slug) {
      Cookies.set('KaraGameInformation', JSON.stringify({
        nameAlphabet: slug,
        itemsAlphabetInGame: []
      }))

      resetItemsInGame()
    }
  }, [])

  const HowDoYouWantToStudy = (
    <>
      {itemsInGameInformation.length >= 1 && (
        <>
          <p>Selecione um jogo:</p>
          <div className={styles.buttonsGame}>
            <Link href='/game/matching-elements'>
              <button>Relacionar elementos</button>
            </Link>
            <Link href='/game/Quiz'>
              <button>Quiz</button>
            </Link>
          </div>
        </>
      )}
    </>
  )

  function handleFamilySelected(nameFamily: string) {

    if (itemsInGameInformation.length === 0) return false;

    const indexItemInGame = itemsInGameInformation.findIndex(
      item => item.name === nameFamily
    )

    if (indexItemInGame === -1) {
      return false
    }

    return true
  }

  return (
    <main id={styles.mainContent}>
      <Head>
        <title>{capitalizeFirstLetter(infoAlphabet.name)} - KaraGame</title>
      </Head>
      <section className={styles.infoFamily}>
        <div className={styles.info}>
          <div className={styles.title}>
            <h1>{infoAlphabet.name}</h1>
            <p>ひらがな</p>
          </div>
          <div className={styles.textContainer}>
            <h3>Mas o que é o Hiragana? 🤔</h3>
            <p>Hiragana (平仮名) é um dos alfabetos
              da língua japonesa. Utilizamos ele para
              todas as palavras para as quais não há
              kanji. Também é usado nas terminações
              dos verbos e dos adjetivos (as famosas
              partículas) importantíssimas para o
              entendimento da língua.
            </p>
          </div>
          <div className={styles.gameButtons}>
            {HowDoYouWantToStudy}
          </div>
        </div>
        <div className={styles.lineDivider}>
          <hr />
        </div>
      </section>
      <section className={styles.itemsGame}>
        <div className={styles.textInfoGame}>
          <h2>O que vamos estudar?</h2>
          <p>Selecione quais famílias (colunas da tabela) você deseja estudar?</p>
          <p>Geralmente a tabela é utilizada para memorização!</p>
        </div>

        <div className={styles.containerItems}>
          {dataAlphabet.map((family, indexFamily) => (
            <>
              {handleFamilySelected(family.name) ? (
                <button key={`${family.name}_${indexFamily}_s`}
                  className={styles.itemSelected}
                  onClick={() => selectToggleItemGame(family.name, family.characters)}
                >
                  <FontAwesomeIcon icon='check-circle' />
                  <p>{family.name}</p>
                </button>
              ) : (
                <button key={`${family.name}_${indexFamily}_s`}
                  className={styles.item}
                  onClick={() => selectToggleItemGame(family.name, family.characters)}
                >
                  <FontAwesomeIcon icon='circle' />
                  <p>{family.name}</p>
                </button>
              )}
            </>
          ))}
        </div>
        <p className={styles.quantItemsSelected}>
          {itemsInGameInformation.length} selecionados
        </p>
      </section>
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get(`/alphabets/`)

  const paths = data.map(alphabet => {
    return {
      params: {
        slug: alphabet.id
      }
    }
  })

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params

  const { data } = await api.get(`/alphabets/${slug}`)

  const elementsAlphabetArray = Object.entries(data.alphabet)

  const dataAlphabet: DataAlphabet[] = elementsAlphabetArray.map(alphabet => {
    return {
      name: alphabet[0],
      characters: alphabet[1]
    }
  })

  return {
    props: {
      infoAlphabet: {
        name: data.id,
        infoText: data.info
      },
      dataAlphabet
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}