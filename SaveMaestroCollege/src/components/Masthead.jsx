import testimonials from '../data/testimonials.json';
import './Masthead.css';

const NAV = [
  ['#case', 'The case'],
  ['#testimonials', 'Student testimonies'],
  ['#submit', 'Add yours'],
  ['#actions', 'How to help'],
  ['#boundaries', 'What this is not'],
];

export default function Masthead() {
  const count = testimonials.filter((e) => !e.sample && e.verified).length;
  return (
    <header className="mast">
      <div className="mast-inner">
        <p className="kicker">
          <span>Student-Created</span><span className="dot" />
          <span>Independent Advocacy</span><span className="dot" />
          {count > 0
            ? <span>{count} Student Testimonies Documented</span>
            : <span>Student-Led Case for AI-Native Instruction</span>}
        </p>
        <h1>AI-powered learning,<br />student-validated testimonies.</h1>
        <p className="sub">
          In response to the recent ruling against Maestro College, this independent,
          student-led initiative presents undeniable proof of our model's success.
          We're collecting these testimonies in an effort to show that the ongoing
          evaluation of Maestro College should remain centered on what truly matters:
          objective competency and proven student results.
        </p>
        <nav className="bar" aria-label="Section navigation">
          {NAV.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </nav>
      </div>
    </header>
  );
}
