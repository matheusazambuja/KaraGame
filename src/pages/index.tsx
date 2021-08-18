import Image from 'next/image';
import { useTheme } from '../hooks/useTheme';
import { Button } from '../components/Button';

import styles from '../styles/index.module.scss';
import Head from 'next/head';
import { BackgroundHero } from '../components/BackgroundHero';

export default function Home() {

  return (
    <>
      <Head><title>Home - KaraGame</title></Head>

      <BackgroundHero
        svgHero={<img src='/bgHero.svg' alt="Imagem Background da página" />}
      />

      <main id={styles.mainContent}>
        <h1>KaraGame</h1>
        <h2 className={styles.subParagraph}>Aprenda de forma simples</h2>

        <h4>Auxiliando no começo dos seus estudos na língua japonesa</h4>
        <h4 className={styles.secondParagraph}>Nosso objetivo é condensar algumas dicas e informações úteis para quem está iniciando nessa nova língua</h4>

        <div className={styles.imgContainer}>
          <Image src='/questions.svg' alt="Imagem de perguntas na Home"
            width='457px' height='322px'
          />
        </div>
        <div className={styles.buttons}>
          <h2>Comece por:</h2>
          <div className={styles.buttonsGame}>
            <Button>Alfabetos</Button>
            <a href="/alphabet/particulas"><Button>Partículas</Button></a>
            <a href="/alphabet/kanjis"><Button>Kanjis</Button></a>
          </div>
        </div>
      </main>
    </>
  );
}
