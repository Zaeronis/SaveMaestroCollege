import { boundaries } from '../data/argument.js';
import './Boundaries.css';

export default function Boundaries() {
  return (
    <section id="boundaries">
      <p className="eyebrow"><span className="num">04</span> What this is not</p>
      <h2>The lines that keep this credible.</h2>
      <p className="lead">
        This argument only works if it stays honest about its own limits. Overreach is what gets a
        reform case discounted — so here is exactly what it does and doesn&rsquo;t claim.
      </p>
      <ul className="bounds">
        {boundaries.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
    </section>
  );
}
