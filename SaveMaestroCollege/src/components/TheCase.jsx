import { claim, claimSub, points } from '../data/argument.js';
import './TheCase.css';

export default function TheCase() {
  return (
    <section id="case">
      <p className="eyebrow"><span className="num">01</span> The case</p>
      <h2>{claim}</h2>
      <p className="lead">{claimSub}</p>
      <div className="points">
        {points.map((pt, i) => (
          <div className="point" key={i}>
            <span className="idx">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3>{pt.h}</h3>
              <p className="fine">{pt.p}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
