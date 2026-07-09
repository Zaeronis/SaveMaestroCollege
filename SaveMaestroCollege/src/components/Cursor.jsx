import { useEffect, useState } from 'react';
import './Cursor.css';

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    const down = () => setActive(true);
    const up = () => setActive(false);

    const over = (e) => {
      if (e.target.closest('a, button, input, textarea, [role="button"], label[for]')) {
        document.body.classList.add('cursor-hover');
      }
    };
    const out = (e) => {
      if (e.target.closest('a, button, input, textarea, [role="button"], label[for]')) {
        document.body.classList.remove('cursor-hover');
      }
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    window.addEventListener('mouseover', over);
    window.addEventListener('mouseout', out);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mouseout', out);
    };
  }, []);

  return (
    <div
      className={`cursor-wrapper ${active ? 'active' : ''}`}
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
      }}
    >
      <div className="cursor-glass" />
    </div>
  );
}
