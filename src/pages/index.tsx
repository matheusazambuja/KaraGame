import Image from 'next/image';
import { Button } from '../components/Button';

import styles from '../styles/index.module.scss';
import Head from 'next/head';
import { BackgroundHero } from '../components/BackgroundHero';

import { BgHeroHome } from '../components/IconComponents/BgHeroHome';
import Link from 'next/link';

export default function Home() {

  return (
    <>
      <Head><title>Home - KaraGame</title></Head>

      <BackgroundHero svgHero={<BgHeroHome />} />

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
            <button className={styles.buttonAlphabets}>
              Alfabetos
              <p>Jogue aprendendo os alfabetos básicos da língua japonesa: Hiragana e Katakana</p>
              <div className={styles.buttonsAlphabets}>
                <Link href={"/alphabet/hiragana"}><button>Hiragana</button></Link>
                <Link href={"/alphabet/katakana"}><button>Katakana</button></Link>
              </div>
            </button>
            <a href="/particulas">
              <button className={styles.buttonParticulas}>
                Partículas
                <p>Entenda as partículas com exemplos de usos</p>
              </button>
            </a>
            <a href="/kanjis">
              <button className={styles.buttonKanjis}>
                Kanjis
                <p>Estude os kanjis em conjunto para simplificá-los e decorar de forma mais efetiva</p>
              </button>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
