import Masthead from './components/Masthead.jsx';
import TheCase from './components/TheCase.jsx';
import Boundaries from './components/Boundaries.jsx';
import Actions from './components/Actions.jsx';
import SubmitForm from './components/SubmitForm.jsx';
import Testimonials from './components/Testimonials.jsx';
import Footer from './components/Footer.jsx';
import Cursor from './components/Cursor.jsx';

export default function App() {
  return (
    <>
      <Cursor />
      <Masthead />
      <main className="wrap">
        <TheCase />
        <Testimonials />
          <Actions />
          <Boundaries />
        <SubmitForm />
      </main>
      <Footer />
    </>
  );
}
