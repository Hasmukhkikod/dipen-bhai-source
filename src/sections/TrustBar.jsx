import { useEffect, useRef, useState } from 'react';
import { Award, Briefcase, Cpu, Mic, Rocket, Sprout } from 'lucide-react';
import { useContent } from '../context/ContentContext';

var statIcons = {
  "Years Experience": <Briefcase size={18} strokeWidth={1.5} />,
  "Years SLS Leadership": <Award size={18} strokeWidth={1.5} />,
  "Years at Qualcomm": <Cpu size={18} strokeWidth={1.5} />,
  "Animal Husbandry & Agritech": <Sprout size={18} strokeWidth={1.5} />,
  "Tech & Startup Talks": <Mic size={18} strokeWidth={1.5} />,
  "Startup Mentorship": <Rocket size={18} strokeWidth={1.5} />
};

var statDescriptions = {
  "Years Experience": `Product engineering, customized IoT integration.`,
  "Years SLS Leadership": `Orchestrating engineering processes and utility automation solutions.`,
  "Years at Qualcomm": `Snapdragon platform integration, driver validation, and cross-chipset BSP work.`,
  "Animal Husbandry & Agritech": `Founding and technical leadership across livestock IoT and sustainable farming ventures.`,
  "Tech & Startup Talks": `Faculty development programs, seminars, engineering lectures, and startup talks.`,
  "Startup Mentorship": `Mentoring founders through startup sessions and entrepreneurship council engagements.`
};

var brandLogos = {
  Qualcomm: <svg viewBox="0 0 120 30" width="115" height="24" className="partner-logo-svg" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4C7.6 4 4 7.6 4 12s3.6 8 8 8c1.8 0 3.5-.6 4.9-1.7l2.6 2.6 1.1-1.1-2.6-2.6C19.4 15.5 20 13.8 20 12c0-4.4-3.6-8-8-8zm0 13.6c-3.1 0-5.6-2.5-5.6-5.6s2.5-5.6 5.6-5.6 5.6 2.5 5.6 5.6-2.5 5.6-5.6 5.6zm15.2-12v12h3.2v-4.8h4.8v4.8h3.2V5.6H35.2v4.8h-4.8V5.6h-3.2zm18.4 0v12h8v-3.2h-4.8v-8h-3.2zm12 0v12h3.2V5.6h-3.2zm8.8 0l2.4 4.8 2.4-4.8h-4.8zm1.6 8v4h3.2v-4h-3.2z" fill="currentColor" />
        <text x="82" y="17" fontFamily="var(--font-sans)" fontWeight="800" fontSize="11.5" fill="currentColor" letterSpacing="-0.02em">{`Qualcomm`}</text>
      </svg>,
  "System Level Solutions": <svg viewBox="0 0 150 30" width="140" height="24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="partner-logo-svg" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 8 L18 3 L28 8 L18 13 Z" fill="currentColor" opacity="0.3" />
        <path d="M8 14 L18 9 L28 14 L18 19 Z" fill="currentColor" opacity="0.6" />
        <path d="M8 20 L18 15 L28 20 L18 25 Z" fill="currentColor" />
        <text x="36" y="15" fontFamily="var(--font-sans)" fontWeight="800" fontSize="11" fill="currentColor" letterSpacing="-0.01em" stroke="none">{`System Level`}</text>
        <text x="36" y="24" fontFamily="var(--font-sans)" fontWeight="500" fontSize="7.8" fill="currentColor" letterSpacing="0.08em" stroke="none" opacity="0.7">{`SOLUTIONS`}</text>
      </svg>,
  "Nebulae IoT": <svg viewBox="0 0 120 30" width="115" height="24" className="partner-logo-svg" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 18a3.5 3.5 0 0 1-1.2-6.7 4.5 4.5 0 0 1 8.5-1.5 3 3 0 0 1 2.2 6.2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="12" cy="14" r="1.2" fill="currentColor" />
        <circle cx="20" cy="10" r="1.2" fill="currentColor" />
        <text x="28" y="17" fontFamily="var(--font-sans)" fontWeight="800" fontSize="12" fill="currentColor" letterSpacing="-0.01em">{`Nebulae`}</text>
        <text x="76" y="17" fontFamily="var(--font-sans)" fontWeight="800" fontSize="12" fill="currentColor" letterSpacing="-0.01em" opacity="0.8">{`IoT`}</text>
      </svg>,
  ME2MILLET: <svg viewBox="0 0 120 30" width="115" height="24" className="partner-logo-svg" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 22 V5 M10 9 Q5 5, 5 11 M10 9 Q15 5, 15 11 M10 15 Q5 11, 5 17 M10 15 Q15 11, 15 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        <text x="22" y="17" fontFamily="var(--font-sans)" fontWeight="900" fontSize="11" fill="currentColor" letterSpacing="0.04em">{`ME2MILLET`}</text>
      </svg>,
  LibreRouter: <svg viewBox="0 0 120 30" width="115" height="24" className="partner-logo-svg" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 20 V8 h9a3.5 3.5 0 0 1 0 7 H9 M11 15 L18 20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <text x="24" y="17" fontFamily="var(--font-sans)" fontWeight="800" fontSize="12" fill="currentColor" letterSpacing="-0.02em">{`LibreRouter`}</text>
      </svg>,
  "i-Hub Gujarat": <svg viewBox="0 0 120 30" width="115" height="24" className="partner-logo-svg" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="15" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="10" cy="15" r="2" fill="currentColor" />
        <circle cx="10" cy="8" r="1.2" fill="currentColor" />
        <circle cx="10" cy="22" r="1.2" fill="currentColor" />
        <circle cx="3" cy="15" r="1.2" fill="currentColor" />
        <circle cx="17" cy="15" r="1.2" fill="currentColor" />
        <text x="24" y="17" fontFamily="var(--font-sans)" fontWeight="800" fontSize="12" fill="currentColor" letterSpacing="-0.01em">{`i-Hub`}</text>
        <text x="56" y="17" fontFamily="var(--font-sans)" fontWeight="400" fontSize="10.5" fill="currentColor" opacity="0.7">{`Gujarat`}</text>
      </svg>
};

