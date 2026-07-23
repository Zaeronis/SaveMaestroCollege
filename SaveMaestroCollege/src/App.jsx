import { useEffect } from 'react';
import Masthead from './components/Masthead.jsx';
import TheCase from './components/TheCase.jsx';
import Boundaries from './components/Boundaries.jsx';
import Actions from './components/Actions.jsx';
import SubmitForm from './components/SubmitForm.jsx';
import Testimonials from './components/Testimonials.jsx';
import Petition from './components/Petition.jsx';
import Footer from './components/Footer.jsx';
import Cursor from './components/Cursor.jsx';
import { Analytics } from "@vercel/analytics/react"

export default function App() {
  useEffect(() => {
    // Force scroll to top on mount
    window.scrollTo(0, 0);
    
    // Also handle cases where the browser might try to restore scroll position
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Clear hash on reload to prevent jumping to a section
    if (window.location.hash) {
      window.history.replaceState(null, null, window.location.pathname);
    }
  }, []);

  return (
    <>
      <Analytics />
      <Cursor />
      <Masthead />
      <main className="wrap">
        <TheCase />
        <Testimonials />
        <Petition />
          <Actions />
          <Boundaries />
        <SubmitForm />
      </main>
      <Footer />
    </>
  );
}
