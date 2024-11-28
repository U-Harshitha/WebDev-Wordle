import { useState } from 'react';
import { GuessHandler, RegistrationHandler, GameCreationHandler, Attempt, GuessRequest, GuessResponse, RegisterRequest, RegisterResponse, CreateGameResponse } from '../../types';
import { postRequest, registerURL, createGameURL, guessURL } from '../../api';
import { validWords } from '../../words'
export function useGameLogic() {
  const [userid, setUserid] = useState('');
  const [attempts, setAttempts] = useState<Array<Attempt>>([]);
  const [registered, setRegistered] = useState(false);
  const [created, setCreated] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [answer, setAnswer] = useState('');
  const VICTORY = 'GGGGG';

  const resetAttempts = () => setAttempts([]);

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
      console.log("The word is not in the valid word set. Please try again.");
      return { feedback: "invalid", answer: "" } as GuessResponse;
    }
  
    const response = await postRequest(guessURL, request);

    if (response.status === 422) setGameLost(true);
    const data = (await response.json()) as GuessResponse;

    setAttempts([...attempts, { guess, feedback: data.feedback }]);
    if (data.feedback === VICTORY) setGameWon(true);
    setAnswer(data.answer ?? '');
    return data;
  };

  return { setUserid, userid, registered, created, gameLost, gameWon, answer, attempts, register, createGame, submitGuess, resetAttempts };
}
