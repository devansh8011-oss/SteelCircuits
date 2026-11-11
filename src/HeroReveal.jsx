import { useRef, useState, useEffect } from 'react';
import profileImg from './assets/profile.jpg';
import './HeroReveal.css';

export default function HeroReveal() {
  const stageRef = useRef(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduce(m.matches);
    sync();
    m.addEventListener('change', sync);
    return () => m.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const section = stageRef.current?.parentElement;
    const runway = section?.parentElement;
    if (!section || !runway) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const pinDist = Math.max(1, runway.offsetHeight - vh);
      const p = Math.min(1, Math.max(0, -runway.getBoundingClientRect().top / pinDist));
      const e = p * p;
      section.style.filter = `brightness(${(1 - e * 0.55).toFixed(3)})`;
      section.style.visibility = p >= 1 ? 'hidden' : 'visible';
      section.style.pointerEvents = p > 0.5 ? 'none' : '';
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      if (raf) cancelAnimationFrame(raf);
      section.style.transform = '';
      section.style.filter = '';
      section.style.visibility = '';
      section.style.pointerEvents = '';
    };
  }, [reduce]);

  return (
    <section className="reveal-section" aria-label="Featured portrait">
      <div ref={stageRef} className="reveal">
        {/* Single primary photo: Devansh Grover from SteelCircuits repo, no cover image */}
        <img
          className="reveal-img reveal-base"
          src={profileImg}
          alt="Devansh Grover portrait"
          draggable="false"
        />

        {/* Subtle scrims so navigation stays legible */}
        <span className="reveal-scrim reveal-scrim-top" aria-hidden="true" />
        <span className="reveal-scrim reveal-scrim-bottom" aria-hidden="true" />
      </div>
    </section>
  );
}