function ShowcaseMarquee({ title, items, renderItem, emptyMessage, loop = true }) {
  const copies = loop ? [0, 1] : [0];
  return (
    <div className="showcase-band">
      <div className="showcase-band-heading">
        <span className="showcase-heading-rule" />
        <h3>{title}</h3>
        <span className="showcase-heading-rule" />
      </div>
      {items.length ? (
        <div className={`scroll-mask-wrapper${loop ? '' : ' showcase-static-wrapper'}`}>
          <div className="marquee-track">
            {copies.map((copy) => (
              <div className={loop ? 'marquee-content' : 'marquee-content showcase-static-content'} key={copy} aria-hidden={copy === 1}>
                {items.map((item, index) => (
                  <div className="showcase-card" key={`${copy}-${item.id || item.name || item.title || index}`}>
                    {renderItem(item)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : <p className="showcase-empty">{emptyMessage}</p>}
    </div>
  );
}

function AnimatedCounter({
  targetValue: e,
  label: t
}) {
  let [n, r] = useState(``),
    [i, a] = useState(!1),
    o = useRef(null);
  useEffect(() => {
    let e = new IntersectionObserver(([e]) => {
      e.isIntersecting && !i && a(!0);
    }, {
      threshold: 0.1
    });
    o.current && e.observe(o.current);
    return () => e.disconnect();
  }, [i]);
  useEffect(() => {
    if (!i) return;
    let t = String(e).match(/^(\d+)/);
    if (!t) {
      let t = ``,
        n = String(e),
        i = 0,
        a = setInterval(() => {
          t += n[i];
          r(t);
          i++;
          i >= n.length && clearInterval(a);
        }, 150);
      return () => clearInterval(a);
    }
    let n = parseInt(t[1], 10),
      a = String(e).replace(/^\d+/, ``),
      o = 0,
      s = Math.max(Math.floor(1500 / n), 20),
      c = setInterval(() => {
        o += 1;
        o >= n ? (r(e), clearInterval(c)) : r(o + a);
      }, s);
    return () => clearInterval(c);
  }, [i, e]);
  return <div ref={o} style={{
    display: `flex`,
    flexDirection: `column`,
    width: `100%`
  }} className="stat-counter-wrapper">
      <div style={{
      display: `flex`,
      alignItems: `center`,
      gap: `0.5rem`,
      color: `var(--text-secondary)`,
      marginBottom: `0.8rem`
    }}>
        {statIcons[t] || <Award size={18} />}
        <span style={{
        fontSize: `0.65rem`,
        fontWeight: 700,
        textTransform: `uppercase`,
        letterSpacing: `0.12em`,
        lineHeight: `1`
      }}>
          {t}
        </span>
      </div>
      <span style={{
      fontSize: `clamp(2.5rem, 4.5vw, 4rem)`,
      fontWeight: 800,
      color: `var(--text-primary)`,
      lineHeight: `1`,
      fontFamily: `var(--font-headings)`,
      letterSpacing: `-0.02em`,
      display: `block`,
      marginBottom: `0.8rem`
    }}>
        {n || `0`}
      </span>
      <div style={{
      width: `32px`,
      height: `1px`,
      backgroundColor: `var(--accent-copper)`,
      marginBottom: `0.8rem`
    }} />
      <p style={{
      fontSize: `0.82rem`,
      lineHeight: `1.45`,
      color: `var(--text-secondary)`,
      margin: 0,
      fontWeight: 400
    }}>
        {statDescriptions[t] || `Advanced engineering systems and strategic product leadership.`}
      </p>
    </div>;
}

function TrustBar() {
  let {
      data: e
    } = useContent(),
    t = e.profile.trustStats,
    n = (e.profile.trustBrands || []).map((brand, index) => typeof brand === 'string'
      ? { id: `partner-${index}`, name: brand, logoUrl: '' }
      : brand),
    projects = e.projects || [];
  return <section style={{
    backgroundColor: `var(--bg-primary)`,
    borderBottom: `1px solid var(--border-thin)`,
    padding: `7rem 0`,
    position: `relative`
  }} className="reveal-border-top">
      <div className="container-custom">
        <div className="trust-stats-grid" style={{
        display: `grid`,
        gridTemplateColumns: `repeat(${t.length}, 1fr)`,
        gap: `3.5rem 2rem`,
        marginBottom: `6.5rem`
      }}>
          {t.map((e, t) => <div key={e.id} style={{
          borderLeft: t === 0 ? `none` : `1px solid var(--border-thin)`,
          paddingLeft: t === 0 ? `0` : `1.8rem`,
          display: `flex`,
          flexDirection: `column`,
          justifyContent: `flex-start`
        }} className="stat-col reveal-element reveal-delay-1">
              <AnimatedCounter targetValue={e.value} label={e.label} />
            </div>)}
        </div>
        <div className="showcase-bands reveal-element reveal-delay-2">
          <ShowcaseMarquee
            title="Trusted Partners"
            items={n}
            emptyMessage="Partner logos will appear here."
            renderItem={(brand) => brand.logoUrl
              ? <img className="partner-logo-image" src={brand.logoUrl} alt={`${brand.name} logo`} />
              : brandLogos[brand.name] || <span className="partner-logo-name">{brand.name}</span>}
          />
          <ShowcaseMarquee
            title="Projects"
            items={projects}
            loop={false}
            emptyMessage="Projects coming soon."
            renderItem={(project) => (
              <>
                {project.image && <img className="project-showcase-image" src={project.image} alt="" />}
                <span className="project-showcase-copy">
                  <strong>{project.title}</strong>
                  {project.category && <small>{project.category}</small>}
                </span>
              </>
            )}
          />
        </div>
      </div>
      <style>{`
        .showcase-bands {
          border-top: 1px solid var(--border-thin);
          padding-top: 3rem;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }
        .showcase-band-heading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.7rem;
          margin-bottom: 0.5rem;
        }
        .showcase-band-heading h3 {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }
        .showcase-heading-rule {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--accent-copper);
        }
        .showcase-card {
          box-sizing: border-box;
          width: 220px;
          height: 88px;
          padding: 0.85rem 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.9rem;
          flex: 0 0 220px;
          overflow: hidden;
          background: #fff;
          border: 1px solid var(--border-thin);
          border-radius: 6px;
          box-shadow: 0 2px 8px -4px rgba(0,0,0,0.05);
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .showcase-card:hover {
          transform: translateY(-3px);
          border-color: var(--accent-copper) !important;
          box-shadow: 0 10px 20px -8px rgba(193, 92, 61, 0.15) !important;
        }
        .partner-logo-image {
          display: block;
          max-width: 100%;
          max-height: 54px;
          object-fit: contain;
        }
        .partner-logo-name {
          color: var(--text-primary);
          font-size: 1rem;
          font-weight: 800;
          text-align: center;
        }
        .project-showcase-image {
          width: 76px;
          height: 56px;
          flex: 0 0 76px;
          object-fit: cover;
          border-radius: 3px;
        }
        .project-showcase-copy {
          display: flex;
          min-width: 0;
          flex-direction: column;
          gap: 0.25rem;
          overflow: hidden;
        }
        .project-showcase-copy strong {
          overflow: hidden;
          color: var(--text-primary);
          font-size: 0.82rem;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .project-showcase-copy small {
          overflow: hidden;
          color: var(--text-secondary);
          font-size: 0.68rem;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .showcase-empty {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.85rem;
          text-align: center;
        }
        .scroll-mask-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
        }
        .scroll-mask-wrapper::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 50px;
          background: linear-gradient(90deg, var(--bg-primary) 10%, transparent);
          z-index: 2;
          pointer-events: none;
        }
        .scroll-mask-wrapper::after {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 50px;
          background: linear-gradient(-90deg, var(--bg-primary) 10%, transparent);
          z-index: 2;
          pointer-events: none;
        }
        .marquee-track {
          display: flex;
          width: 100%;
          gap: 1.5rem;
          padding: 1rem 0 1.5rem 0;
        }
        .marquee-content {
          display: flex;
          gap: 1.5rem;
          flex-shrink: 0;
          animation: marquee-scroll 28s linear infinite;
        }
        .showcase-static-wrapper::before,
        .showcase-static-wrapper::after {
          display: none;
        }
        .showcase-static-content {
          width: 100%;
          justify-content: center;
          flex-wrap: wrap;
        }
        .marquee-track:hover .marquee-content,
        .scroll-mask-wrapper:hover .marquee-content,
        .marquee-content:hover {
          animation-play-state: paused !important;
        }
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% - 1.5rem)); }
        }
        @media (max-width: 1200px) {
          .trust-stats-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .stat-col:nth-child(3n + 1) {
            border-left: none !important;
            padding-left: 0 !important;
          }
          .stat-col:not(:nth-child(3n + 1)) {
            border-left: 1px solid var(--border-thin) !important;
            padding-left: 1.8rem !important;
          }
        }
        @media (max-width: 991px) {
          .trust-stats-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 3.5rem 2rem !important;
          }
          .stat-col {
            border-left: none !important;
            padding-left: 0 !important;
          }
        }
        @media (max-width: 480px) {
          .trust-stats-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>;
}

export default TrustBar;