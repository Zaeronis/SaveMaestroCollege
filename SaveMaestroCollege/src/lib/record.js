import { clean } from './sanitize.js';

// Testimonials here are REFORM EVIDENCE: what/how a student learned in an
// AI-native program, as the lived case for modernizing the rule.
export function buildRecordText(fields) {
  const today = new Date().toISOString().slice(0, 10);
  const f = {
    name: clean(fields.name, 120) || 'Anonymous',
    program: clean(fields.program, 140) || '(not given)',
    skill: clean(fields.skill, 200) || '(not given)',
    outcome: clean(fields.outcome, 3000),
    contact: clean(fields.contact, 160) || '(not given — not published)',
  };
  const text =
`STUDENTS FOR AI-NATIVE LEARNING — SUBMITTED ACCOUNT
---------------------------------------------------
Name for the record : ${f.name}
Program / school     : ${f.program}
Skill or testimony   : ${f.skill}
Filed                : ${today}
Verification contact : ${f.contact}
Consent to publish   : YES

WHAT & HOW I LEARNED
${f.outcome}
`;
  return { today, text, fields: f };
}
