import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';
import { Button } from '../../components/Button';
import { useItemsGame } from '../../hooks/useItemsGame';
import { useTheme } from '../../hooks/useTheme';

import { api } from '../../services/api';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';

import styles from './styles.module.scss';

type DataAlphabet = {
  name: string;
  characters: any;
};

type AlphabetProps = {
  infoAlphabet: {
    name: string,
    infoText: string
  },
  dataAlphabet: DataAlphabet[];
};


export default function Alphabet({ dataAlphabet, infoAlphabet }: AlphabetProps) {

  const {
    theme
  } = useTheme();

  const {
    itemsInGameInformation,
    selectToggleItemGame,
    resetItemsInGame
  } = useItemsGame();

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const dataCookiesInformation = Cookies.getJSON('KaraGameInformation');

    if (dataCookiesInformation.nameAlphabet !== slug) {
      Cookies.set('KaraGameInformation', JSON.stringify({
        nameAlphabet: slug,
        itemsAlphabetInGame: []
      }));

      resetItemsInGame();
    }
  }, []);

  const HowDoYouWantToStudy = (
    <>
      {itemsInGameInformation.length >= 1 && (
        <div key={`div-select-game`} className={styles.gameButtons}>
          <p>Selecione um jogo:</p>
          <div className={styles.buttonsGame}>
            <Link href='/game/matching-elements'>
              <a><Button>Relacionar elementos</Button></a>
            </Link>
            <Link href='/game/quiz'>
              <a><Button>Quiz</Button></a>
            </Link>
          </div>
        </div>
      )}
    </>
  );

  function handleFamilySelected(nameFamily: string) {

    if (itemsInGameInformation.length === 0) return false;

    const indexItemInGame = itemsInGameInformation.findIndex(
      item => item.name === nameFamily
    );

    if (indexItemInGame === -1) {
      return false;
    }

    return true;
  }

  return (
    <main className={`${styles.mainContent}
      ${theme === 'light' ? styles.mainContentLight : styles.mainContentDark}
    `}>
      <Head>
        <title>{capitalizeFirstLetter(infoAlphabet.name)} - KaraGame</title>
      </Head>
      <section className={styles.infoFamily}>
        <div className={styles.info}>
          <div className={styles.title}>
            <h1>{capitalizeFirstLetter(infoAlphabet.name)}</h1>
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
          {HowDoYouWantToStudy}
        </div>
        <hr className={styles.lineDivider} />
      </section>
      <section className={styles.itemsGame}>
        <div className={styles.textInfoGame}>
          <h2>O que vamos estudar?</h2>
          <p>Selecione quais famílias (colunas da tabela) você deseja estudar?</p>
          <p>Geralmente a tabela é utilizada para memorização!</p>
        </div>

        <div className={styles.containerItems}>
          {dataAlphabet.map((family, indexFamily) => (
            <Fragment key={indexFamily}>
              {handleFamilySelected(family.name) ? (
                <Button key={`${family.name}_selected`}
                  onClick={() => selectToggleItemGame(family.name, family.characters)}
                  isSelected
                >
                  <FontAwesomeIcon icon='check-circle' />
                  <p>{family.name}</p>
                </Button>
              ) : (
                <Button key={`${family.name}`}
                  onClick={() => selectToggleItemGame(family.name, family.characters)}
                >
                  <FontAwesomeIcon icon='circle' />
                  <p>{family.name}</p>
                </Button>
              )}
            </Fragment>
          ))}
        </div>
        <p className={styles.quantItemsSelected}>
          {itemsInGameInformation.length} selecionados
        </p>
      </section>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get(`/alphabets/`);

  const paths = data.map(alphabet => {
    return {
      params: {
        slug: alphabet.id
      }
    };
  });

  return {
    paths,
    fallback: 'blocking'
  };
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;

  const { data } = await api.get(`/alphabets/${slug}`);

  const elementsAlphabetArray = Object.entries(data.alphabet);

  const dataAlphabet: DataAlphabet[] = elementsAlphabetArray.map(alphabet => {
    return {
      name: alphabet[0],
      characters: alphabet[1]
    };
  });

  return {
    props: {
      infoAlphabet: {
        name: data.id,
        infoText: data.info
      },
      dataAlphabet
    },
    revalidate: 60 * 60 * 24 // 24 hours
  };
}