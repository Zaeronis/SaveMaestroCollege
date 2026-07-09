import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { config, isConfigured } from '../lib/config.js';
import { buildRecordText } from '../lib/record.js';
import './SubmitForm.css';

const EMPTY = { name: '', program: '', skill: '', outcome: '', contact: '' };

export default function SubmitForm() {
  const [fields, setFields] = useState(EMPTY);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState({ kind: '', msg: '' });
  const [preview, setPreview] = useState('');
  const [sending, setSending] = useState(false);
  const [invalid, setInvalid] = useState({});

  useEffect(() => {
    if (isConfigured) emailjs.init({ publicKey: config.publicKey });
  }, []);

  const update = (k) => (e) => setFields((f) => ({ ...f, [k]: e.target.value }));

  function validate() {
    const errs = {};
    if (!fields.outcome.trim()) errs.outcome = true;
    if (!consent) errs.consent = true;
    setInvalid(errs);

    if (errs.outcome) {
      setStatus({ kind: 'error', msg: 'Describe your technical journey before submitting.' });
      return false;
    }
    if (errs.consent) {
      setStatus({ kind: 'error', msg: 'Please confirm the account is true and yours.' });
      return false;
    }
    return true;
  }

  async function handleCopy() {
    if (!validate()) return;
    const { text } = buildRecordText(fields);
    setPreview(text);
    try {
      await navigator.clipboard.writeText(text);
      setStatus({ kind: 'ok', msg: 'Copied. Send it to the maintainer if sending isn\u2019t set up yet.' });
    } catch {
      setStatus({ kind: 'error', msg: 'Select the text below and copy it manually.' });
    }
  }

  async function handleSubmit() {
    if (!validate()) return;
    const built = buildRecordText(fields);
    if (!isConfigured) {
      setPreview(built.text);
      setStatus({ kind: 'error', msg: 'Sending isn\u2019t configured yet. Use "Copy account" and send it to the maintainer.' });
      return;
    }
    setSending(true);
    setStatus({ kind: 'info', msg: 'Sending\u2026' });
    try {
      await emailjs.send(config.serviceId, config.templateId, {
        name: built.fields.name,
        program: built.fields.program,
        skill: built.fields.skill,
        outcome: built.fields.outcome,
        contact: built.fields.contact,
        filed: built.today,
        consent: consent ? "Yes" : "No", // Sends explicit string status to the email template
      });
      setStatus({ kind: 'ok', msg: 'Received. Please check your school email for a confirmation request from the maintainer — response is required for publication.' });
      setFields(EMPTY); setConsent(false); setPreview(''); setInvalid({});
    } catch (err) {
      const detail = err && err.text ? err.text : 'network or config error';
      setStatus({ kind: 'error', msg: `Couldn\u2019t send (${detail}). Use "Copy account" as a backup.` });
    } finally { setSending(false); }
  }

  return (
      <section id="submit">
        <p className="eyebrow"><span className="num">05</span> Submit Your Testimony</p>
        <h2>Document your technical journey at Maestro.</h2>
        <p className="lead">
          For Maestro College students to document a concrete skill or project — what you
          built, and how the program got you there. Plain, specific, honest accounts make
          the strongest case. No need to dress it up.
        </p>

        <form className="rec-form" autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <div className="row">
            <div className="field">
              <label htmlFor="name">Name for the record
                <span className="hint">Your name, initials, or &ldquo;Anonymous.&rdquo;</span>
              </label>
              <input type="text" id="name" value={fields.name} onChange={update('name')} maxLength={120} placeholder="e.g. D.G. / Anonymous" />
            </div>
            <div className="field">
              <label htmlFor="program">Maestro Program & Level
                <span className="hint">Identify your specific cohort (e.g. AI Software Engineering, AAS).</span>
              </label>
              <input type="text" id="program" value={fields.program} onChange={update('program')} maxLength={140} placeholder="e.g. AI Software Engineering — AAS" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="skill">Maestro-Acquired Proficiency
              <span className="hint">The specific technical capability you developed through this curriculum.</span>
            </label>
            <input type="text" id="skill" value={fields.skill} onChange={update('skill')} maxLength={200} placeholder="e.g. Architected a multi-agent AI system for data analysis" />
          </div>

          <div className="field">
            <label htmlFor="outcome">What you built, and how <span className="req">*</span>
              <span className="hint">Be concrete and honest: what could you not do before, what did you learn, and what can you build now? Real specifics beat impressive-sounding language.</span>
            </label>
            <textarea id="outcome" value={fields.outcome} onChange={update('outcome')} maxLength={3000}
                      required aria-required="true" aria-invalid={invalid.outcome || undefined}
                      placeholder="Document how Maestro enabled you to master ___." />
          </div>

          <div className="field">
            <label htmlFor="contact">Maestro School Email Verification
              <span className="hint">
                A Maestro-provided school email is required. You will receive a confirmation 
                email from the maintainer that requires a response prior to publication.
              </span>
            </label>
            <input type="email" id="contact" value={fields.contact} onChange={update('contact')} maxLength={160} placeholder="student@maestrocollege.edu" />
          </div>

          <div className="check">
            <input type="checkbox" id="truth" checked={consent} onChange={(e) => setConsent(e.target.checked)}
                   required aria-required="true" aria-invalid={invalid.consent || undefined} />
            <label htmlFor="truth">
              I certify that I am a student of Maestro College. This testimony is an accurate reflection of my
              technical development and I consent to its inclusion in this independent student record.
            </label>
          </div>

          <div className="actions">
            <button type="button" className="btn" onClick={handleSubmit} disabled={sending}>
              {sending ? 'Sending\u2026' : 'Submit testimony'}
            </button>
            <button type="button" className="btn ghost" onClick={handleCopy}>Copy testimony (backup)</button>
          </div>

          <div className="status" role="status" aria-live="polite" data-kind={status.kind}>{status.msg}</div>
          {preview && <pre className="preview">{preview}</pre>}
        </form>
      </section>
  );
}