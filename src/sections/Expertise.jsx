import { useState } from 'react';
import { useContent } from '../context/ContentContext';

function Expertise() {
  let {
      data: e
    } = useContent(),
    t = e.expertise,
    [n, r] = useState(null);
  return <section id="expertise" style={{
    backgroundColor: `var(--bg-primary)`,
    borderBottom: `1px solid var(--border-thin)`,
    padding: `8rem 0`
  }}>
      <div className="container-custom">
        <div style={{
        marginBottom: `4rem`
      }}>
          <span style={{
          fontSize: `0.75rem`,
          fontWeight: 700,
          color: `var(--text-secondary)`,
          textTransform: `uppercase`,
          letterSpacing: `0.12em`,
          display: `block`,
          marginBottom: `1rem`
        }}>{`02 / ENGINEERING SPECIALTIES`}</span>
          <h2 style={{
          fontSize: `clamp(2.5rem, 4.5vw, 4.5rem)`,
          fontWeight: 800,
          textTransform: `uppercase`,
          color: `var(--text-primary)`
        }}>
            {`What we `}
            <span className="serif-italic" style={{
            textTransform: `lowercase`,
            fontWeight: 300,
            color: `var(--accent-copper)`
          }}>{`can build.`}</span>
          </h2>
        </div>
        <div style={{
        display: `flex`,
        flexDirection: `column`,
        borderTop: `1px solid var(--border-thin)`
      }}>
          {t.map((e, t) => {
          let i = n === t;
          return <div key={e.id} onMouseEnter={() => r(t)} onMouseLeave={() => r(null)} style={{
            display: `grid`,
            gridTemplateColumns: `80px 1.5fr 2fr 2.5fr`,
            padding: `3rem 0`,
            borderBottom: `1px solid var(--border-thin)`,
            transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1)`,
            backgroundColor: i ? `var(--bg-secondary)` : `transparent`,
            transform: i ? `translateX(10px)` : `none`,
            paddingLeft: i ? `1.5rem` : `0rem`,
            paddingRight: i ? `1.5rem` : `0rem`
          }} className="expertise-row">
                <span className="serif-italic" style={{
              fontSize: `1.8rem`,
              fontWeight: 300,
              color: i ? `var(--accent-copper)` : `var(--text-secondary)`,
              transition: `color 0.3s ease`
            }}>
                  {e.number}
                </span>
                <h3 style={{
              fontSize: `1.8rem`,
              fontWeight: 700,
              color: `var(--text-primary)`,
              letterSpacing: `-0.02em`,
              textTransform: `uppercase`
            }}>
                  {e.title}
                </h3>
                <p style={{
              fontSize: `1rem`,
              color: `var(--text-secondary)`,
              paddingRight: `2rem`,
              lineHeight: `1.5`
            }}>
                  {e.description}
                </p>
                <div style={{
              display: `flex`,
              flexWrap: `wrap`,
              gap: `0.6rem`
            }}>
                  {e.skills.map((e, t) => <span key={t} style={{
                padding: `0.4rem 0.9rem`,
                fontSize: `0.75rem`,
                fontWeight: 600,
                textTransform: `uppercase`,
                letterSpacing: `0.05em`,
                border: `1px solid var(--border-thin)`,
                backgroundColor: `var(--bg-primary)`,
                color: `var(--text-primary)`,
                transition: `all 0.3s ease`
              }} className="skill-badge-mini">
                      {e}
                    </span>)}
                </div>
              </div>;
        })}
        </div>
      </div>
      <style>{`
        @media (max-width: 991px) {
          .expertise-row {
            grid-template-columns: 50px 1fr !important;
            gap: 1.5rem;
            padding: 2.5rem 0 !important;
          }
          .expertise-row > p {
            grid-column: 2;
            padding-right: 0;
          }
          .expertise-row > div {
            grid-column: 2;
            margin-top: 0.5rem;
          }
        }
        @media (max-width: 600px) {
          .expertise-row {
            grid-template-columns: 1fr !important;
            gap: 1rem;
          }
          .expertise-row > span,
          .expertise-row > h3,
          .expertise-row > p,
          .expertise-row > div {
            grid-column: 1 !important;
          }
        }
      `}</style>
    </section>;
}

export default Expertise;