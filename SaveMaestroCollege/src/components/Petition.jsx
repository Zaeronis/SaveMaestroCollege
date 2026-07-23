import './Petition.css';

export default function Petition() {
  return (
    <section id="petition">
      <p className="eyebrow"><span className="num">03</span> Support the Petition</p>
      <h2>Add your voice to the official student petition.</h2>
      <p className="lead">
        Another student has started a petition to amplify our collective concerns. 
        If you haven't already, please consider signing and sharing this to ensure our message is heard by the administration.
      </p>
      <div className="petition-action">
        <a 
          href="https://c.org/GqLtwdv7xc" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="petition-link"
        >
          Sign the Petition
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>
      </div>
    </section>
  );
}
