import { config } from '../lib/config.js';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <h3>About this effort</h3>
        <p>
          This is a 100% independent, student-created and led advocacy platform. It is not affiliated with,
          authorized by, or endorsed by Maestro College, its accreditors, or any regulatory body.
        </p>
        <div className="disc">
          <p className="fine">
            <strong>Before you organize others:</strong> confirm your own financial-aid status and
            pull your transcript, and make sure everyone you recruit does the same. Rulemaking takes
            years and will not affect any active accreditation review — protect your own path first.
          </p>
        </div>
        <h3 style={{ marginTop: '26px' }}>Testimony governance</h3>
        <p>Participants may request the correction or removal of their documented testimonies at any time by contacting the maintainer.</p>
        <h3 style={{ marginTop: '26px' }}>Contact</h3>
        <p>Reach the maintainer at <span className="mono">{config.maintainerEmail}</span></p>
      </div>
    </footer>
  );
}
