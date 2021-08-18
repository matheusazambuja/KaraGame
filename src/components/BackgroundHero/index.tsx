import styles from './styles.module.scss';

type BackgroundHeroProps = {
  svgHero: any;
}

export function BackgroundHero({ svgHero }: BackgroundHeroProps) {
  return (
    <div className={styles.relative}>
      <div className={styles.bgHero}>
        {svgHero}
      </div>
    </div>
  );
}