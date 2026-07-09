import { actions } from '../data/actions.js';
import './Actions.css';

export default function Actions() {
  return (
    <section id="actions">
      <p className="eyebrow"><span className="num">03</span> How to help</p>
      <h2>Student-led strategic action.</h2>
      <p className="lead">
        Coordinated leverage points for student-driven advocacy, ordered by systemic impact.
      </p>
      <div className="acts">
        {actions.map((a, i) => (
          <div className={`act ${a.tone}`} key={i}>
            <span className="tag">{a.tag}</span>
            <h3>{a.h}</h3>
            <p className="fine">{a.p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
