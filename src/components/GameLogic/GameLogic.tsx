import { useEffect, useState } from 'react';
import { GuessHandler, RegistrationHandler, GameCreationHandler, Attempt, GuessRequest, GuessResponse, RegisterRequest, RegisterResponse, CreateGameResponse} from '../../types';
import { postRequest, registerURL, createGameURL, guessURL } from '../../api';
import { validWords } from '../../words';

export function useGameLogic() {
  const VICTORY = 'GGGGG';

  const [userid, setUserid] = useState<string>(() => localStorage.getItem('userid') || '');
  const [attempts, setAttempts] = useState<Array<Attempt>>(() => {
    const storedAttempts = localStorage.getItem('attempts');
    return storedAttempts ? JSON.parse(storedAttempts) : [];
  });
  const [registered, setRegistered] = useState<boolean>(() => {
    const storedRegistered = localStorage.getItem('registered');
    return storedRegistered ? JSON.parse(storedRegistered) : false;
  });
  const [created, setCreated] = useState<boolean>(() => {
    const storedCreated = localStorage.getItem('created');
    return storedCreated ? JSON.parse(storedCreated) : false;
  });
  const [gameLost, setGameLost] = useState<boolean>(() => {
    const storedGameLost = localStorage.getItem('gameLost');
    return storedGameLost ? JSON.parse(storedGameLost) : false;
  });
  const [gameWon, setGameWon] = useState<boolean>(() => {
    const storedGameWon = localStorage.getItem('gameWon');
    return storedGameWon ? JSON.parse(storedGameWon) : false;
  });
  const [answer, setAnswer] = useState<string>(() => localStorage.getItem('answer') || '');

  const resetAttempts = () => setAttempts([]);

  const saveStateToLocalStorage = () => {
    localStorage.setItem('userid', userid);
    localStorage.setItem('attempts', JSON.stringify(attempts));
    localStorage.setItem('registered', JSON.stringify(registered));
    localStorage.setItem('created', JSON.stringify(created));
    localStorage.setItem('gameLost', JSON.stringify(gameLost));
    localStorage.setItem('gameWon', JSON.stringify(gameWon));
    localStorage.setItem('answer', answer);
  };

  useEffect(() => {
    saveStateToLocalStorage();
  }, [userid, attempts, registered, created, gameLost, gameWon, answer]);

  const register: RegistrationHandler = async (username) => {
    const request: RegisterRequest = { name: username, mode: 'wordle' };
    const response = await postRequest(registerURL, request);

    if (response.status !== 201) throw new Error(await response.text());
    setRegistered(true);
    resetAttempts();
    const data = (await response.json()) as RegisterResponse;
    setUserid(data.id);
    return data;
  };

  const createGame: GameCreationHandler = async (createGameRequest) => {
    const response = await postRequest(createGameURL, createGameRequest);

    if (response.status !== 201) throw new Error(await response.text());
    setCreated(true);
    resetAttempts();
    return (await response.json()) as CreateGameResponse;
  };

  const isValidWord = (guess: string) => {
    return validWords.includes(guess.toLowerCase());
  };

  const submitGuess: GuessHandler = async (guess) => {
    const request: GuessRequest = { id: userid, guess };
    if (!isValidWord(guess)) {
      console.log('The word is not in the valid word set. Please try again.');
      return { feedback: 'invalid', answer: '' } as GuessResponse;
    }

    const response = await postRequest(guessURL, request);

    if (response.status === 422) setGameLost(true);
    const data = (await response.json()) as GuessResponse;

    setAttempts([...attempts, { guess, feedback: data.feedback }]);
    if (data.feedback === VICTORY) setGameWon(true);
    setAnswer(data.answer ?? '');
    return data;
  };

  return {setUserid, userid, registered, created, gameLost, gameWon, answer, attempts, register, createGame, submitGuess, resetAttempts,};
}
