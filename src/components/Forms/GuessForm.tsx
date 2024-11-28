import { ChangeEvent, FormEvent, useState } from 'react';
import { GuessHandler } from '../../types';

export default function GuessForm({ submitGuess }: { submitGuess: GuessHandler }) {
  const [guess, setGuess] = useState('');
  const [error, setError] = useState<string | null>(null); 

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null); 
    try {
      const result = await submitGuess(guess);

      if (result.feedback === "invalid") {
        setError("The word is not in the valid word set. Please try again.");
      } else {
        setGuess(""); 
      }
    } catch (err) {
      setError("An unknown error occurred.");
    }
  }

  function handleTextInputChange(e: ChangeEvent<HTMLInputElement>) {
    setGuess(e.target.value);
    setError(null); 
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={guess}
        onChange={handleTextInputChange}
        placeholder="Enter your guess"
      />
      <button type="submit">Guess!</button>
      {error && <p style={{ color: 'red' }}>{error}</p>} 
    </form>
  );
}
