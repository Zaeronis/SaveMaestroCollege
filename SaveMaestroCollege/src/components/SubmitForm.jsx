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

  useEffect(() => { if (isConfigured) emailjs.init({ publicKey: config.publicKey }); }, []);
  const update = (k) => (e) => setFields((f) => ({ ...f, [k]: e.target.value }));

  function validate() {
    const errs = {};
    if (!fields.outcome.trim()) errs.outcome = true;
    if (!consent) errs.consent = true;
    setInvalid(errs);
    if (errs.outcome) { setStatus({ kind: 'error', msg: 'Describe your technical journey before submitting.' }); return false; }
    if (errs.consent) { setStatus({ kind: 'error', msg: 'Please confirm the account is true and yours.' }); return false; }
    return true;
  }

  async function handleCopy() {
    if (!validate()) return;
    const { text } = buildRecordText(fields);
    setPreview(text);
    try {
      await navigator.clipboard.writeText(text);
      setStatus({ kind: 'ok', msg: 'Copied. Send it to the maintainer if sending isn\u2019t set up yet.' });
    } catch { setStatus({ kind: 'error', msg: 'Select the text below and copy it manually.' }); }
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
      });
      setStatus({ kind: 'ok', msg: 'Received. Thank you — the maintainer verifies and publishes with your consent.' });
      setFields(EMPTY); setConsent(false); setPreview(''); setInvalid({});
    } catch (err) {
      const detail = err && err.text ? err.text : 'network or config error';
      setStatus({ kind: 'error', msg: `Couldn\u2019t send (${detail}). Use "Copy account" as a backup.` });
    } finally { setSending(false); }
  }

  return (
    <section id="submit">
      <p className="eyebrow"><span className="num">05</span> Submit Your Testimony</p>
      <h2>Document your technical journey.</h2>
      <p className="lead">
        Join this student-led effort to provide objective testimonies for our collective advocacy. 
        Share a specific technical milestone achieved at Maestro to help illustrate the reality of our curriculum.
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
            <label htmlFor="program">Program / school
              <span className="hint">Where you studied, and at what level.</span>
            </label>
            <input type="text" id="program" value={fields.program} onChange={update('program')} maxLength={140} placeholder="e.g. Maestro College — AAS, AI Software Engineering" />
          </div>
        </div>

        <div className="field">
          <label htmlFor="skill">The skill or testimony, in one line
            <span className="hint">The headline: something you can do now that you couldn&rsquo;t before.</span>
          </label>
          <input type="text" id="skill" value={fields.skill} onChange={update('skill')} maxLength={200} placeholder="e.g. Built and deployed a full React app to production" />
        </div>

        <div className="field">
          <label htmlFor="outcome">Technical implementation and results <span className="req">*</span>
            <span className="hint">Maintain scholarly rigor. Use precise language to articulate how the AI-native environment fostered your technical growth.</span>
          </label>
          <textarea id="outcome" value={fields.outcome} onChange={update('outcome')} maxLength={3000}
                    required aria-required="true" aria-invalid={invalid.outcome || undefined}
                    placeholder="Before the program I couldn't ___. Through ___, I learned to ___. Now I can ___." />
        </div>

        <div className="field">
          <label htmlFor="contact">Private contact for verification
            <span className="hint">Not published. Only so the maintainer can confirm you&rsquo;re a real student.</span>
          </label>
          <input type="email" id="contact" value={fields.contact} onChange={update('contact')} maxLength={160} placeholder="you@example.com" />
        </div>

        <div className="check">
          <input type="checkbox" id="truth" checked={consent} onChange={(e) => setConsent(e.target.checked)}
                 required aria-required="true" aria-invalid={invalid.consent || undefined} />
          <label htmlFor="truth">
            This testimony is documented accurately. I consent to its inclusion in this empirical record,
            and I understand this is a student-led initiative to advocate for the 
            pedagogical mission of Maestro College.
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
