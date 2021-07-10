import Image from 'next/image';
import { useTheme } from '../hooks/useTheme';
import { Button } from '../components/Button';

import styles from '../styles/index.module.scss';
import Head from 'next/head';

export default function Home() {

  const {
    theme
  } = useTheme();

  return (
    <>
      <Head><title>Home - KaraGame</title></Head>
      <main id={styles.mainContent} className={theme === 'light' ?
        styles.mainLight : styles.mainDark
      }>

        <section className={styles.firstSection}>
          <div className={styles.textContainer}>
            <h1>KaraGame</h1>
            <p className={styles.firstParagraph}>O site tem como objetivo auxiliar no começo do seu estudo da língua japonesa.
              Queremos condensar algumas informações úteis para quem está
              iniciando nessa jornada, assim como nós.
            </p>
            <strong className={styles.firstParagraph}>Mas por onde devo começar a estudar? 🤔</strong>
            <p>Essa é uma das dúvidas mais frequente de quem está começando e a
              resposta é:
            </p>
            <p>O primeiro passo é aprender os alfabetos básicos da língua: o Hiragana
              e o Katakana. Eles fazem parte da escrita japonesa.<br />
              Eu sei, pode parecer complicado, mas não é um bicho de sete cabeças.
            </p>
          </div>

          <div className={styles.imgContainer}>
            <Image src='/questions.svg' alt="Imagem de perguntas na Home"
              width='600px' height='422px'
            />
          </div>
        </section>
        <p className={styles.fourthParagraph}>Pode também não parecer tão interessante no começo, mas quando você conseguir ler o nome do seu anime favorito ou o nome
          daquela abertura garanto que será muito gratificante.</p>
        <p>Vamos começar então?</p>
        <div className={styles.buttons}>
          <strong>Divirta-se iniciando seus estudos! 🧠</strong>
          <div className={styles.buttonsGame}>
            <a href="/alphabet/hiragana"><Button>Hiragana</Button></a>
            <a href="/alphabet/katakana"><Button>Katakana</Button></a>
          </div>
        </div>
      </main>
    </>
  );
}
