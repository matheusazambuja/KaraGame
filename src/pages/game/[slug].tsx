import { useRouter } from "next/router";
import MatchingGame from "../../components/Games/MatchingGame";
import Quiz from "../../components/Games/Quiz";


export default function Game() {
  const router = useRouter();
  const { slug } = router.query;

  const isComponentMatchingGame = slug === 'matching-elements';
  const isComponentQuiz = slug === 'quiz';

  return (
    <>
      {isComponentMatchingGame && (
        <MatchingGame />
      )}
      {isComponentQuiz && (
        <Quiz />
      )}
    </>
  );
}