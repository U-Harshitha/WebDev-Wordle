import AttemptWithFeedback from './AttemptWithFeedback';
import { Attempt } from '../../types';

function AttemptHistory({ attempts }: { attempts: Array<Attempt> }) {
  return (
    <ol>
      {attempts.map((attempt, idx) => (
        <li key={idx}>
          <AttemptWithFeedback attempt={attempt} />
        </li>
      ))}
    </ol>
  );
}

export default AttemptHistory;
