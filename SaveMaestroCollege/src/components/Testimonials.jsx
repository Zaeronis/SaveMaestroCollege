import testimonials from '../data/testimonials.json';
import './Testimonials.css';

export default function Testimonials() {
  const record = testimonials.filter((e) => !e.sample);
  const count = record.length;

  return (
    <section id="testimonials">
      <p className="eyebrow"><span className="num">02</span> Student Testimonies</p>
      <h2>True validation is found in personal experience.</h2>
      <p className="lead">
        This record is built and maintained by students to validate Maestro&rsquo;s mission through technical testimonies.
        The accounts below serve as a transparent, empirical audit of the curriculum&rsquo;s success from the student perspective.
      </p>
      <p className="count">
        {count === 0
          ? 'No published testimonies yet — the sample shows the format.'
          : `${count} documented ${count === 1 ? 'testimony' : 'testimonies'} on the record.`}
      </p>
      <div className="cards">
        {testimonials.map((e) => (
          <figure className={`card${e.sample ? ' sample' : ''}`} key={e.no}>
            <div className="head">
              <div className="head-meta">
                <span className="no">#{e.no}</span>
                {e.verified && (
                  <span className="verified">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Authenticated
                  </span>
                )}
              </div>
              {e.skill && <span className="skill">{e.skill}</span>}
            </div>
            <blockquote>
              {String(e.outcome || '').split(/\n{2,}/).map((p, i) => <p key={i}>{p}</p>)}
            </blockquote>
            <figcaption>
              — {e.name || 'Anonymous'}
              {e.program && <span className="program">{e.program}</span>}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
