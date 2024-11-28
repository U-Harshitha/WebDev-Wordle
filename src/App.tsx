// App.tsx
import { useGameLogic } from './components/GameLogic/GameLogic';
import GuessForm from './components/Forms/GuessForm';
import './App.css';
import AttemptHistory from './components/Attempt/AttemptHistory';
import CreateForm from './components/Forms/CreateForm';
import RegistrationForm from './components/Forms/RegistrationForm';
import Header from './components/Header/Header';
import './App.css';
import { CONGRATULATIONS_MESSAGE, TRY_AGAIN_MESSAGE, CREATE_NEW_GAME, REGISTER_YOURSELF, CREATE_GAME_FIRST, REGISTER_FIRST } from './textAssets/English';
function App() {
  const {
    setUserid,
    userid,
    registered,
    created,
    gameLost,
    gameWon,
    answer,
    attempts,
    register,
    createGame,
    submitGuess,
  } = useGameLogic();

  const gameOver = gameWon || gameLost;

  return (
    <div>
      <Header title="Wordle" />
      <AttemptHistory attempts={attempts} />
      {gameWon && <Header title={`${CONGRATULATIONS_MESSAGE} ${answer}`} />}
      {gameLost && <Header title={`${TRY_AGAIN_MESSAGE} ${answer}`} />}
      <Header
        title={created && !gameOver ? 'Guess' : registered ? `${CREATE_GAME_FIRST}` : `${REGISTER_YOURSELF}`}
      />
      {!gameOver && (created ? <GuessForm submitGuess={submitGuess} /> : registered ? `${CREATE_NEW_GAME}` : `${REGISTER_FIRST}`)}
      {registered ? (
        <CreateForm userid={userid} createGame={createGame} />
      ) : (
        <RegistrationForm register={register} setUserid={setUserid} />
      )}
    </div>
  );
}

export default App;
