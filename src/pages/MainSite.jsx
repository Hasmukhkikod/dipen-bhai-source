import { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../sections/Hero';
import TrustBar from '../sections/TrustBar';
import About from '../sections/About';
import Expertise from '../sections/Expertise';
import Ecosystem from '../sections/Ecosystem';
import Work from '../sections/Work';
import Speaking from '../sections/Speaking';
import TechnicalDepth from '../sections/TechnicalDepth';
import Process from '../sections/Process';
import Contact from '../sections/Contact';
import Footer from '../components/Footer';

function MainSite() {
  useEffect(() => {
    let e = new IntersectionObserver(t => {
        t.forEach(t => {
          t.isIntersecting && (t.target.classList.add(`reveal-visible`), e.unobserve(t.target));
        });
      }, {
        root: null,
        rootMargin: `0px`,
        threshold: 0.05
      }),
      t = setTimeout(() => {
        document.querySelectorAll(`.reveal-element, .reveal-scale, .reveal-border-top, .reveal-border-left, .reveal-text-line, .reveal-laser-line`).forEach(t => e.observe(t));
      }, 100);
    return () => {
      clearTimeout(t);
      e.disconnect();
    };
  }, []);
  return <div style={{
    minHeight: `100vh`,
    display: `flex`,
    flexDirection: `column`
  }}>
      <Header />
      <main style={{
      flexGrow: 1
    }}>
        <Hero />
        <TrustBar />
        <About />
        <Expertise />
        <Ecosystem />
        <Work />
        <Speaking />
        <TechnicalDepth />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>;
}

export default MainSite;